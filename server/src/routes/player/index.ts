// Handles following routes:
// GET '/game'

import express from 'express'

import { wrapper } from '../../helpers'
import { PlayerController } from '../../controllers'
import Schema from '../../middlewares/schema'
import PlayerValidator from '../../validators/player'

const router = express.Router()

//add player
router.post(
  '/add',
  (req, res, next) => {
    Schema.handle(req, res, next, PlayerValidator.player())
  },
  wrapper(PlayerController.addPlayer),
)

//get players
router.get('', wrapper(PlayerController.getPlayers))

export default router
