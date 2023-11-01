const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World Jack X')
})

app.listen(3000)