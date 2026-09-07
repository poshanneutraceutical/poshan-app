import React from "react";


const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search..."
}) => {


  const handleSubmit = (event) => {

    event.preventDefault();

    if (onSearch) {

      onSearch(value);

    }

  };



  return (

    <form
      onSubmit={handleSubmit}
      className="
        flex
        items-center
        gap-2
      "
    >


      <input

        type="text"

        value={value}

        onChange={(event) =>
          onChange(event.target.value)
        }

        placeholder={placeholder}

        className="
          px-4
          py-2
          border
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          w-64
        "

      />



      <button

        type="submit"

        className="
          bg-blue-600
          text-white
          px-4
          py-2
          rounded-lg
          hover:bg-blue-700
        "

      >

        Search

      </button>



    </form>

  );

};


export default SearchBar;