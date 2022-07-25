import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Cart from "../components/Cart";
import { useStoreContext } from "../utils/GlobalState";
import {
	REMOVE_FROM_CART,
	UPDATE_CART_QUANTITY,
	ADD_TO_CART,
	UPDATE_PRODUCTS,
} from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";
import {
	Box,
	Container,
	Stack,
	Text,
	Image,
	Flex,
	VStack,
	Button,
	Heading,
	StackDivider,
} from "@chakra-ui/react";

function Detail() {
	const [state, dispatch] = useStoreContext();
	const { id } = useParams();

	const [currentProduct, setCurrentProduct] = useState({});

	const { loading, data } = useQuery(QUERY_PRODUCTS);

	const { products, cart } = state;

	useEffect(() => {
		// already in global store
		if (products.length) {
			setCurrentProduct(products.find((product) => product._id === id));
		}
		// retrieved from server
		else if (data) {
			dispatch({
				type: UPDATE_PRODUCTS,
				products: data.products,
			});

			data.products.forEach((product) => {
				idbPromise("products", "put", product);
			});
		}
		// get cache from idb
		else if (!loading) {
			idbPromise("products", "get").then((indexedProducts) => {
				dispatch({
					type: UPDATE_PRODUCTS,
					products: indexedProducts,
				});
			});
		}
	}, [products, data, loading, dispatch, id]);

	const addToCart = () => {
		const itemInCart = cart.find((cartItem) => cartItem._id === id);
		if (itemInCart) {
			dispatch({
				type: UPDATE_CART_QUANTITY,
				_id: id,
				purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
			});
			idbPromise("cart", "put", {
				...itemInCart,
				purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
			});
		} else {
			dispatch({
				type: ADD_TO_CART,
				product: { ...currentProduct, purchaseQuantity: 1 },
			});
			idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
		}
	};

	const removeFromCart = () => {
		dispatch({
			type: REMOVE_FROM_CART,
			_id: currentProduct._id,
		});

		idbPromise("cart", "delete", { ...currentProduct });
	};

	return (
		<Container maxW={"7xl"}>
			<Flex justifyContent={"center"}>
				{currentProduct && cart ? (
					<Box>
						<Image
							rounded={"md"}
							src={`${currentProduct.image}`}
							alt={currentProduct.name}
							fit={"cover"}
							align={"center"}
							w={"100%"}
							h={{ base: "100%", sm: "400px", lg: "500px" }}
						/>
						<Stack spacing={{ base: 6, md: 10 }}>
							<Box as={"header"}>
								<Heading
									lineHeight={"1.1"}
									fontWeight={"600"}
									fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
									align={"center"}
								>
									{currentProduct.name}
								</Heading>
								<Text
									color={"gray.900"}
									fontWeight={"300"}
									fontSize={"2xl"}
									align={"center"}
								>
									${currentProduct.price}
								</Text>
							</Box>
							<Stack
								spacing={{ base: 4, sm: 6 }}
								direction={"column"}
								divider={<StackDivider borderColor={"gray.200"} />}
							>
								<VStack spacing={{ base: 4, sm: 6 }}>
									<Text color={"gray.900"} fontSize={"lg"} fontWeight={"300"}>
										{currentProduct.description}
									</Text>
								</VStack>
							</Stack>
							<Button
								rounded={"none"}
								w={"full"}
								mt={8}
								size={"lg"}
								py={"7"}
								bg={"gray.900"}
								color={"white"}
								textTransform={"uppercase"}
								_hover={{ transform: "translateY(2px)", boxShadow: "lg" }}
								onClick={addToCart}
							>
								Add to Cart
							</Button>
							<Button
								disabled={!cart.find((p) => p._id === currentProduct._id)}
								rounded={"none"}
								w={"full"}
								mt={8}
								size={"lg"}
								py={"7"}
								bg={"gray.900"}
								color={"white"}
								textTransform={"uppercase"}
								_hover={{ transform: "translateY(2px)", boxShadow: "lg" }}
								onClick={removeFromCart}
							>
								Remove From Cart
							</Button>
						</Stack>
						<Text
							color={"gray.900"}
							fontWeight={"300"}
							fontSize={"2xl"}
							align={"center"}
						>
							<Link to="/">← Back to Products</Link>
						</Text>
					</Box>
				) : null}
				{loading ? <img src={spinner} alt="loading" /> : null}
			</Flex>
			<Cart />
		</Container>
	);
}

export default Detail;
