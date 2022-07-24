import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import RemoveIcon from "@mui/icons-material/Remove";

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
		<div className="flex-row">
			<div>
				<img src={`${item.image}`} alt="" />
			</div>
			<div>
				<div>
					{item.name}, ${item.price}
				</div>
				<div>
					<span>Qty:</span>
					<input
						type="number"
						placeholder="1"
						value={item.purchaseQuantity}
						onChange={onChange}
					/>
					<RemoveIcon onClick={() => removeFromCart(item)} />
				</div>
			</div>
		</div>
	);
};

export default CartItem;
