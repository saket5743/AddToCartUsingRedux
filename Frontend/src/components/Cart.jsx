import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeCart, removeFromCart } from '../Redux/Action'

const Cart = () => {

    const [count, setCount] = useState({});

    const cartItems = useSelector((state)=>state.cart)
    console.log(cartItems, "cartll1")
    const dispatch = useDispatch();  

    useEffect(() => {
        const existingCart = JSON.parse(localStorage.getItem("clothes"));
    
        if (existingCart && Array.isArray(existingCart)) {
            const uniqueItemsMap = new Map();
    
            existingCart.forEach(item => {
                if (item?.id && !uniqueItemsMap.has(item.id)) {
                    uniqueItemsMap.set(item.id, item);
                }
            });
            const uniqueCartItems = Array.from(uniqueItemsMap.values());
            console.log(uniqueCartItems, 'Filtered Unique Items');
            dispatch(initializeCart(uniqueCartItems));

            const countsData = {};
            uniqueCartItems.forEach(item => {
                countsData[item.id] = item.count || 1;
            });
            setCount(countsData)
        }
    }, [dispatch]);


    const updatedLocalStorage = (updateCount) => {
        const existingCart = JSON.parse(localStorage.getItem("clothes")) || [];
        const updatedCart = existingCart.map(product => ({
            ...product,
            count : updateCount[product.id] || 1,
        }));
        localStorage.setItem("clothes", JSON.stringify(updatedCart));
    }
    

    function handleRemoveFromCart(productId) {
      dispatch(removeFromCart(productId));
      const existingCart = JSON.parse(localStorage.getItem("clothes"));
      const updatedCart = existingCart.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem("clothes", JSON.stringify(updatedCart));
    }

    function handleIncrease(productId){
       const newCount = {
        ...count,
        [productId] : (count[productId] || 1) + 1
       }
       
    }

    function handleDecrease(){

    }


  return (
    <div>
        <div style={{display:'flex', flexWrap:'wrap', gap:'20px'}}>
         {
            cartItems.map((product)=>(
                <div key={product.id} style={{border:'2px solid black', width:'310px', height:'320px', marginLeft:'30px', marginTop:'50px', textAlign:'center', padding:'8px', borderRadius:'10px', marginBottom:'20px'}}>
                    <div>
                        <img src={product.image} alt="" style={{width:'50px', height:'120px'}}/>
                    </div>
                    <div>
                        <p>{product.title}</p>
                    </div>
                    <div>
                        <p>{product.price}</p>
                    </div>
                    <div>
                        Count : {count[product.id] || 1} 
                        <span style={{backgroundColor:'yellow', border:'1px solid gray'}} onClick={()=>handleIncrease(product.id)}>+</span> 
                        <span style={{backgroundColor:'yellow', border:'1px solid gray'}} onClick={()=>handleDecrease(product.id)}>-</span>
                    </div>
                    <div>
                        <button onClick={()=>handleRemoveFromCart(product.id)}>Discard</button>
                    </div>
                </div>
            ))
         }
        </div>
    </div>
  )
}

export default Cart