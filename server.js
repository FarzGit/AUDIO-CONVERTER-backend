import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
const port = process.env.PORT||5000;
import userRoute from './routers/userRouters.js'
import adminRouter from './routers/adminRouter.js'
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDb from "./config/db.js";

connectDb();
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(cookieParser())
app.use('/api/users',userRoute)
app.use('/api/admin',adminRouter)


app.use(notFound)
app.use(errorHandler)


app.get('/',(req,res)=> res.send('server is ready'))

app.listen(port,()=> console.log(`server connected port ${port}`))