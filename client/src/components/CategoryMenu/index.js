import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
	UPDATE_CATEGORIES,
	UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";

function CategoryMenu() {
	const [state, dispatch] = useStoreContext();

	const { categories } = state;

	const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

	useEffect(() => {
		if (categoryData) {
			dispatch({
				type: UPDATE_CATEGORIES,
				categories: categoryData.categories,
			});
			categoryData.categories.forEach((category) => {
				idbPromise("categories", "put", category);
			});
		} else if (!loading) {
			idbPromise("categories", "get").then((categories) => {
				dispatch({
					type: UPDATE_CATEGORIES,
					categories: categories,
				});
			});
		}
	}, [categoryData, loading, dispatch]);

	const handleClick = (id) => {
		dispatch({
			type: UPDATE_CURRENT_CATEGORY,
			currentCategory: id,
		});
	};

	return (
		<Box padding={"5"}>
			<ButtonGroup margin={"2"}>
				{categories.map((item) => (
					<Button
						key={item._id}
						onClick={() => {
							handleClick(item._id);
						}}
					>
						{item.name}
					</Button>
				))}
			</ButtonGroup>
		</Box>
	);
}

export default CategoryMenu;
