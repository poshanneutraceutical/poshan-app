import React, { useState } from "react";


const FileUpload = ({
  onUpload,
  accept = "*",
  maxSize = 5
}) => {


  const [fileName, setFileName] = useState("");



  const handleChange = (event) => {


    const file =
      event.target.files[0];



    if (!file) {

      return;

    }



    const fileSize =
      file.size / (1024 * 1024);



    if (fileSize > maxSize) {

      alert(
        `File size should be less than ${maxSize} MB`
      );

      return;

    }



    setFileName(
      file.name
    );



    if (onUpload) {

      onUpload(file);

    }


  };





  return (

    <div>


      <label
        className="
          block
          text-sm
          font-medium
          text-gray-700
          mb-2
        "
      >

        Upload File

      </label>



      <input

        type="file"

        accept={accept}

        onChange={handleChange}

        className="
          border
          rounded-lg
          p-2
          w-full
        "

      />



      {
        fileName && (

          <p
            className="
              mt-2
              text-sm
              text-gray-600
            "
          >

            Selected: {fileName}

          </p>

        )
      }



    </div>

  );

};


export default FileUpload;