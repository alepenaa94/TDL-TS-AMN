import * as Joi from 'joi'

class MathValidator {
  public math() {
    return Joi.object({
      operator: Joi.string().required(),
    })
  }
}

export default new MathValidator()
