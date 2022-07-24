<<<<<<< HEAD
import React from "react"; 
import { IconButton } from '@chakra-ui/react'

<IconButton colorScheme='blue' aria-label='Search database' icon={<searchIcon/>} />

function SearchBar({placeholder, data}) {
    const[filteredData, setFilteredData] = useState({});
    const handleFilter = (event) => {
       const searchKeyword = event.target.value
       const newfilter = data.filter((value)=> {
          return value.category.toLowerCase().includes(searchKeyword.toLowerCase());
       });
       setFilteredData(newfilter);
    };
    return (
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder={placeholder} onChange={handleFilter}/>
                <div className="searchIcon"><searchIcon></searchIcon>
                </div>
                <div className="dataresult">
                    {data.map((value,key) => {
                        return(
                            <a className="dataItem" href={value.category}>
                                <p>
                                    {value.category}
                                </p>
                            </a>
                        )
                    }
                    )}
                </div>
                
                
            </div> 

        </div>
    );
                }

    
=======
import React, { useState } from "react";
import { Button, Input, InputGroup, Stack } from "@chakra-ui/react";
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
		<>
			<Stack spacing={4}>
				<InputGroup>
					<Input
						type="text"
						size="md"
						width="auto"
						placeholder="Search Products"
						onChange={handleFilter}
					/>
					<Button
						leftIcon={<SearchIcon />}
						colorScheme="blue"
						aria-label="Search database"
					/>
				</InputGroup>
			</Stack>
		</>
	);
}
>>>>>>> d8974cbd4d2ff2fe941761b592c92c4413e29467

export default SearchBar;
