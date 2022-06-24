// Handles following routes:
// GET '/audio'

import express from 'express'

import { wrapper } from '../../helpers'
import { AudioController } from '../../controllers'

const router = express.Router()

//Consulta si el animal esta ok o no
router.get('/:id_player/:result', wrapper(AudioController.checkAnswer))

//obtener id para audio
router.get('/:id_player', wrapper(AudioController.getNew))

export default router
