//Define Functions that perform CRUD operations on users

import { CommonService } from '../services'
import PGPool from '../db_pool/pg_pool'
import Helper from '../db_pool/helper'
import messages from '../constants'
import { logger } from '../providers/logger'
export class PlayerService extends CommonService {
  expReq?: any

  expRes?: any

  constructor(_user: any) {
    super(_user)
  }

  // add user
  public async addPlayer(id: number, name: string, pool?: PGPool): Promise<any> {
    let pooldefinedLocally = false

    // pool is not supplied, create one AND start transaction
    if (pool === undefined) {
      pooldefinedLocally = true
      pool = Helper.pool()
      // begin transaction
      await Helper.beginTransaction(pool, this.user_current)
    }

    try {
      // insert user row
      const sql_user = `INSERT INTO player (id, name)
				VALUES ('${id}', '${name}') returning id`
      console.log(sql_user)
      const userResult = await pool.aquery(this.user_current, sql_user, [])
      console.log(userResult)

      // // insert permissions row
      // const sql_user_roles = `INSERT INTO user_roles (id_user, id_role)
      // 	VALUES ($1, $2) returning id`
      //
      // const user_role_params = [userResult.rows[0].id, user.id_role]
      // const userRoleResult = await pool.aquery(this.user_current, sql_user_roles, user_role_params)

      // commit if there is a transaction
      if (pooldefinedLocally) await Helper.commitTransaction(pool, this.user_current)

      return {
        success: true,
        data: {
          message: messages.success.insert,
          id_user: userResult.rows[0].id,
        },
      }
    } catch (error) {
      logger.error(`UserService.addUser() Error: ${error}`)
      return { success: false, data: { message: error.detail || error } }
    }
  }

  public async getAllPlayers(): Promise<any> {
    return await this.getRows('select id, name from player', [])
  }
}

export default PlayerService
