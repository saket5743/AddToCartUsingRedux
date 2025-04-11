import React, { useEffect, useState } from 'react'

const Login = () => {
  const [inputData, setInputData] = useState({email:'', password:''});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setInputData({...inputData, [e.target.name]:e.target.value})
  }

  useEffect(()=>{
    const storedUserDetail = localStorage.getItem('userdetails');
    if(storedUserDetail){
      setIsLoggedIn(true)
    }
  },[])

  const handleSubmit = (e) => {
        e.preventDefault();
        
        if(![inputData.email || inputData.password]){
          alert('Both fields are required')
        }else{
          fetch('http://localhost:5009/api/v1/user/login', {
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(inputData)
          })
          .then((response)=> response.json())
          .then((data)=>{
            if(data.success){
              setIsLoggedIn(true)
              setInputData({email:'', password:''})
              console.log(inputData)
              localStorage.setItem('userdetails', JSON.stringify(data.data.user));
              window.location.href = "/";
              localStorage.getItem("userdetails","true")
            }else{
              alert('Invalid email or password')
            }
          })
          .catch((error)=>{
            console.error('Error:', error);
            alert('An error occurred during login.');
          })
        }
  }

  return (
    <div>
        <h1>Login Form</h1>
        <div style={{marginTop:'80px', marginLeft:'600px', border:'2px solid gray', width:'240px', height:'100px', padding:'30px'}}>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label>Email</label>
                <input type="email" placeholder='Enter Email' name='email' value={inputData.email} onChange={handleChange} />
              </div>
              <div>
                <label>Password</label>
                <input type="password" placeholder='Enter Password' name='password' value={inputData.password} onChange={handleChange} />
              </div>
              <div>
                <button>Submit</button>
              </div>
              <div>
                <a href="/register">Create an account.</a>
              </div>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Login