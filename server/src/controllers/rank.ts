import { Response } from 'express'

import Helper, { CUserAuthInfoRequest } from '../db_pool/helper'
import { ResponseWrapper } from '../helpers/response_wrapper'
import { RankService } from '../services'

export class RankController {
  public static async rankPlayer(req: CUserAuthInfoRequest, res: Response) {
    const objSysAdmin = req.cUser ? req.cUser : Helper.defaultUser()
    const playerService: RankService = new RankService(objSysAdmin)
    const id_game = parseInt(req.params.id_game)
    const id_player = parseInt(req.params.id_player)
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await playerService.rankPlayer(id_game, id_player))
  }
}
