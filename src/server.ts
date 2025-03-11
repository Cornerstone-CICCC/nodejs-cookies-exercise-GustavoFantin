import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cookieParser from 'cookie-parser'
import pageRouter from './routes/page.routes'
dotenv.config()

// Create server
const app = express()

//MiddleWares
app.use(cookieParser(process.env.COOKIE_KEY))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../src/views'))
app.use(express.static(path.join(__dirname, 'public')))


//Routes
app.use('/', pageRouter)

//404 Fallbacks
app.use((req: Request, res: Response) => {
    res.status(404).render('404')
})

//Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})