// Handles following routes:
// GET '/game'

import express from 'express'

import { wrapper } from '../../helpers'
import { WriteWellController } from '../../controllers'

const router = express.Router()

//Consulta si palabra esta ok o no
router.get('/:id_player/:result', wrapper(WriteWellController.writeWellIsOK))

//obtener palabra para ortografia
router.get('/:id_player', wrapper(WriteWellController.getWriteWell))

export default router
