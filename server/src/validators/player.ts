import * as Joi from 'joi'

class PlayerValidator {
  public addPlayerToGame() {
    return Joi.object({
      id_game: Joi.number().required(),
      id_player: Joi.number(),
    })
  }

  public player() {
    return Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
    })
  }
}

export default new PlayerValidator()
