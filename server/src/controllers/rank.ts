import { Request, Response } from 'express'

import { ResponseWrapper } from '../helpers/response_wrapper'
import { RankService } from '../services'

export const RankController = {
  rankPlayer: async (req: Request, res: Response) => {
    const playerService: RankService = new RankService()
    const id_game = parseInt(req.params.id_game)
    const id_player = parseInt(req.params.id_player)
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await playerService.rankPlayer(id_game, id_player))
  },
}
