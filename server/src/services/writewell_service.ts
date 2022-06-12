//Define Functions that perform CRUD operations on users

import { CommonService } from '../services'
import PGPool from '../db_pool/pg_pool'
import Helper from '../db_pool/helper'
import { logger } from '../providers/logger'

export class WriteWellService extends CommonService {
  expReq?: any

  expRes?: any

  constructor(_user: any) {
    super(_user)
  }

  // Consulta ortografia correcta
  public async writeWellIsOK(id_player: number, result: string, pool?: PGPool): Promise<any> {
    try {
      const playerExists = await this.getRows(
        `SELECT id_player, id_game, available_life FROM gameinplay WHERE id_player = '${id_player}' AND id_game = 4`,
      )

      if (!playerExists.success) throw { message: 'Player does not exist', status: 404 }
      if (playerExists.data.result[0].available_life <= 0) throw { message: 'You are dead', status: 404 }

      const writeWellPlayer_sql = `SELECT id_writewell FROM writewellplayer WHERE id_player = '${id_player}'`
      const writeWellPlayerResult = await this.getRows(writeWellPlayer_sql, [])

      //En caso que no se encuentre
      if (!writeWellPlayerResult.success) throw { message: 'Word does not exist', status: 404 }

      const writeWell_sql = `SELECT result FROM writewell WHERE id = '${writeWellPlayerResult.data.result[0].id_writewell}'`
      const writeWellResult = await this.getRows(writeWell_sql, [])

      //En caso que no se encuentre
      if (!writeWellResult.success) throw { message: 'Word does not exist', status: 404 }

      //Si la palabra es correcta, se devolverá la misma cantidad de vidas que tenía
      if (result === writeWellResult.data.result[0].result.toString()) {
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
        const sql_gameinplay = 'UPDATE gameinplay SET available_life = $2 WHERE id_player = $1 AND id_game = 4'
        const updatedGameInPlay = await pool.aquery(this.user_current, sql_gameinplay, [id_player, av_life])
        if (updatedGameInPlay.rowCount <= 0) {
          throw { message: 'Error al actualizar las vidas', status: 400 }
        }
        // commit if there is a transaction
        if (pooldefinedLocally) await Helper.commitTransaction(pool, this.user_current)

        return {
          success: false,
          data: { message: 'La opción elegida no es correcta', available_life: av_life },
          status: 404,
        }
      }
    } catch (error) {
      logger.error(`Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  //Se inicializa juego y se obtiene palabra
  public async getWriteWell(id_player: number, pool?: PGPool): Promise<any> {
    try {
      const playerExists = await this.getRows(`SELECT id, name FROM player WHERE id = '${id_player}'`)

      if (!playerExists.success) throw { message: 'Player does not exist', status: 404 }

      const writeWellResult = await this.getRows('SELECT id, name FROM writewell ORDER BY random() LIMIT 1', [])

      // insert id_game and id_player into Gameinplay table.
      let pooldefinedLocally = false
      // pool is not supplied, create one AND start transaction
      if (pool === undefined) {
        pooldefinedLocally = true
        pool = Helper.pool()
        // begin transaction
        await Helper.beginTransaction(pool, this.user_current)
      }
      //Se actualiza la tabla de palabras asociada al jugador. Solo una por jugador.- En caso de existir, se sobreescribe
      const sql_writeWellPlayer =
        'INSERT INTO writewellplayer(id_player, id_writewell) VALUES ($1, $2) ON CONFLICT (id_player) DO UPDATE SET id_writewell = $2'
      const writeWellPlayerParams = [id_player, writeWellResult.data.result[0].id]
      await pool.aquery(this.user_current, sql_writeWellPlayer, writeWellPlayerParams)

      //Se actualiza la tabla de juego y vidas
      const sql_gameinplay =
        'INSERT INTO gameinplay(id_player, id_game, available_life) VALUES ($1, 4, 1) ' +
        'ON CONFLICT (id_player, id_game) DO UPDATE SET available_life = 1 returning id_player, id_game'
      const gameinplayParams = [id_player]

      await pool.aquery(this.user_current, sql_gameinplay, gameinplayParams)

      // commit if there is a transaction
      if (pooldefinedLocally) await Helper.commitTransaction(pool, this.user_current)

      return {
        success: true,
        data: { word: writeWellResult.data.result[0].name, available_life: 1 },
      }
    } catch (error) {
      logger.error(`Error: ${error}`)
      return { success: false, data: { message: error.detail || error } }
    }
  }
}

export default WriteWellService