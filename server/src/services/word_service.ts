//Define Functions that perform CRUD operations on users

import { CommonService } from '../services'
import PGPool from '../db_pool/pg_pool'
import Helper from '../db_pool/helper'
import { logger } from '../providers/logger'

export class WordService extends CommonService {
  expReq?: any

  expRes?: any

  constructor(_user: any) {
    super(_user)
  }

  // Consulta letra correcta
  public async wordIsOK(id_player: number, letter: string, pool?: PGPool): Promise<any> {
    try {
      const playerExists = await this.getRows(
        `SELECT id_player, id_game, available_life FROM gameinplay WHERE id_player = '${id_player}' AND id_game = 3`,
      )

      if (!playerExists.success) throw { message: 'Player does not exist', status: 404 }
      if (playerExists.data.result[0].available_life <= 0) throw { message: 'You are dead', status: 404 }

      const wordplayer_sql = `SELECT id_word, retry FROM wordsplayer WHERE id_player = '${id_player}'`
      const wordplayerResult = await this.getRows(wordplayer_sql, [])

      //En caso que no se encuentre
      if (!wordplayerResult.success) throw { message: 'Word does not exist', status: 404 }

      const word_sql = `SELECT id, name FROM words WHERE id = '${wordplayerResult.data.result[0].id_word}'`
      const wordResult = await this.getRows(word_sql, [])

      //En caso que no se encuentre
      if (!wordResult.success) throw { message: 'Word does not exist', status: 404 }

      //Si la letra es correcta, se devolverá la misma cantidad de vidas que tenía y las ubicaciones
      const word = wordResult.data.result[0].name
      if (word.includes(letter.toUpperCase())) {
        const positions = []
        let i = -1
        while ((i = word.indexOf(letter.toUpperCase(), i + 1)) >= 0) {
          positions.push(i + 1)
        }
        return {
          success: true,
          data: {
            location: positions,
            available_life: playerExists.data.result[0].available_life
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
        console.log(av_life)
        const sql_gameinplay = 'UPDATE gameinplay SET available_life = $2 WHERE id_player = $1 AND id_game = 3'
        const updatedGameInPlay = await pool.aquery(this.user_current, sql_gameinplay, [id_player, av_life])
        if (updatedGameInPlay.rowCount <= 0) {
          throw { message: 'Error al actualizar las vidas', status: 400 }
        }
        // commit if there is a transaction
        if (pooldefinedLocally) await Helper.commitTransaction(pool, this.user_current)
        throw {
          message: 'Letra no es correcta',
          available_life: av_life,
          status: 404,
        }
      }
    } catch (error) {
      logger.error(`Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  //Se obtiene id de palabra con la cantidad de letras total
  public async getWord(id_player: number, pool?: PGPool): Promise<any> {
    try {
      const playerExists = await this.getRows(`SELECT id, name FROM player WHERE id = '${id_player}'`)

      if (!playerExists.success) throw { message: 'Player does not exist', status: 404 }

      const wordResult = await this.getRows('SELECT id, name FROM words ORDER BY random() LIMIT 1', [])

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
      const sql_wordsplayer =
        'INSERT INTO wordsplayer(id_player, id_word, retry) VALUES ($1, $2, 0) ON CONFLICT (id_player) DO UPDATE SET id_word = $2'
      const wordsplayerParams = [id_player, wordResult.data.result[0].id]
      await pool.aquery(this.user_current, sql_wordsplayer, wordsplayerParams)

      //Se actualiza la tabla de juego y vidas
      const sql_gameinplay =
        'INSERT INTO gameinplay(id_player, id_game, available_life) VALUES ($1, 3, 6) ' +
        'ON CONFLICT (id_player, id_game) DO UPDATE SET available_life = 3 returning id_player, id_game'
      const gameinplayParams = [id_player]
      await pool.aquery(this.user_current, sql_gameinplay, gameinplayParams)
      // commit if there is a transaction
      if (pooldefinedLocally) await Helper.commitTransaction(pool, this.user_current)

      return {
        success: true,
        data: { id: wordResult.data.result[0].id, cantidad_letras: wordResult.data.result[0].name.length },
      }
    } catch (error) {
      logger.error(`Error: ${error}`)
      return { success: false, data: { message: error.detail || error } }
    }
  }
}

export default WordService
