import { useEffect, useState } from "react";


const useFetch = (apiFunction, dependencies = []) => {


  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);



  useEffect(() => {


    const fetchData = async () => {


      try {


        setLoading(true);

        setError(null);



        const response = await apiFunction();



        setData(response);



      } catch (err) {


        setError(err);



      } finally {


        setLoading(false);


      }


    };



    fetchData();



  }, dependencies);



  return {

    data,

    loading,

    error,

    setData

  };


};



export default useFetch;