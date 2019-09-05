module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const mongoose = require('mongoose')
  const multer = require('multer')
  const User = mongoose.model('User')
  const bcrypt = require('bcrypt')
  const jwt = require('jsonwebtoken')
  const resourceMiddleware = require('../../middleware/resource')
  const authMiddleware = require('../../middleware/auth')

  router.get('/', async (req, res) => {
    const data = await req.Model.find()
    res.send(data)
  })

  router.get('/:id', async (req, res) => {
    const data = await req.Model.findById(req.params.id)
    res.send(data)
  })

  router.delete('/:id', async (req, res) => {
    const data = await req.Model.findByIdAndDelete(req.params.id)
    res.send(data)
  })

  router.post('/', async (req, res) => {
    const data = await req.Model.create(req.body)
    res.send({
      status: 0,
      message: "保存成功"
    })
  })

  router.put('/:id', async (req, res) => {
    const data = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      status: 0,
      message: "保存成功"
    })
  })

  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  // 图片上传
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async(req, res) => {
    const file = req.file
    file.url = 'http://localhost:3000/uploads/' + file.filename
    res.send(file)
  })

  // 登录
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    if (!username) {
      res.status(422).send({
        message: "用户名为空"
      })
      return;
    }
    if (!password) {
      res.status(422).send({
        message: "密码为空"
      })
      return;
    }
    // 1.验证用户名是否存在
    const user = await User.findOne({username}).select('+password')
    if (!user) {
      res.status(422).send({
        message: "用户名错误"
      })
      return;
    }
    // 2. 验证密码是否合法
    const isValid = bcrypt.compareSync(password, user.password)
    if (!isValid) {
      res.status(422).send({
        message: "密码错误"
      })
      return;
    }
    // 3. 生成jwt token并返回
    const token = jwt.sign({id: user._id}, app.get('secret'))
    res.send({
      status: 0,
      username: user.username,
      token: token
    })
  })
}