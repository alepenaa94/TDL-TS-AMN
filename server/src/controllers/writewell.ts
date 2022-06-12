import { Response } from 'express'

import Helper, { CUserAuthInfoRequest } from '../db_pool/helper'
import { ResponseWrapper } from '../helpers/response_wrapper'
import { WriteWellService } from '../services'

export class WriteWellController {
  public static async writeWellIsOK(req: CUserAuthInfoRequest, res: Response) {
    const objSysAdmin = req.cUser ? req.cUser : Helper.defaultUser()
    const writeWellService: WriteWellService = new WriteWellService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)
    const id_player = parseInt(req.params.id_player)
    const result = req.params.result
    return response.ok(await writeWellService.writeWellIsOK(id_player, result))
  }

  public static async getWriteWell(req: CUserAuthInfoRequest, res: Response) {
    const objSysAdmin = req.cUser ? req.cUser : Helper.defaultUser()
    const writeWellService: WriteWellService = new WriteWellService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await writeWellService.getWriteWell(parseInt(req.params.id_player)))
  }
}
