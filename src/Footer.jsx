import React from "react";

const date = new Date();

function Footer(){
	return (
		<footer>
			<p>&#169; Copyright {date.getFullYear()}</p>
		</footer>
	);
}

export default Footer;