import express from "express";
import {placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.get('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)

orderRouter.post('/user-orders', authUser, userOrders)

orderRouter.post('/verify-stripe', authUser, verifyStripe)


export default orderRouter

