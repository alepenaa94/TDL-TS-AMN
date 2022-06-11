// Handles following routes:
// GET '/game'

import express from 'express'

import { wrapper } from '../../helpers'
import { WordsController } from '../../controllers'
import Schema from '../../middlewares/schema'
import WordValidator from '../../validators/words'

const router = express.Router()

//Consulta letra perteneciente a la palabra
router.get('/:id_player/:letter', wrapper(WordsController.wordIsOK))

//get word for hangman
router.get('/:id_player', wrapper(WordsController.getWord))

//add player + game
router.post(
  '/addPlayerToGame',
  (req, res, next) => {
    Schema.handle(req, res, next, WordValidator.player())
  },
  wrapper(WordsController.addPlayerToGame),
)

export default router
