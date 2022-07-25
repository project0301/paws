import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

import {
	Flex,
	Box,
	Image,
	Icon,
	chakra,
	Tooltip,
} from "@chakra-ui/react";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function ProductItem(item) {
	const [state, dispatch] = useStoreContext();

	const { image, name, _id, price } = item;

	const { cart } = state;

	const addToCart = () => {
		const itemInCart = cart.find((cartItem) => cartItem._id === _id);
		if (itemInCart) {
			dispatch({
				type: UPDATE_CART_QUANTITY,
				_id: _id,
				purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
			});
			idbPromise("cart", "put", {
				...itemInCart,
				purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
			});
		} else {
			dispatch({
				type: ADD_TO_CART,
				product: { ...item, purchaseQuantity: 1 },
			});
			idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
		}
	};

	return (
		<Flex padding={"5"}>
			<Box
				bg={"white"}
				maxWidth={"md"}
				borderWidth="1px"
				rounded="lg"
				shadow="lg"
			>
				<Link to={`/products/${_id}`}>
					<Image
						alt={`Picture of ${name}`}
						src={`${image}`}
						roundedTop="lg"
						borderBottom="1px"
					/>
				</Link>
				<Flex m="3" justifyContent="space-around" alignContent="center">
					<Box
						fontSize="1.2rem"
						fontWeight="semibold"
						as="h4"
						lineheight="tight"
					>
						{name}
						<br />${price.toFixed(2)}
					</Box>
					<Tooltip
						label="Add to Cart"
						bg="white"
						placement="top"
						color="gray.800"
						fontSize="1.2rem"
					>
						<chakra.a display={"flex"}>
							<Icon
								as={AddShoppingCartIcon}
								h={9}
								w={9}
								alignSelf={"center"}
								onClick={addToCart}
							/>
						</chakra.a>
					</Tooltip>
				</Flex>
			</Box>
		</Flex>
	);
}

export default ProductItem;
