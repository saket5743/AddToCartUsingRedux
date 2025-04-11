import React, { useEffect, useState } from 'react'

const Register = () => {
    const [inputValue, setInputValue] = useState({name:'', email:'', password:''});
    const [flag, setFlag] = useState(false);

    useEffect(()=>{
        console.log('Registered Successfully')
    }, [flag]);

    const handleChange = (e)=>{
        setInputValue({...inputValue, [e.target.name]:e.target.value})
        console.log(inputValue)
    }

    const handleSubmitForm = (e) => {
         e.preventDefault();
         if(![inputValue.name || inputValue.email || inputValue.password]){
            alert('All fields are required.')
         }else{
            fetch('http://localhost:5009/api/v1/user/register', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(inputValue)
            })
            .then((response) => response.json())
            .then((data)=>{
                console.log(data)
                setFlag(true)
                window.location.href = "/login";
            })
            .catch((error)=>{
                console.error('Error:', error)
            })
         }
    }


  return (
    <div>
        <h1>Registration Form</h1>
        <pre>{(flag) ? <h2>Hello {inputValue.name} You're Registered successfully.</h2> : ""}</pre>
        <div style={{marginTop:'100px', marginLeft:'550px', border:'2px solid gray', width:'280px', height:'120px', padding:"24px"}}>
            <form onSubmit={handleSubmitForm}>
                <div>
                    <div>
                        <label>Name</label>
                        <input type="text" placeholder='Enter Name' name='name' value={inputValue.name} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Email</label>
                        <input type="email" placeholder='Enter Email' name='email' value={inputValue.email} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" placeholder='Enter Password' name='password' value={inputValue.password} onChange={handleChange} />
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>
                    <div>
                        <h5><a href="/login">Existing User? Log in</a></h5>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register