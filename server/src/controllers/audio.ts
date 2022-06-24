import { Request, Response } from 'express'

import { ResponseWrapper } from '../helpers/response_wrapper'
import { AudioService } from '../services'

export const AudioController = {
  checkAnswer: async (req: Request, res: Response) => {
    const audioService: AudioService = new AudioService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await audioService.isAudioOK(parseInt(req.params.id_player), req.params.result))
  },
  getNew: async (req: Request, res: Response) => {
    const audioService: AudioService = new AudioService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await audioService.getAudio(parseInt(req.params.id_player)))
  },
}
