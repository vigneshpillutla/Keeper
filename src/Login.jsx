import React,{useState} from "react";
import logo from "./logo/Login.png";
import { Link } from "react-router-dom";
async function loginUser(credentials) {
    return fetch("https://keep-er-api.herokuapp.com/login", {
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({...credentials}),
        credentials:'include'
    })
    .then(response => response.json())
    .catch(error => console.log('error', error));
}
function Login(props){
    const [invalidLogin,setInvalidLogin] = useState("hidden-content")
    const {user,setUser} = props;
    const [formData,setFormData] = useState({
        email:"",
        password:""
    });
    if(user.loggedIn){
        props.history.replace('/')

    }
    const handleFormSubmit = async (event)=>{
        event.preventDefault();
        const response = await loginUser(formData);
        if(response.loggedIn){
            setUser({...response.user,loggedIn:true});
        }
        else{
            setInvalidLogin("");
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
            <form className="login-form" onSubmit={handleFormSubmit}>
                <img src={logo} alt="user" className="userLogo"/>
                {/* <h1>Login</h1> */}
                <input  name="email" onChange={changeFormData}  type="email" placeholder="Email" value={formData.email} required/>
                <input  name="password" onChange={changeFormData} type="password"placeholder="Password" minLength="3" value={formData.password} required/>
                <button  type='submit'>Login</button>
                <p className={`login-alert ${invalidLogin}`}>*Invalid username or password</p>
                <Link to="/signup">
                    <p>Don't have an account? Sign up</p>
                </Link>
            </form>
        </div>
    );
}

export default Login;