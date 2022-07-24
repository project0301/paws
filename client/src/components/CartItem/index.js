import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

import { Flex, Text, Box, Image, Input } from "@chakra-ui/react";

const CartItem = ({ item }) => {
	const [, dispatch] = useStoreContext();

	const removeFromCart = (item) => {
		dispatch({
			type: REMOVE_FROM_CART,
			_id: item._id,
		});
		idbPromise("cart", "delete", { ...item });
	};

	const onChange = (e) => {
		const value = e.target.value;
		if (value === "0") {
			dispatch({
				type: REMOVE_FROM_CART,
				_id: item._id,
			});
			idbPromise("cart", "delete", { ...item });
		} else {
			dispatch({
				type: UPDATE_CART_QUANTITY,
				_id: item._id,
				purchaseQuantity: parseInt(value),
			});
			idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
		}
	};

	return (
		<Flex borderBottom={"1px"} padding="2">
			<Box>
				<Image
					src={`${item.image}`}
					alt={`${item.name}`}
					alignContent={"center"}
				/>
			</Box>
			<Box>
				<Text>
					{item.name}, ${item.price}
				</Text>
				<Text>
					Qty:{" "}
					<Input
						variant={"outline"}
						size={"large"}
						type={"number"}
						placeholder={"1"}
						value={item.purchaseQuantity}
						onChange={onChange}
					/>
				</Text>
				<Box>
					<Text
						align={"center"}
						fontWeight={"bold"}
						onClick={() => removeFromCart(item)}
						cursor={"pointer"}
					>
						Remove from Cart
					</Text>
				</Box>
			</Box>
		</Flex>
	);
};

export default CartItem;
