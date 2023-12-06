const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();
// express app
const app = express()

// middleware
app.use(express.json())

const authenticate = require('./middleware/authenticate')

const port = process.env.PORT
app.use(cors())

const todoRoutes = require('./routes/ToDoList')
const categoryRoutes = require('./routes/Category')
const userRoutes = require('./routes/User')

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen request
        app.listen(port, () => {
            console.log(`Server running in port http://localhost:${port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// routes todo
app.use('/api/todolist', authenticate ,todoRoutes)

// routes category
app.use('/api/category', authenticate ,categoryRoutes)

// routes user
app.use('/api/user', userRoutes)

