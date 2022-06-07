// Handles following routes:
// GET '/game'

import express from 'express'

import { wrapper } from '../../helpers'
import { GameController } from '../../controllers'

const router = express.Router()

/**
 * @openapi
 * /v0/user:
 *  get:
 *    tags:
 *    - User
 *    summary: Get API Version
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  $ref: '#/components/schemas/version'
 */
router.get('', wrapper(GameController.getGames))

export default router
