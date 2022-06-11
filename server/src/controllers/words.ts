import { Response } from 'express'

import Helper, { CUserAuthInfoRequest } from '../db_pool/helper'
import { ResponseWrapper } from '../helpers/response_wrapper'
import { WordService } from '../services'

export class WordsController {
  public static async wordIsOK(req: CUserAuthInfoRequest, res: Response) {
    const objSysAdmin = req.cUser ? req.cUser : Helper.defaultUser()
    const wordService: WordService = new WordService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)
    const id_player = parseInt(req.params.id_player)
    const letter = req.params.letter
    return response.ok(await wordService.wordIsOK(id_player, letter))
  }

  public static async getWord(req: CUserAuthInfoRequest, res: Response) {
    const objSysAdmin = req.cUser ? req.cUser : Helper.defaultUser()
    const wordService: WordService = new WordService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await wordService.getWord(parseInt(req.params.id_player)))
  }

  public static async addPlayerToGame(req: CUserAuthInfoRequest, res: Response) {
    const objSysAdmin = req.cUser ? req.cUser : Helper.defaultUser()
    const { id_game, id_player } = req.body
    const wordService: WordService = new WordService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await wordService.addPlayerToGame(id_game, id_player))
  }
}
