//Define Functions that perform CRUD operations on users

import { CommonService } from '../services'
import PGPool from '../db_pool/pg_pool'
import Helper from '../db_pool/helper'
import { logger } from '../providers/logger'

export class AudioService extends CommonService {
  // Consulta ortografia correcta
  public async isAudioOK(id_player: number, result: string, pool?: PGPool): Promise<any> {
    try {
      const playerExists = await this.getRows(
        `SELECT id_player, id_game, available_life FROM gameinplay WHERE id_player = '${id_player}' AND id_game = 1`,
      )

      if (!playerExists.success) throw { message: 'Player does not exist', status: 404 }
      if (playerExists.data.result[0].available_life <= 0) throw { message: 'You are dead', status: 404 }

      const audioPlayer_sql = `SELECT id_audio FROM audioplayer WHERE id_player = '${id_player}'`
      const audioPlayerResult = await this.getRows(audioPlayer_sql, [])

      //En caso que no se encuentre
      if (!audioPlayerResult.success) throw { message: 'Audio does not exist', status: 404 }

      const audio_sql = `SELECT name FROM audio WHERE id = '${audioPlayerResult.data.result[0].id_audio}'`
      const audioResult = await this.getRows(audio_sql, [])

      //En caso que no se encuentre
      if (!audioResult.success) throw { message: 'Audio does not exist', status: 404 }

      //Si la palabra es correcta, se devolverá la misma cantidad de vidas que tenía
      if (result.toUpperCase() === audioResult.data.result[0].name) {
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
          await Helper.beginTransaction(pool)
        }
        const av_life = playerExists.data.result[0].available_life - 1
        const sql_gameinplay = 'UPDATE gameinplay SET available_life = $2 WHERE id_player = $1 AND id_game = 1'
        const updatedGameInPlay = await pool.aquery2(sql_gameinplay, [id_player, av_life])
        if (updatedGameInPlay.rowCount <= 0) {
          throw { message: 'Error al actualizar las vidas', status: 400 }
        }
        // commit if there is a transaction
        if (pooldefinedLocally) await Helper.commitTransaction(pool)

        return {
          success: false,
          data: { message: 'El animal elegido no es correcto', available_life: av_life },
          status: 404,
        }
      }
    } catch (error) {
      logger.error(`Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  //Se inicializa juego y se obtiene id de audio
  public async getAudio(id_player: number, pool?: PGPool): Promise<any> {
    try {
      const playerExists = await this.getRows(`SELECT id, name FROM player WHERE id = '${id_player}'`)

      if (!playerExists.success) throw { message: 'Player does not exist', status: 404 }

      const audioResult = await this.getRows('SELECT id FROM audio ORDER BY random() LIMIT 1', [])

      // insert id_game and id_player into Gameinplay table.
      let pooldefinedLocally = false
      // pool is not supplied, create one AND start transaction
      if (pool === undefined) {
        pooldefinedLocally = true
        pool = Helper.pool()
        // begin transaction
        await Helper.beginTransaction(pool)
      }
      //Se actualiza la tabla de palabras asociada al jugador. Solo una por jugador.- En caso de existir, se sobreescribe
      const sql_audioPlayer =
        'INSERT INTO audioplayer(id_player, id_audio) VALUES ($1, $2) ON CONFLICT (id_player) DO UPDATE SET id_audio = $2'
      const audioPlayerParams = [id_player, audioResult.data.result[0].id]
      await pool.aquery2(sql_audioPlayer, audioPlayerParams)

      //Se actualiza la tabla de juego y vidas
      const sql_gameinplay =
        'INSERT INTO gameinplay(id_player, id_game, available_life) VALUES ($1, 1, 1) ' +
        'ON CONFLICT (id_player, id_game) DO UPDATE SET available_life = 1 returning id_player, id_game'
      const gameinplayParams = [id_player]

      await pool.aquery2(sql_gameinplay, gameinplayParams)

      // commit if there is a transaction
      if (pooldefinedLocally) await Helper.commitTransaction(pool)

      return {
        success: true,
        data: { audio_id: audioResult.data.result[0].id, available_life: 1 },
      }
    } catch (error) {
      logger.error(`Error: ${error}`)
      return { success: false, data: { message: error.detail || error } }
    }
  }
}

export default AudioService
