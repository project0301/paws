import React from "react"; 
import { IconButton } from '@chakra-ui/react'

<IconButton colorScheme='blue' aria-label='Search database' icon={<searchIcon/>} />

function SearchBar({placeholder, data}) {
    const[filteredData, setFilteredData] = useState[()];
    const handleFilter = (event) => {
       const searchKeyword = event.target.value
       const newfilter = data.filter((value)=> {
          return name.category.toLowerCase().includes(searchKeyword.toLowerCase());
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
                            <a className="dataItem" href={name.category}>
                                <p>
                                    {name.category}
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

    

export default SearchBar;
