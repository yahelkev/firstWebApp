const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/byDescription', (req, res) => {
  res.send('yaay')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})