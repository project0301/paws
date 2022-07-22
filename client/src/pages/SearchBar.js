import React from "react"; 
import { IconButton } from '@chakra-ui/react'

<IconButton  colorScheme='blue' aria-label='Search database' icon={<searchIcon/>} />

function SearchBar({placeholder, data}) {
    const[filteredData, setFilteredData] = useState[()];

    return (
        <div className ="search">
            <div className ="searchInputs">
                <input type="text" placeholder= {placeholder} />
                <div className="searchIcon"><searchIcon></searchIcon>
                </div>
                {filteredData
                <div className="dataresult">
                    {data.map((value, key)=>{
                        return (
                            <a className="dataItem" href={value.category}>
                                <p>{value.category}</p>
                            </a>
                        )
                    })}
                </div>
                }
            </div>
        </div>
    );
}

export default SearchBar;








