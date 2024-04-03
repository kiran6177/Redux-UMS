const express = require('express')
const { dbConnect,sequelize } = require('./config/config');
const nocache = require('nocache')
const cors = require('cors')
const path = require('path')
const userRouter = require('./routes/userRoute')
const adminRouter = require('./routes/adminRoute')
const {errorHandler} = require('./middleware/errorHandler')

const app = express()
require('dotenv').config()

dbConnect()
sequelize.sync()
.then(()=>{
    console.log("DB synced");
})
.catch((err)=>{
    console.log(err.message);
})

app.use(cors({
    origin:'http://localhost:3001',
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials:true
}))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/assets', express.static(path.join(__dirname,'/assets')));

app.use(nocache())

app.use('/admin',adminRouter)
app.use('/',userRouter)

app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})