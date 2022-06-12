// Handles following routes:
// GET '/game'

import express from 'express'

import { wrapper } from '../../helpers'
import { MathController } from '../../controllers'
import Schema from '../../middlewares/schema'
import MathValidator from '../../validators/math'

const router = express.Router()

//Consulta operando si es el correcto
router.post(
  '/:id_player',
  (req, res, next) => {
    Schema.handle(req, res, next, MathValidator.math())
  },
  wrapper(MathController.opIsOK),
)

//get math for hangman
router.get('/:id_player', wrapper(MathController.getMath))

export default router
