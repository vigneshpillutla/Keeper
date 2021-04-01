import React,{useState} from "react";
import logo from "./logo/Login.png";
import { Link } from "react-router-dom";
async function loginUser(credentials) {
    const {username,password} = credentials;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    };

    return fetch("http://localhost:9000/login", requestOptions)
    .then(response => response.text())
    .then(result => result)
    .catch(error => console.log('error', error));
}
function Login({setUser}){
    // const url = "localhost:9000/login";
    const [formData,setFormData] = useState({
        username:"",
        password:""
    });
    const handleFormSubmit = async (event)=>{
        event.preventDefault();
        const status = await loginUser(formData);
        console.log(status);
        if(status==="OK"){
            
            setUser({
                loggedIn:true,
                username:formData.username
            });
        }
        
    }
    function changeFormData(event){
        const {value:newValue,name} = event.target;
        setFormData(prevValue=>{
            if(name=== "username"){
                return({
                    ...prevValue,
                    username:newValue
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
                <input  name="username" onChange={changeFormData}  type="text" placeholder="Email" value={formData.username}/>
                <input  name="password" onChange={changeFormData} type="password"placeholder="Password" value={formData.password}/>
                <button  onClick={handleFormSubmit}>Login</button>
                <Link to="/signup">
                    <p>Don't have an account? Sign up</p>
                </Link>
            </div>
        </div>
    );
}

export default Login;