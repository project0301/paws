import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

import {
	Flex,
	Breadcrumb,
	BreadcrumbItem,
	Image,
	chakra,
} from "@chakra-ui/react";

function Nav() {
	function showNavigation() {
		if (Auth.loggedIn()) {
			return (
				<Breadcrumb fontWeight={"medium"} fontSize="x-large">
					<BreadcrumbItem>
						<Link to="/orders">Order History</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>
						<Link
							to="/"
							alt={"Logout of your Pet Stuff Plus Account"}
							onClick={() => Auth.logout()}
						>
							Logout
						</Link>
					</BreadcrumbItem>
				</Breadcrumb>
			);
		} else {
			return (
				<Breadcrumb fontWeight={"medium"} fontSize="x-large">
					<BreadcrumbItem>
						<Link to="/login">Login</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>
						<Link to="/signup">Sign Up</Link>
					</BreadcrumbItem>
				</Breadcrumb>
			);
		}
	}
	return (
		<chakra.header>
			<Flex w="100%" px="6" py="5" align={"center"} justify={"flex-start"}>
				<Link to="/">
					<Image src={Logo} h="75px" mx={"2"} />
				</Link>
				{showNavigation()}
			</Flex>
		</chakra.header>
	);
}

export default Nav;
