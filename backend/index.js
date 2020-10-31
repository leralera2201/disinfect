const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = 5000
const MONGO_URL = 'mongodb://localhost/disinfectant'

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(err => console.log(err))

app.use('/api/auth', require('./routes/userRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/categories', require('./routes/categoryRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))

app.listen(PORT, () => console.log('App was running...'))
