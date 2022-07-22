import React from "react"; 
import { IconButton } from '@chakra-ui/react'

<IconButton  colorScheme='blue' aria-label='Search database' icon={<searchIcon/>} />

function SearchBar({placeholder, data}) {
    const[filteredData, setFilteredData] = useState[()];
    const handleFilter =(event) =>{
       const searchKeyWord = event.target.value
    }

    return (
        <div className ="search">
            <div className ="searchInputs">
                <input type="text" placeholder= {placeholder} onChange={handlefilter}/>
                <div className="searchIcon"><searchIcon></searchIcon>
                </div>
                {filteredData.length !=0 && ()
                <div className="dataresult">
                    {data.map((value, key)=>{
                        return (
                            <a className="dataItem" href={name.category}>
                                <p>{name.category}</p>
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








