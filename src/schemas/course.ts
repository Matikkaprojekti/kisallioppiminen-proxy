import Joi from 'joi'

export default Joi.object().keys({
  coursekey: Joi.string().required(),
  name: Joi.string().required(),
  html_id: Joi.string().required(),
  startdate: Joi.date().required(),
  enddate: Joi.date().greater(Joi.ref('startdate')).required()
})
