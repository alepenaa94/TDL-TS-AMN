import { Response } from 'express'

import Helper, { CUserAuthInfoRequest } from '../db_pool/helper'
import { ResponseWrapper } from '../helpers/response_wrapper'
import { MathService } from '../services'

export class MathController {
  public static async opIsOK(req: CUserAuthInfoRequest, res: Response) {
    const objSysAdmin = req.cUser ? req.cUser : Helper.defaultUser()
    const { operator } = req.body
    const id_player = parseInt(req.params.id_player)
    const mathService: MathService = new MathService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await mathService.opIsOK(id_player, operator))
  }

  public static async getMath(req: CUserAuthInfoRequest, res: Response) {
    const objSysAdmin = req.cUser ? req.cUser : Helper.defaultUser()
    const mathService: MathService = new MathService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await mathService.getMath(parseInt(req.params.id_player)))
  }
}
