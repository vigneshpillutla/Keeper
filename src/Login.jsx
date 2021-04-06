import React,{useState} from "react";
import logo from "./logo/Login.png";
import { Link } from "react-router-dom";
async function loginUser(credentials) {
    const {email,password} = credentials;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    
    };

    return fetch("http://localhost:9000/login", requestOptions)
    .then(response => response.status)
    .then(result => result)
    .catch(error => console.log('error', error));
}
function Login({setUser}){
    const [formData,setFormData] = useState({
        email:"",
        password:""
    });
    const handleFormSubmit = async (event)=>{
        event.preventDefault();
        const status = await loginUser(formData);
        console.log(status);
        if(status===200){         
            setUser({
                loggedIn:true,
                email:formData.email
            });
        }
        
    }
    function changeFormData(event){
        const {value:newValue,name} = event.target;
        setFormData(prevValue=>{
            if(name=== "email"){
                return({
                    ...prevValue,
                    email:newValue
                });
            }
            else{
                return({
                    ...prevValue,
                    password:newValue
                });
            }
        }) ;
    }
    return(
        <div className="login-page">
            <div className="login-form">
                <img src={logo} alt="user" className="userLogo"/>
                {/* <h1>Login</h1> */}
                <input  name="email" onChange={changeFormData}  type="text" placeholder="Email" value={formData.email}/>
                <input  name="password" onChange={changeFormData} type="password"placeholder="Password" value={formData.password}/>
                <button  onClick={handleFormSubmit}>Login</button>
                <Link to="/register">
                    <p>Don't have an account? Sign up</p>
                </Link>
            </div>
        </div>
    );
}

export default Login;