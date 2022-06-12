import { Router } from 'express'

import app from './app'
import userGame from './game'
import player from './player'
import words from './words'
import math from './math'
import writeWell from './writewell'

const router = Router()

router.use('/app', app)

router.use('/games', userGame)

router.use('/players', player)

router.use('/hangman', words)

router.use('/math', math)

router.use('/ortografia', writeWell)

export default router
