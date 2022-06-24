import { Request, Response } from 'express'

import { ResponseWrapper } from '../helpers/response_wrapper'
import { GameService } from '../services'

export const GameController = {
  get: async (_: Request, res: Response) => {
    const gameService: GameService = new GameService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await gameService.getAllGames())
  },
}
