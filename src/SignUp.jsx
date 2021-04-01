import React, { useState } from "react";


async function signUpUser(credentials){
    const {firstName,lastName,username,password} = credentials;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("firstName", firstName);
    urlencoded.append("lastName", lastName);
    urlencoded.append("username", username);
    urlencoded.append("password", password);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };
    return fetch("http://localhost:9000/register", requestOptions)
    .then(response => response.text())
    .then(result => result)
    .catch(error => console.log('error', error));
    
}


function SignUp({setToken}){
    const [formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        username:"",
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
            if(name==="username"){
                return ({
                    ...prevValue,
                    username:newValue
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
        if(status==="OK"){
            setToken(true);
        }
        
    }
    return (
        <div className="login-page">
            <div className="login-form">
                <h1>Sign Up</h1>
                <input  name="firstName" onChange={changeFormData}  type="text" placeholder="First Name" value={formData.firstName}/>
                <input  name="lastName" onChange={changeFormData}  type="text" placeholder="Last Name" value={formData.lastName}/>
                <input  name="username" onChange={changeFormData}  type="text" placeholder="Email" value={formData.username}/>
                <input  name="password" onChange={changeFormData} type="password"placeholder="Password" value={formData.password}/>
                <button  onClick={handleFormSubmit}>SignUp</button>
            </div>
        </div>
    )
}

export default SignUp;