import React from "react";


class ErrorBoundary extends React.Component {


  constructor(props) {

    super(props);

    this.state = {
      hasError: false
    };

  }



  static getDerivedStateFromError() {

    return {
      hasError: true
    };

  }




  componentDidCatch(error, errorInfo) {

    console.error(
      "Application Error:",
      error,
      errorInfo
    );

  }




  reloadPage = () => {

    window.location.reload();

  };




  render() {


    if (this.state.hasError) {


      return (

        <div
          className="
            min-h-screen
            flex
            flex-col
            items-center
            justify-center
            text-center
            bg-gray-100
            p-6
          "
        >


          <h1
            className="
              text-3xl
              font-bold
              text-gray-800
            "
          >

            Something went wrong

          </h1>



          <p
            className="
              text-gray-500
              mt-3
            "
          >

            Please refresh the page or try again.

          </p>



          <button

            onClick={this.reloadPage}

            className="
              mt-6
              bg-blue-600
              text-white
              px-5
              py-2
              rounded-lg
            "

          >

            Reload

          </button>



        </div>

      );


    }



    return this.props.children;


  }


}


export default ErrorBoundary;