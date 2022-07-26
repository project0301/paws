import React, { useState } from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { QUERY_GET_PRODUCTS} from "../../utils/queries"; 
import {useQuery} from "@apollo/client"; 

function SearchBar({ placeholder, data }) {
	// ask about this function
	// const {loading, data: productData} = useQuery(QUERY_GET_PRODUCTS);
const [keyWord, setKeyWord]=useState("");

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

		//const newfilter = productData.filter((value) => {
			// return value.toLowerCase().includes(searchKeyword.toLowerCase());
		// });
        
        console.log(productData);

		setFilteredData(searchKeyword);
	};
	const searchBtn = () => {
	}
	
	// {
	// 	 filteredData.length !== 0 && (
	// 	 		{/* ask about this during office hours */}
	// 	 		userData.map((value, key) => {
	// 	         return (
	// 	           <a className="dataItem" href={value}>
	// 	             <p>{value}</p>
	// 	           </a>
	// 	         );
	// 	       })}
	// 	 );
	// }

	return (
		<InputGroup>
			<Input
				type="text"
				htmlSize={"100%"}
				width={"auto"}
				placeholder="Search for a product"
				onChange={handleFilter}
			/>
			<InputLeftElement> 
				<SearchIcon onClick={searchBtn} />
			</InputLeftElement>
		</InputGroup>
	);
}

export default SearchBar;
