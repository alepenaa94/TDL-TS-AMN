//Define Functions that perform CRUD operations on users

import { CommonService } from '../services'
import PGPool from '../db_pool/pg_pool'
import Helper from '../db_pool/helper'
import { logger } from '../providers/logger'

export class PlayerService extends CommonService {
  // add name to player
  public async addNameToPlayer(id: number, name: string): Promise<any> {
    const pool = Helper.pool()

    try {
      await Helper.beginTransaction(pool)

      const player_columns = `name = '${name}'`
      const player_sql = `UPDATE player SET ${player_columns} WHERE id = '${id}'`
      const res = await pool.aquery2(player_sql, [])

      if (!res.rowCount) throw { message: 'Player does not exist', status: 404 }

      await Helper.commitTransaction(pool)

      return { success: true, data: { message: 'Player updated' } }
    } catch (error) {
      logger.error(`Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  // relation player vs. game
  public async addPlayerToGame(id_game: number, id_player: number, pool?: PGPool): Promise<any> {
    let pooldefinedLocally = false
    // pool is not supplied, create one AND start transaction
    if (pool === undefined) {
      pooldefinedLocally = true
      pool = Helper.pool()
      // begin transaction
      await Helper.beginTransaction(pool)
    }

    //si el id_player no se completa, se asocia por primera vez
    if (!id_player) {
      try {
        // insert a default user without name in Player table
        const sql_user = `INSERT INTO player (name, score) VALUES ('TBD', 0) returning id`
        const userResult = await pool.aquery2(sql_user, [])

        // insert id_game and id_player into Gameinplay table.
        const sql_gameinplay =
          'INSERT INTO gameinplay(id_player, id_game, available_life) VALUES ($1, $2, 3) ' +
          'ON CONFLICT (id_player, id_game) DO UPDATE SET available_life = 3 returning id_player, id_game'
        const gameinplayParams = [userResult.rows[0].id, id_game]
        const gameinplayResult = await pool.aquery2(sql_gameinplay, gameinplayParams)

        // commit if there is a transaction
        if (pooldefinedLocally) await Helper.commitTransaction(pool)
        return {
          success: true,
          data: {
            id_player: gameinplayResult.rows[0].id_player,
          },
        }
      } catch (error) {
        logger.error(`Error: ${error}`)
        return { success: false, data: { message: error.detail || error } }
      }

      // si el id_player viene completo, se deberá actualizará / creará entrada en gameinplay
    } else {
      console.log(id_player)
      try {
        // insert id_game and id_player into Gameinplay table.
        const sql_gameinplay =
          'INSERT INTO gameinplay(id_player, id_game, available_life) VALUES ($1, $2, 3) ' +
          'ON CONFLICT (id_player, id_game) DO UPDATE SET available_life = 3 returning id_player, id_game'
        const gameinplayParams = [id_player, id_game]
        const gameinplayResult = await pool.aquery2(sql_gameinplay, gameinplayParams)

        // commit if there is a transaction
        if (pooldefinedLocally) await Helper.commitTransaction(pool)
        return {
          success: true,
          data: {
            id_player: gameinplayResult.rows[0].id_player,
            id_game: gameinplayResult.rows[0].id_game,
          },
        }
      } catch (error) {
        console.log(error)
        logger.error(`Error: ${error}`)
        return { success: false, data: { message: error.detail || error } }
      }
    }
  }

  //Se obtienen todos los jugadores con su puntaje
  public async getAllPlayers(): Promise<any> {
    return await this.getRows('SELECT id, name, score FROM player', [])
  }
}

export default PlayerService
