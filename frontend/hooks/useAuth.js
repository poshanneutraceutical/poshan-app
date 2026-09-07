import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const useAuth = () => {


  const context = useContext(
    AuthContext
  );



  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }



  const {
    user,
    login,
    logout,
    loading
  } = context;



  const hasRole = (role) => {


    return user?.role === role;


  };



  return {


    user,

    login,

    logout,

    loading,

    isAuthenticated: !!user,

    hasRole


  };


};



export default useAuth;