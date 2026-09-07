import React, { useState } from "react";

import "./SearchBox.css";


const SearchBox = ({
    placeholder = "Search...",
    onSearch,
}) => {

    const [searchText, setSearchText] = useState("");


    const handleChange = (e) => {

        const value = e.target.value;

        setSearchText(value);

        if (onSearch) {

            onSearch(value);

        }

    };


    const handleSubmit = (e) => {

        e.preventDefault();

        if (onSearch) {

            onSearch(searchText);

        }

    };


    return (

        <form
            className="search-box"
            onSubmit={handleSubmit}
        >

            <input

                type="text"

                value={searchText}

                onChange={handleChange}

                placeholder={placeholder}

            />


            <button type="submit">

                🔍 Search

            </button>


        </form>

    );

};


export default SearchBox;