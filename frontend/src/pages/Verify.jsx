import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {

    const { navigate, token, setCartItem, backendUrl } = useContext(ShopContext);
    const [searchParems, setSearchParems] = useSearchParams()

    const success = searchParems.get('success');
    const orderId = searchParems.get('orderId');
    const userId = searchParems.get('userId')


    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }

            const response = await axios.post(`${backendUrl}/api/order/verify-stripe`, {
                success,
                orderId,
                userId
            }, {
                headers: {
                    token: token
                }
            })

            if (response.data.success && success) {
                setCartItem({})
                navigate('/orders')
            } else {
                navigate('/cart')

            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }

    }

    useEffect(() => {
        verifyPayment()
    }, [
        token
    ])

    return (
        <div>



        </div>
    )
}

export default Verify