// console.log('Node is running!')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(bodyParser.json()) // for Content-Type: application/json request
app.use(bodyParser.urlencoded({extended: true})) // for application/x-www-form-urlencoded request

require('./server/db')(app)

app.use('/portfolio', require('./server/routes/portfolio'))
app.use('/blog', require('./server/routes/blog'))
app.use('/email', require('./server/routes/email'))
app.use('/admin-secret-key', require('./server/routes/admin'))
app.use('/', require('./server/routes/index'))

app.listen(process.env.PORT || 3000, function() {

    console.log('Listening on PORT 3000')

})