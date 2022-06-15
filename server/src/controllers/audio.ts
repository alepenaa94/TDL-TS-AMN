import { Response } from 'express'

import Helper, { CUserAuthInfoRequest } from '../db_pool/helper'
import { ResponseWrapper } from '../helpers/response_wrapper'
import { AudioService } from '../services'

export class AudioController {
  public static async isAudioOK(req: CUserAuthInfoRequest, res: Response) {
    const objSysAdmin = req.cUser ? req.cUser : Helper.defaultUser()
    const audioService: AudioService = new AudioService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)
    const id_player = parseInt(req.params.id_player)
    const result = req.params.result
    return response.ok(await audioService.isAudioOK(id_player, result))
  }

  public static async getAudio(req: CUserAuthInfoRequest, res: Response) {
    const objSysAdmin = req.cUser ? req.cUser : Helper.defaultUser()
    const audioService: AudioService = new AudioService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await audioService.getAudio(parseInt(req.params.id_player)))
  }
}
