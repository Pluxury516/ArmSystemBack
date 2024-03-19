const express = require('express')
const userRouter = require('../routes/user.routes')
const schoolRouter = require('../routes/school.routes')
const newsRouter = require('../routes/news.router')
const PORT = process.env.PORT || 8080
const cors = require('cors')
const app = express()




app.use(express.json())
app.use(cors())
app.use('/api', userRouter)
app.use('/api', schoolRouter)
app.use('/api',newsRouter)





app.listen(PORT, ()=> console.log(`server started on port ${PORT}`) )