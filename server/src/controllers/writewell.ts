import { Request, Response } from 'express'

import { ResponseWrapper } from '../helpers/response_wrapper'
import { WriteWellService } from '../services'

export const WriteWellController = {
  writeWellIsOK: async (req: Request, res: Response) => {
    const writeWellService: WriteWellService = new WriteWellService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await writeWellService.writeWellIsOK(parseInt(req.params.id_player), req.params.result))
  },
  getWriteWell: async (req: Request, res: Response) => {
    const writeWellService: WriteWellService = new WriteWellService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await writeWellService.getWriteWell(parseInt(req.params.id_player)))
  },
}
