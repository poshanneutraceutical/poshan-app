import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../services/AuthService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        const storedUser = AuthService.getUser();

        if (storedUser) {

            setUser(storedUser);

        }

        setLoading(false);

    }, []);





    const login = (userData, token) => {

        AuthService.saveToken(token);

        AuthService.saveUser(userData);

        setUser(userData);

    };





    const logout = () => {

        AuthService.logout();

        setUser(null);

    };





    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                login,

                logout,

                isAuthenticated: !!user

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}





export function useAuth() {

    return useContext(AuthContext);

}