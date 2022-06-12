// Handles following routes:
// GET '/game'

import express from 'express'

import { wrapper } from '../../helpers'
import { RankController } from '../../controllers'

const router = express.Router()

//rank player
router.put('/:id_game/:id_player', wrapper(RankController.rankPlayer))

export default router
