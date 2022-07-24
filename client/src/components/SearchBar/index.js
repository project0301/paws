import React, { useState } from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function SearchBar({ placeholder, data }) {
	// ask about this function
	const [filteredData, setFilteredData] = useState({});

	const handleFilter = (event) => {
		event.preventDefault();

		const searchKeyword = event.target.value;

		const newfilter = data.filter((value) => {
			return value.toLowerCase().includes(searchKeyword.toLowerCase());
		});

		setFilteredData(newfilter);
	};

	// {
	// 	 filteredData.length !== 0 && (
	// 	 		{/* ask about this during office hours */}
	// 	 		data.map((value, key) => {
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
			<InputLeftElement>
				<SearchIcon />
			</InputLeftElement>
			<Input
				type="text"
				htmlSize={"100%"}
				width={"auto"}
				placeholder="Search for a product"
				onChange={handleFilter}
			/>
		</InputGroup>
	);
}

export default SearchBar;
