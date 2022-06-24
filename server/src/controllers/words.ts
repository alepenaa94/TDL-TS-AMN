import { Request, Response } from 'express'
import { ResponseWrapper } from '../helpers/response_wrapper'
import { WordService } from '../services'

export const WordsController = {
  wordIsOK: async (req: Request, res: Response) => {
    const wordService: WordService = new WordService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    const id_player = parseInt(req.params.id_player)
    const letter = req.params.letter
    return response.ok(await wordService.wordIsOK(id_player, letter))
  },
  getWord: async (req: Request, res: Response) => {
    const wordService: WordService = new WordService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await wordService.getWord(parseInt(req.params.id_player)))
  },
}
