const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World Jack X')
})



app.listen(3000, () => {
  console.log('Servidor up en puerto 3000')
})