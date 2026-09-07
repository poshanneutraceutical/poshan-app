import React, { useEffect, useState } from "react";


const ThemeToggle = () => {


  const [darkMode, setDarkMode] = useState(false);



  useEffect(() => {


    const savedTheme =
      localStorage.getItem("theme");



    if (savedTheme === "dark") {

      setDarkMode(true);

      document.documentElement.classList.add(
        "dark"
      );

    }


  }, []);





  const toggleTheme = () => {


    const newMode =
      !darkMode;



    setDarkMode(
      newMode
    );



    if (newMode) {


      document.documentElement.classList.add(
        "dark"
      );


      localStorage.setItem(
        "theme",
        "dark"
      );


    } else {


      document.documentElement.classList.remove(
        "dark"
      );


      localStorage.setItem(
        "theme",
        "light"
      );


    }


  };





  return (

    <button

      onClick={toggleTheme}

      className="
        px-3
        py-2
        rounded-lg
        border
        hover:bg-gray-100
      "

    >

      {
        darkMode
          ? "☀️ Light"
          : "🌙 Dark"
      }

    </button>

  );

};


export default ThemeToggle;
