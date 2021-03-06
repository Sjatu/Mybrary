if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true, useUnifiedTopology:true})
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log('connected to mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(port, () => {
    console.log('Server Up At Port:', port)
})