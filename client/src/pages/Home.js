import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import { Container } from "@chakra-ui/react";

const Home = () => {
	return (
		<Container>
			<CategoryMenu />
			<ProductList />
			<Cart />
		</Container>
	);
};

export default Home;
