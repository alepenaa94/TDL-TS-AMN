import * as Joi from 'joi'

class PlayerValidator {
  public player() {
    return Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
    })
  }
}

export default new PlayerValidator()
