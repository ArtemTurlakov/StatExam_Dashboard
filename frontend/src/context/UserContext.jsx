import { createContext, useEffect, useState } from "react";
import api from "../api.js";
export const UserContext = createContext();

export const UserProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("userToken"));
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const response = await api({url:"/user", method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            }).catch(function (error) {
                    if (error.response) {
                        setToken(null);
                    } 
                });
            localStorage.setItem("userToken", token);
            if (response){
                setUsername(response.data.username)
            }
        };
        fetchUser();
    }, [token]);

    return (
        <UserContext.Provider value={[token, setToken, username]}>
            {props.children}
        </UserContext.Provider>
    )
}