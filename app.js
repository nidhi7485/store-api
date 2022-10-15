require('dotenv').config()

const express = require('express')
const app = express()
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
// middleware
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Store Api</h1><a href="/api/v1/products">products route</a>')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 3000

// app.listen(port, console.log(`server is listening on port ${port}...`))
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}
start()
