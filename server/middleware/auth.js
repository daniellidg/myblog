module.exports = options => {
  const jwt = require('jsonwebtoken')
  const User = require('../models/User')

  return async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(" ").pop()
    if (!token) {
      res.status(401).send({
        message: 'token不存在'
      })
    }
    try {
      const {id} = jwt.verify(token, req.app.get('secret'))
      if (!id) {
        res.status(401).send({
          message: 'token错误'
        })
      }

      const user = await User.findById(id)
      if (!user) {
        res.status(401).send({
          message: 'token错误, 用户不存在' 
        })
      }  
    } catch (e) {
      res.status(401).send({
        message: 'jwt token error'
      })
    }

    next()
  }
}