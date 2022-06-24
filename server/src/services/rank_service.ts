//Define Functions that perform CRUD operations on users

import { CommonService } from '../services'
import Helper from '../db_pool/helper'
import { logger } from '../providers/logger'

export class RankService extends CommonService {
  // rank player
  public async rankPlayer(id_game: number, id_player: number): Promise<any> {
    try {
      const playerExists = await this.getRows(
        `SELECT id_player, id_game, available_life FROM gameinplay WHERE id_player = '${id_player}' AND id_game = '${id_game}'  `,
      )

      if (!playerExists.success) throw { message: 'Player/Game does not exist', status: 404 }

      const score = await this.getRows(`SELECT score FROM player WHERE id = '${id_player}'`)
      const pool = Helper.pool()

      await Helper.beginTransaction(pool)

      const player_columns = `score = '${score.data.result[0].score + 10}'`
      console.log(player_columns)

      const player_sql = `UPDATE player SET ${player_columns} WHERE id = '${id_player}'`
      await pool.aquery2(player_sql, [])

      await Helper.commitTransaction(pool)

      return { success: true, data: { message: 'Rank updated' } }
    } catch (error) {
      logger.error(`Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }
}

export default RankService
