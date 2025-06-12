import { createContext, useEffect, useState } from "react";
import api from "../api.js";
export const UserContext = createContext();

export const UserProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("userToken"));

    useEffect(() => {
        const fetchUser = async () => {
            const response = await api({url:"/user", method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }});
            if (!response.status == 200){
                setToken(null);
            }
            localStorage.setItem("userToken", token);
        };
        fetchUser();
    }, [token]);

    return (
        <UserContext.Provider value={[token, setToken]}>
            {props.children}
        </UserContext.Provider>
    )
}