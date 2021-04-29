import React, { useState } from "react";
import { Link } from "react-router-dom";



async function signUpUser(credentials){
    var requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(credentials),
        credentials:'include'
    };
    return fetch("https://keep-er-api.herokuapp.com/register", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
    
}


function SignUp(props){
    const [invalidSignup,setInvalidSignup] = useState("hidden-content")
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
        else{
            setInvalidSignup("");
        }
        props.history.replace('/')
    }
    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleFormSubmit}>
                <h1>Sign Up</h1>
                <input  name="firstName" onChange={changeFormData}  type="text" placeholder="First Name" value={formData.firstName} required/>
                <input  name="lastName" onChange={changeFormData}  type="text" placeholder="Last Name" value={formData.lastName} required/>
                <input  name="email" onChange={changeFormData}  type="email" placeholder="Email" value={formData.email} required/>
                <input  name="password" onChange={changeFormData} type="password"placeholder="Password" minlength="3" value={formData.password} required/>
                <p className={`login-alert ${invalidSignup}`}>*User already exists</p>
                <button  type='submit'>SignUp</button>
                <Link to="/login">
                    <p>Already have an account? Login</p>
                </Link>
            </form>
        </div>
    )
}

export default SignUp;