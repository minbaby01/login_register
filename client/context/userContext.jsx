import axios from "../src/util/axios.custom";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
    isAuthenticated: false,
    user: {
        email: "",
        name: ""
    }
});

export const AppWrapper = (props) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {
            email: "",
            name: ""
        }
    });

    return (
        <AuthContext.Provider value = {auth, setAuth}>
            {props.children}
        </AuthContext.Provider>
    );
}