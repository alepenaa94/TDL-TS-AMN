import { Router } from 'express'

import app from './app'
import userGame from './game'
import player from './player'
import words from './words'
import math from './math'

const router = Router()

router.use('/app', app)

router.use('/games', userGame)

router.use('/players', player)

router.use('/hangman', words)

router.use('/math', math)

export default router
