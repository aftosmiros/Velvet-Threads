import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₸';
  const delievry_fee = 3000;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const[token , setToken] = useState('');
  const navigate = useNavigate()
  const [products , setProducts] = useState([]);


  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItem);

    if (!size) {
      toast.error('Select Product Size');
      return;
    }

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);

    if(token){
      try {
        await axios.post(`${backendUrl}/api/cart/add`, {
          itemId,
          size
        },{
          headers :{token : token}
        })
    
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }

  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {}
      }
    }

    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    console.log('Inside the update');
    let cartData = structuredClone(cartItem);

    cartData[itemId][size] = quantity;

    setCartItem(cartData);

    if(token){
      try {
        await axios.post(`${backendUrl}/api/cart/update`, {
          itemId,
          size,
          quantity
        },{
          headers :{token : token}
        
        })
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
    }


  };

  const getCartAmout = () => {
    let totalAmout = 0;

    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);

      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmout += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {
          
        }
      }

    }
    return totalAmout;
  };


  const getProductsData = async()=>{
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`)

      if(response.data.success){
        setProducts(response.data.products)
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  const getUserCart = async(token) =>{
    try {
      const response = await axios.post(`${backendUrl}/api/cart/get`,{},{
        headers:{
          token : token
        }
      })

      if(response.data.success){
        setCartItem(response.data.cartData)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  useEffect(()=>{
    getProductsData()
  },[])


  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'))
    }
  }, [token, cartItem]);  



  const value = {
    products,
    currency,
    delievry_fee,
    search,
    setSearch,
    setShowSearch,
    showSearch,
    cartItem,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmout,
    navigate,
    backendUrl,
    token ,
    setToken,
    setCartItem
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children} 
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
