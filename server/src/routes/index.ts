import { Router } from 'express'

import app from './app'
import userGame from './game'
import player from './player'
import words from './words'

const router = Router()

router.use('/app', app)

router.use('/games', userGame)

router.use('/players', player)

router.use('/hangman', words)

export default router
