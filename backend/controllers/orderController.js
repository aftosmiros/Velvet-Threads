import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

const currency = 'usd'
const deliveryFee = 10

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.status(200).json({ success: true, message: "Order placed" })
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100 / 500,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery fee",
                },
                unit_amount: deliveryFee * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        await newOrder.save()

        res.status(200).json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error)
        next(error);
    }
}

const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            return res.status(200).json({ success: true })
        }

        await orderModel.findByIdAndDelete(orderId)
        res.status(200).json({ success: false })

    } catch (error) {
        console.log(error)
        next(error);
    }
}

const allOrders = async (req, res) => {
    try {
        // lean() для получения обычных js-объектов
        let orders = await orderModel.find({}).lean();;

        orders = orders.map(order => {
            if (
                order.amount &&
                typeof order.amount === 'object' &&
                (
                    order.amount.low !== undefined ||
                    order.amount.high !== undefined ||
                    order.amount.unsigned !== undefined
                )
            ) {
                order.amount = order.amount.toString();
            }
            order.items = order.items.map(item => {
                if (
                    item.price &&
                    typeof item.price === 'object' &&
                    (
                        order.amount.low !== undefined ||
                        order.amount.high !== undefined ||
                        order.amount.unsigned !== undefined
                    )
                ) {
                    item.price = item.price.toString();
                }
                return item;
            });
            return order;
        });

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        const orders = await orderModel.find({ userId })

        res.status(200).json({ success: true, orders })
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });

        res.status(200).json({ success: true, message: "Status updated" })
    } catch (error) {
        console.log(error)
        next(error);
    }
}

export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe };