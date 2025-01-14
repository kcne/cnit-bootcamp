import express from 'express'
import userRoutes from './routes/userRoutes'
import profileRoutes from './routes/profileRoutes'
import orderRoutes from './routes/orderRoutes'
import roleRoutes from './routes/roleRoutes'
import lectureRoutes from './routes/lectureRoutes'

const app = express()

// Middleware to parse JSON requests
app.use(express.json())

// Register routes
app.use('/api', userRoutes)
app.use('/api', profileRoutes)
app.use('/api', orderRoutes)
app.use('/api', roleRoutes)
app.use('/api', lectureRoutes)

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

export default app
