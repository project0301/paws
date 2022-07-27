import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { QUERY_GET_PRODUCTS} from "../../utils/queries"; 
import {useQuery} from "@apollo/client"; 
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";

function SearchBar({ placeholder, data }) {

const [keyWord, setKeyWord]=useState("");
const [state, dispatch] = useStoreContext();

    const {loading, data: productData} = useQuery(QUERY_GET_PRODUCTS,{
        variables:{
            search: keyWord
        }
    });
	const userData = data?.me || {};

	const [filterData, setFilteredData] = useState({});

	const handleFilter = (event) => {
		event.preventDefault();

		const searchKeyword = event.target.value;
        setKeyWord(searchKeyword)

        console.log(productData);

        dispatch({
            type: UPDATE_PRODUCTS,
            products: productData.getProducts.products,
        });

		setFilteredData(searchKeyword);
	};
	const searchBtn = () => {
	}

	return (
        <Box>
		<InputGroup>
			<Input
				type="text"
				htmlSize={"100%"}
				width={"auto"}
				placeholder="Search for a product"
				onChange={handleFilter}
			/>
			<InputRightElement> 
				<SearchIcon onClick={searchBtn} />               
			</InputRightElement>
		</InputGroup>
        </Box>
	);
}

export default SearchBar;
