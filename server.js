// import npm packages
import 'dotenv/config.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import createError from 'http-errors'
import logger from 'morgan'
import { errorHandler } from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'


// import routers
import { router as indexRouter } from './routes/index.js'
import { router as userRouter } from './routes/user.route.js'
// create the express app
const app = express()
// const csrfProtection = csurf({ cookie: true });


app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
  )
)
// app.use(csrfProtection)

// mount imported routes
app.use('/', indexRouter)
app.use('/api/v1/user' , userRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler

app.use(errorHandler)

export { app }
