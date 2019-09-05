module.exports = options => {
  return async (req, res, next) => {
    const inflection = require('inflection')
    const modelName = inflection.classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)
  
    next()
  }
}