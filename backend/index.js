const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

const userRoutes=require('./routes/user')

require('dotenv').config();
const app=express();
app.use(express.json());
app.use(cors());
const PORT=8080;


app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB");
})
.catch((e)=>{
    console.error("Error connecting to MongoDB:", e);
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})