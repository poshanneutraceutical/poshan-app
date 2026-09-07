import React from "react";


const DateFormatter = ({
  date,
  format = "DD-MM-YYYY"
}) => {


  if (!date) {

    return "-";

  }



  const formattedDate =
    new Date(date);



  if (isNaN(formattedDate.getTime())) {

    return "-";

  }



  const day =
    String(
      formattedDate.getDate()
    ).padStart(2, "0");



  const month =
    String(
      formattedDate.getMonth() + 1
    ).padStart(2, "0");



  const year =
    formattedDate.getFullYear();



  switch (format) {


    case "YYYY-MM-DD":

      return `${year}-${month}-${day}`;



    case "DD-MM-YYYY":

      return `${day}-${month}-${year}`;



    case "DD/MM/YYYY":

      return `${day}/${month}/${year}`;



    default:

      return `${day}-${month}-${year}`;


  }


};


export default DateFormatter;