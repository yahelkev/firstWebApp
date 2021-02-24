const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/byDescription', (req, res) => {
  res.send('YYou searched for --')
})

app.post('/byDescription', (req, res) => {
  var userid = req.body.id;
  res.send('YYou searched for --' + userid)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})