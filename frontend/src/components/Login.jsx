import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import {TextField, Box, Button} from '@mui/material';
import api from "../api.js";

export default function Login() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const [, setToken] = useContext(UserContext);

const submitLogin = async () => {
    const response = await api({url: `/token`, method: 'post',
                    headers: {"content-type": "application/x-www-form-urlencoded"},
                    data: {username: username, password: password}});

    if(!response.status == 200){
        setErrorMessage(response.detail);
    } else {
        setToken(response.data.access_token);
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
            onChange={(e) => setUsername(e.target.value)}
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
