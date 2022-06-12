// Handles following routes:
// GET '/game'

import express from 'express'

import { wrapper } from '../../helpers'
import { WordsController } from '../../controllers'

const router = express.Router()

//Consulta letra perteneciente a la palabra
router.get('/:id_player/:letter', wrapper(WordsController.wordIsOK))

//get word for hangman
router.get('/:id_player', wrapper(WordsController.getWord))

export default router
