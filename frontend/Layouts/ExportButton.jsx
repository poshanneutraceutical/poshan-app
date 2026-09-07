import React from "react";


const ExportButton = ({
  data = [],
  fileName = "export.csv"
}) => {


  const exportCSV = () => {


    if (!data.length) {

      alert("No data available to export");

      return;

    }



    const headers =
      Object.keys(data[0]);



    const csvRows = [

      headers.join(","),

      ...data.map((row) =>

        headers
          .map(
            (field) =>
              `"${row[field] ?? ""}"`
          )
          .join(",")

      )

    ];



    const csvContent =
      csvRows.join("\n");



    const blob =
      new Blob(
        [csvContent],
        {
          type: "text/csv"
        }
      );



    const url =
      window.URL.createObjectURL(
        blob
      );



    const link =
      document.createElement("a");



    link.href = url;



    link.download =
      fileName;



    document.body.appendChild(link);



    link.click();



    link.remove();


  };




  return (

    <button

      onClick={exportCSV}

      className="
        bg-green-600
        text-white
        px-4
        py-2
        rounded-lg
        hover:bg-green-700
      "

    >

      Export CSV

    </button>

  );

};


export default ExportButton;