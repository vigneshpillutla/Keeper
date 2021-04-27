import React, { useState } from "react";
import { Redirect } from "react-router-dom";


async function signUpUser(credentials){
    var requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(credentials),
        credentials:'include'
    };
    return fetch("http://localhost:9000/register", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
    
}


function SignUp(props){
    const {setUser} = props;
    const [formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    });
    function changeFormData(event){
        const {value:newValue,name}= event.target;
        setFormData((prevValue)=>{
            if(name==="firstName"){
                return ({
                    ...prevValue,
                    firstName:newValue
                });
            }
            if(name==="lastName"){
                return ({
                    ...prevValue,
                    lastName:newValue
                });
            }
            if(name==="email"){
                return ({
                    ...prevValue,
                    email:newValue
                });
            }
            if(name==="password"){
                return ({
                    ...prevValue,
                    password:newValue
                });
            }
        });
    }
    const handleFormSubmit = async (event)=>{
        event.preventDefault();
        const response = await signUpUser(formData);
        if(response.loggedIn){
            setUser({...response.user,loggedIn:true});
        }
        // console.log("signed!!");
        props.history.replace('/')
        
    }
    return (
        <div className="login-page">
            <div className="login-form">
                <h1>Sign Up</h1>
                <input  name="firstName" onChange={changeFormData}  type="text" placeholder="First Name" value={formData.firstName}/>
                <input  name="lastName" onChange={changeFormData}  type="text" placeholder="Last Name" value={formData.lastName}/>
                <input  name="email" onChange={changeFormData}  type="text" placeholder="Email" value={formData.email}/>
                <input  name="password" onChange={changeFormData} type="password"placeholder="Password" value={formData.password}/>
                <button  onClick={handleFormSubmit}>SignUp</button>
            </div>
        </div>
    )
}

export default SignUp;