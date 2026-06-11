import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = Number(process.env.PORT ?? 8000)
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_tracker'

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-tracker-backend' })
})

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
