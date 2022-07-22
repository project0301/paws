import React from "react"; 
import { IconButton } from '@chakra-ui/react'

<IconButton  colorScheme='blue' aria-label='Search database' icon={<searchIcon/>} />

function SearchBar({placeholder, data}) {
    return (
        <div className ="search">
            <div className ="searchInputs">
                <input type="text" placeholder= {placeholder} />
                <div className="searchIcon">
                </div>
                <div className="dataresult">
                </div>
            </div>
        </div>
    );
}

export default SearchBar;








