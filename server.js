const express=require('express') 
const connectDb=require('./config/db')
const app=express()
const port=3000;

// connecting Db
connectDb();

// initialize the Middleware
app.use(express.json({ extended: false }))

// calling user routes
const userRoute=require('./routes/user')
app.use('/api/user',userRoute)

// calling admin routes
const adminRoute=require('./routes/admin')
app.use('/api/admin',adminRoute)



// calling delivery

// const deliveryRoute=require('./routes/delivery')
// app.use('/api/delivery',deliveryRoute)







app.get("/KB_Task",(req,res)=>{
    res.send("hello user")
})

app.listen(port,()=>{
    console.log(`your server is runnig on ${port}`);
})