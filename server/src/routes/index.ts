import { Router } from 'express'

import app from './app'
import userGame from './game'
import player from './player'

const router = Router()

router.use('/app', app)

router.use('/games', userGame)

router.use('/players', player)

export default router
