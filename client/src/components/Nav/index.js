import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";

function Nav() {
	function showNavigation() {
		if (Auth.loggedIn()) {
			return (
				<ul className="flex-row">
					<li className="mx-1">
						<Link to="/orderHistory"> Order History </Link>
					</li>
					<li className="mx-1">
						{/* this is not using the Link component to logout our user and then refresh the application to the start */}
						<a href="/" onClick={() => Auth.logout()}>
							logout
						</a>
					</li>
				</ul>
			);
		} else {
			return (
				<ul className="flex-row">
					<li className="mx-1">
						<Link to="/signup">Signup</Link>
					</li>
					<li className="mx-1">
						<Link to="/login">Login</Link>
					</li>
				</ul>
			);
		}
	}

	return (
		<header className="flex-row px-1">
			<h1>
				<Link to="/">
					<span role="img" aria-label="shopping bag">
						🛍️
					</span>
					Pet Stuff Plus
				</Link>
			</h1>

			<nav>{showNavigation()}</nav>
			<SearchBar />
		</header>
	);
}

export default Nav;
