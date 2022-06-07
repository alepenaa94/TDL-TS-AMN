import { Response } from 'express'

import Helper, { CUserAuthInfoRequest } from '../db_pool/helper'
import { ResponseWrapper } from '../helpers/response_wrapper'
import { GameService } from '../services'

export class GameController {
  public static async getGames(req: CUserAuthInfoRequest, res: Response) {
    const objSysAdmin = req.cUser ? req.cUser : Helper.defaultUser()
    const gameService: GameService = new GameService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await gameService.getAllGames())
  }
}
