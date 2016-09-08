module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const mongoose = require('mongoose')
  const Article = mongoose.model('Article')
  const Category = mongoose.model('Category')

  // 获取文章列表
  router.get('/articles', async (req, res) => {
    const data = await Article.find()

    res.send(data)
  })

  // 获取置顶文章
  router.get('/articles/top', async (req, res) => {
    const data = await Article.find().where({
      isTop: true
    }).sort({'createdAt': -1}).limit(6)

    res.send(data)
  })

  // 获取指定页码的文章
  router.get('/articles/:pageNum', async (req, res) => {
    const currentPage = req.params.pageNum;
    const list = await Article.find().sort({'createdAt': -1}).skip((currentPage - 1) * 6).limit(6).populate('categories')
    const count = await Article.find().lean().count()
    const totalPage = Math.ceil(count / 6)
    res.send({
      list,
      totalArticles: count,
      totalPage,
      currentPage
    })
  })

  // 获取文章详情
  router.get('/article/:id', async (req, res) => {
    const data = await Article.findById(req.params.id).populate('categories')
    res.send(data)
  })

  // 按照年进行归类后的数据
  router.get('/archive', async (req, res) => {
    const data = await Article.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'newList'
        }
      },
      {
        $group: {
          _id: {
            $year: '$createdAt',
          },
          count: {$sum: 1},
          list: {
            $push: {
              _id: '$_id',
              title: '$title',
              summary: '$summary',
              categories: '$newList',
              createdAt: '$createdAt',
            }
          }
        }
      },
      {$sort: {_id: -1}}
    ])
    res.send(data)
  })

  // 获取标签数据
  router.get('/tags', async(req, res) => {
    const data = await Category.aggregate([
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'tagsList'
        }
      }
    ])

    res.send(data)
  })

  app.use('/web/api', router)
}