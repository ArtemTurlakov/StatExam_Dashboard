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
                }});
            if (!response.status == 200){
                setToken(null);
            }
            localStorage.setItem("userToken", token);
            setUsername(response.data.username)
        };
        fetchUser();
    }, [token]);

    return (
        <UserContext.Provider value={[username, setToken]}>
            {props.children}
        </UserContext.Provider>
    )
}