import { Request, Response } from 'express'

import { ResponseWrapper } from '../helpers/response_wrapper'
import { MathService } from '../services'

export const MathController = {
  opIsOK: async (req: Request, res: Response) => {
    const { operator } = req.body
    const mathService: MathService = new MathService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await mathService.opIsOK(parseInt(req.params.id_player), operator))
  },
  getMath: async (req: Request, res: Response) => {
    const mathService: MathService = new MathService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await mathService.getMath(parseInt(req.params.id_player)))
  },
}
