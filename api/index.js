const express = require('express');
const app  = express();
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose')
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const prodRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const paymRoute = require("./routes/razorpay");



var cors = require('cors')

app.use(cors())

mongoose.connect(
    process.env.MONGO_URL
,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    writeConcern: { 
      w: 'majority', 
      j: true, 
      wtimeout: 1000 
    }
 } ).then(() => {
    console.log("Successful");
}).catch((err) => {
    console.log(err);
});

app.use(express.json());

app.get("/api/test",()=>{
    console.log("test is sucessful");
});

app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/products",prodRoute);
app.use("/api/cart",cartRoute);
app.use("/api/orders",orderRoute);
app.use("/api/checkout",paymRoute);
app.listen(5000, () => {
    console.log("Backend is running");
});