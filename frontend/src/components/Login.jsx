import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import {TextField, Box, Button} from '@mui/material';
import api from "../api.js";
import { Typography } from "antd";

export default function Login() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [, setToken] = useContext(UserContext);

const submitLogin = async () => {
    const response = await api({url: `/token`, method: 'post',
                    headers: {"content-type": "application/x-www-form-urlencoded"},
                    data: {username: username, password: password}})
                .catch(function (error) {
                    if (error.response) {
                         setError(error.response.data.detail);
                    } 
                });;

    if(response){
        setToken(response.data.access_token);
        setError("")
    }

};

const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
}

return(
    <div >
        <Box
        component="form"
        sx={{ '& .MuiTextField-root': { my: 3, width: '100%', }, flexDirection: 'column'}}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex justify-center"
        >
            <TextField
            required
            id="usernameForm"
            label="Имя пользователя"
            type="username"
            value={username}
            onChange={(e) => {
                setUsername(e.target.value)
                setError("")
            }}
            />
            <TextField
            required
            id="passwordFrom"
            label="Пароль"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <Typography>{error}</Typography>
            <Button 
            variant="contained"
            type='submit'
            >
                Войти
            </Button>
        </Box>
    </div>
)

};
