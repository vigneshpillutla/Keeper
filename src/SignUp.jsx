import React, { useState } from "react";


async function signUpUser(credentials){
    const {firstName,lastName,email,password} = credentials;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("firstName", firstName);
    urlencoded.append("lastName", lastName);
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };
    return fetch("http://localhost:9000/register", requestOptions)
    .then(response => response.status)
    .then(result => result)
    .catch(error => console.log('error', error));
    
}


function SignUp({setUser}){
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
    async function handleFormSubmit(event){
        event.preventDefault();
        const status = await signUpUser(formData);
        console.log(status);
        if(status===200){
            setUser({
                loggedIn:true,
                email:formData.email
            });
        }
        
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