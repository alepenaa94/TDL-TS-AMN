//Define Functions that perform CRUD operations on users

import { CommonService } from '../services'
import PGPool from '../db_pool/pg_pool'
import Helper from '../db_pool/helper'
import { logger } from '../providers/logger'

export class MathService extends CommonService {
  expReq?: any

  expRes?: any

  constructor(_user: any) {
    super(_user)
  }

  // A partir de la operación y el id del jugador, consulta si la operación es correcta
  public async opIsOK(id_player: number, operador: string, pool?: PGPool): Promise<any> {
    try {
      const playerExists = await this.getRows(
        `SELECT id_player, id_game, available_life FROM gameinplay WHERE id_player = '${id_player}' AND id_game = 2`,
      )

      if (!playerExists.success) throw { message: 'Player does not exist', status: 404 }
      if (playerExists.data.result[0].available_life <= 0) throw { message: 'You are dead', status: 404 }

      const mathplayer_sql = `SELECT id_math FROM mathplayer WHERE id_player = '${id_player}'`
      const mathplayerResult = await this.getRows(mathplayer_sql, [])

      //En caso que no se encuentre
      if (!mathplayerResult.success) throw { message: 'Math does not exist', status: 404 }

      const math_sql = `SELECT id, operador FROM math WHERE id = '${mathplayerResult.data.result[0].id_math}'`
      const mathResult = await this.getRows(math_sql, [])

      //En caso que no se encuentre
      if (!mathResult.success) throw { message: 'Operation ID does not exist', status: 404 }

      //Si el operando es correcto, se devolverá la misma cantidad de vidas que tenía
      if (operador === mathResult.data.result[0].operador) {
        return {
          success: true,
          data: {
            available_life: playerExists.data.result[0].available_life,
          },
        }
      } else {
        //Se actualiza la tabla de juego y vidas
        let pooldefinedLocally = false
        // pool is not supplied, create one AND start transaction
        if (pool === undefined) {
          pooldefinedLocally = true
          pool = Helper.pool()
          // begin transaction
          await Helper.beginTransaction(pool, this.user_current)
        }
        const av_life = playerExists.data.result[0].available_life - 1
        const sql_gameinplay = 'UPDATE gameinplay SET available_life = $2 WHERE id_player = $1 AND id_game = 2'
        const updatedGameInPlay = await pool.aquery(this.user_current, sql_gameinplay, [id_player, av_life])
        if (updatedGameInPlay.rowCount <= 0) {
          throw { message: 'Error al actualizar las vidas', status: 400 }
        }
        console.log(av_life)
        // commit if there is a transaction
        if (pooldefinedLocally) await Helper.commitTransaction(pool, this.user_current)

        return { success: false, data: { message: 'Operación no correcta', available_life: av_life }, status: 404 }
      }
    } catch (error) {
      logger.error(`Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  //Se obtienen valores a mostrar de la operación
  public async getMath(id_player: number, pool?: PGPool): Promise<any> {
    try {
      const playerExists = await this.getRows(`SELECT id, name FROM player WHERE id = '${id_player}'`)

      if (!playerExists.success) throw { message: 'Player does not exist', status: 404 }

      const mathResult = await this.getRows(
        'SELECT id, operando1, operando2, resultado FROM math ORDER BY random() LIMIT 1',
        [],
      )

      // insert id_game and id_player into Gameinplay table.
      let pooldefinedLocally = false
      // pool is not supplied, create one AND start transaction
      if (pool === undefined) {
        pooldefinedLocally = true
        pool = Helper.pool()
        // begin transaction
        await Helper.beginTransaction(pool, this.user_current)
      }
      //Se actualiza la tabla de math asociada al jugador. Solo una por jugador.- En caso de existir, se sobreescribe
      const sql_mathplayer =
        'INSERT INTO mathplayer(id_player, id_math) VALUES ($1, $2) ON CONFLICT (id_player) DO UPDATE SET id_math = $2'
      const mathplayerParams = [id_player, mathResult.data.result[0].id]
      await pool.aquery(this.user_current, sql_mathplayer, mathplayerParams)

      //Se actualiza la tabla de juego y vidas
      const sql_gameinplay =
        'INSERT INTO gameinplay(id_player, id_game, available_life) VALUES ($1, 2, 3) ' +
        'ON CONFLICT (id_player, id_game) DO UPDATE SET available_life = 3 returning id_player, id_game'
      const gameinplayParams = [id_player]
      await pool.aquery(this.user_current, sql_gameinplay, gameinplayParams)
      // commit if there is a transaction
      if (pooldefinedLocally) await Helper.commitTransaction(pool, this.user_current)

      return {
        success: true,
        data: {
          operando1: mathResult.data.result[0].operando1,
          operando2: mathResult.data.result[0].operando2,
          resultado: mathResult.data.result[0].resultado,
          available_life: 3,
        },
      }
    } catch (error) {
      logger.error(`Error: ${error}`)
      return { success: false, data: { message: error.detail || error } }
    }
  }
}

export default MathService
