const express = require('express')
const cors = require('cors')
const app = express()

app.set('secret', '221jfdsklfj1')

app.use(cors())
app.use(express.json())

app.use('/uploads', express.static(__dirname + '/uploads'))

require('./db/db')(app)
require('./routers/admin/index')(app)

app.listen('3000', async(req, res) => {
  console.log("http://localhost:3000")
})