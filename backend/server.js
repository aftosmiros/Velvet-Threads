import express from "express"
import cors from "cors"
import "dotenv/config" 
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRouter.js"
import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"
import orderRouter from "./routes/orderRouter.js"
import errorHandler from "./middleware/errorHandler.js"

// App config 
const app = express()
const port = process.env.PORT || 3000
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json())
app.use(cors())

// API endpoints
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get('/', (req, res)=>{
    res.send("API working")
})

app.use(errorHandler)

app.listen(port, ()=>{console.log(`Server started listening on port - ${port}`)})