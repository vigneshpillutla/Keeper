import React from "react";
import "./Header.css";
import appLogo from './logo/appLogo.png';
import {Redirect} from 'react-router-dom';
function Header(props){
	const {user,setUser} = props
	const {firstName} = user
	const logout = ()=>{
		fetch("https://keep-er-api.herokuapp.com/logout",{credentials:'include'})
		.then(res=>res.json())
		.then(response=>{
			console.log("User logged out !");
			setUser({
				firstName:"",
				lastName:"",
				email:"",
				notes:[],
				loggedIn:false
			})
			return <Redirect to='/' />
		});
	}
	return (
		<header>
			<div className="appName">
			<img src={appLogo} alt=""/>
			<h1>Keeper</h1>
			</div>
			<div className="userUtilities">
			<h3>Welcome, {firstName}!</h3>
			<button onClick={logout} className="logout">Logout</button>
			</div>
		</header>
	);
}

export default Header;