import { Response } from 'express'

import { apiVersion } from '../providers/version'
import { CUserAuthInfoRequest } from '../db_pool/helper'
import { ResponseWrapper } from '../helpers/response_wrapper'

export class AppController {
  public static async version(_req: CUserAuthInfoRequest, res: Response) {
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.ok({ success: true, data: apiVersion })
  }
}
