import { Request, Response } from 'express'

import { ResponseWrapper } from '../helpers/response_wrapper'
import { PlayerService } from '../services'

export const PlayerController = {
  addNameToPlayer: async (req: Request, res: Response) => {
    const { id, name } = req.body
    const playerService: PlayerService = new PlayerService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await playerService.addNameToPlayer(id, name))
  },
  getPlayers: async (_: Request, res: Response) => {
    const playerService: PlayerService = new PlayerService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await playerService.getAllPlayers())
  },
  addPlayerToGame: async (req: Request, res: Response) => {
    const { id_game, id_player } = req.body
    const playerService: PlayerService = new PlayerService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await playerService.addPlayerToGame(id_game, id_player))
  },
}
