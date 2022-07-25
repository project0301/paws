import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import SearchBar from "../components/SearchBar";
import { Container } from "@chakra-ui/react";

const Home = () => {
	return (
		<Container maxW={"95%"} display={"flex"} centerContent>
			<Cart />
			<SearchBar />
			<CategoryMenu />
			<ProductList />
		</Container>
	);
};

export default Home;
