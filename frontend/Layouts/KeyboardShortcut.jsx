import React, { useEffect } from "react";


const KeyboardShortcut = ({
  keys = [],
  onTrigger,
  children
}) => {


  useEffect(() => {


    const handleKeyDown = (event) => {


      const pressedKeys = [];



      if (event.ctrlKey) {

        pressedKeys.push("CTRL");

      }


      if (event.shiftKey) {

        pressedKeys.push("SHIFT");

      }


      if (event.altKey) {

        pressedKeys.push("ALT");

      }



      pressedKeys.push(
        event.key.toUpperCase()
      );



      const matched =
        keys.every((key) =>
          pressedKeys.includes(
            key.toUpperCase()
          )
        );



      if (matched) {

        event.preventDefault();

        onTrigger();

      }


    };



    window.addEventListener(
      "keydown",
      handleKeyDown
    );



    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };


  }, [keys, onTrigger]);





  return children || null;


};


export default KeyboardShortcut;