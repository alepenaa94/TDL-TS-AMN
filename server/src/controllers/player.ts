import { Response } from 'express'

import Helper, { CUserAuthInfoRequest } from '../db_pool/helper'
import { ResponseWrapper } from '../helpers/response_wrapper'
import { PlayerService } from '../services'

export class PlayerController {
  public static async addNameToPlayer(req: CUserAuthInfoRequest, res: Response) {
    const objSysAdmin = req.cUser ? req.cUser : Helper.defaultUser()
    const { id, name } = req.body
    const playerService: PlayerService = new PlayerService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await playerService.addNameToPlayer(id, name))
  }

  public static async getPlayers(req: CUserAuthInfoRequest, res: Response) {
    const objSysAdmin = req.cUser ? req.cUser : Helper.defaultUser()
    const playerService: PlayerService = new PlayerService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await playerService.getAllPlayers())
  }

  public static async addPlayerToGame(req: CUserAuthInfoRequest, res: Response) {
    const objSysAdmin = req.cUser ? req.cUser : Helper.defaultUser()
    const { id_game, id_player } = req.body
    const playerService: PlayerService = new PlayerService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await playerService.addPlayerToGame(id_game, id_player))
  }
}
