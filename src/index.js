/* eslint-disable camelcase */
import express from 'express'
import morgan from 'morgan'
import { PORT } from './config/config.js'
import userRoutes from './routes/user_management.routes.js'
import { uploadImages } from './config/multer.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/users', uploadImages.single('profilePicture'), userRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
