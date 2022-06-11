// Handles following routes:
// GET '/game'

import express from 'express'

import { wrapper } from '../../helpers'
import { PlayerController } from '../../controllers'
import Schema from '../../middlewares/schema'
import PlayerValidator from '../../validators/player'

const router = express.Router()

//add name player
router.post(
  '/addNameToPlayer',
  (req, res, next) => {
    Schema.handle(req, res, next, PlayerValidator.player())
  },
  wrapper(PlayerController.addNameToPlayer),
)

//get players
router.get('', wrapper(PlayerController.getPlayers))

//add player + game
router.post(
  '/addPlayerToGame',
  (req, res, next) => {
    Schema.handle(req, res, next, PlayerValidator.addPlayerToGame())
  },
  wrapper(PlayerController.addPlayerToGame),
)

export default router
