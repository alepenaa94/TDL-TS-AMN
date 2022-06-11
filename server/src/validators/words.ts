import * as Joi from 'joi'

class WordValidator {
  public word() {
    return Joi.object({
      id_word: Joi.number().required(),
      id_player: Joi.number().required(),
      letter: Joi.string().required(),
    })
  }

  public player() {
    return Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
    })
  }
}

export default new WordValidator()
