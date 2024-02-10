import express from "express";
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT||8000;
import userRoute from './routers/userRouters.js'

const app = express()

app.use('/api/users',userRoute)

app.get('/',(req,res)=> res.send('server is ready'))

app.listen(port,()=> console.log(`server connected port ${port}`))