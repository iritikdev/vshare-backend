const mongoose = require('mongoose')
const express = require('express')
const app = express()

const customers = require('./routes/customers')
const genres = require('./routes/genres')

mongoose
    .connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...'))

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
