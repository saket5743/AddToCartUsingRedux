import React, { useEffect, useState } from 'react'
import {useDispatch} from "react-redux"
import { Action } from '../Redux/Action';


const Home = () => {
  const [checkLogin, setCheckLogin] = useState(false);
  const [data , setdata] = useState([])
  const [search , setSearch] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    const userData = localStorage.getItem("userdetails");
    if (userData) {
      setCheckLogin(true);
    }

    const productData = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const res = await response.json();
      setdata(res);
      console.log(res, "uuu");
    };
    productData();
  }, []);

  const handleAddToCart =(product)=>{
     if(!checkLogin){
      window.location.href = '/login'
     }else{
      console.log(product, "sddsd")

      const existingCart = JSON.parse(localStorage.getItem("clothes")) || [];
      const productExists = existingCart.some(item => item.id === product.id)

      if(!productExists){
        const updatedCart = [...existingCart, product];
        localStorage.setItem("clothes", JSON.stringify(updatedCart));
        dispatch(Action(product))
      }else{
        console.log("Product is already in cart")
      }
     }
  }  

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
        <div>            
            <div style={{display:'flex', justifyContent:'space-around'}}>
            <h1>This is my Home page</h1>
                <input onChange={handleSearch} value={search} type="text" placeholder='Search here' style={{height:'35px', width:'300px', borderRadius:'10px', marginLeft:'90px'}} />
              </div>
            <div style={{display:'flex', flexWrap:'wrap', gap:'20px'}}>
              
            {filteredData.map((product)=>(
              <div style={{border:'2px solid black', width:'310px', marginLeft:'30px', textAlign:'center', padding:'8px', borderRadius:'10px', marginBottom:'20px'}}>
                <div>
                  <img src={product.image} alt="" style={{width:'200px', height:'120px'}} />
                </div>
                <div>
                  {product.title}
                </div>
                <div>
                  {product.price}
                </div>
                <div>
                  <button onClick={()=>handleAddToCart(product)} style={{width:'150px', height:'30px', background:'linear-gradient(to right, red, orange)'}}>Add to cart</button>
                </div>
              </div>
            ))}
            </div>

            <div>
            </div>
        </div>
    </div>
  )
}

export default Home