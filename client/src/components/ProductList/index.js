import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";

import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";

import { idbPromise } from "../../utils/helpers";

import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";

function ProductList() {
	const [state, dispatch] = useStoreContext();
	const { currentCategory } = state;
	const { loading, data } = useQuery(QUERY_PRODUCTS);

	useEffect(() => {
		// if there's data to be stored
		if (data) {
			// let's store it in the global state object
			dispatch({
				type: UPDATE_PRODUCTS,
				products: data.products,
			});

			// but let's also take each product and save it to IndexedDB using the helper function
			data.products.forEach((product) => {
				idbPromise("products", "put", product);
			});
			// add else if to check if `loading` is undefined in `useQuery()` Hook
		} else if (!loading) {
			// since we're offline, get all of the data from the `products` store
			idbPromise("products", "get").then((products) => {
				// use retrieved data to set global state for offline browsing
				dispatch({
					type: UPDATE_PRODUCTS,
					products: products,
				});
			});
		}
	}, [data, loading, dispatch]);

	function filterProducts() {
		if (!currentCategory) {
			return state.products;
		}

		return state.products.filter(
			(product) => product.category._id === currentCategory
		);
	}

	return (
		<Flex
			flexDirection={"column"}
			alignItems={"center"}
			justifyContent={"space-between"}
		>
			<Heading justifyContent={"center"}>Available Products:</Heading>
			{state.products.length ? (
				<SimpleGrid
					columns={[1, 2, 3, 4, 5]}
					spacing={"20px"}
					alignItems={"center"}
				>
					{filterProducts().map((product) => (
						<ProductItem
							key={product._id}
							_id={product._id}
							image={product.image}
							name={product.name}
							price={product.price}
							quantity={product.quantity}
						/>
					))}
				</SimpleGrid>
			) : (
				<Text justifyContent={"center"}>
					You haven't added any products yet!
				</Text>
			)}
			{loading ? <img src={spinner} alt="loading" /> : null}
		</Flex>
	);
}

export default ProductList;
