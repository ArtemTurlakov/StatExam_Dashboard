import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import {PermIdentityOutlined} from '@mui/icons-material';
import {Popper, Box, Button, Typography, Avatar } from '@mui/material';

export default function UserProfile({}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;


    const [username, setToken] = useContext(UserContext)

    const handleLogout = () => {
        setToken(null);
};

return(
    <>
        <div className='absolute inset-y-0 right-20 flex'>
            <Avatar className='self-center' size={40}
             icon={<PermIdentityOutlined />} onClick={handleClick} />
        </div>
        <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box 
                className='flex' 
                sx={{ border: 1, p: 1, 
                bgcolor: 'background.paper', 
                flexDirection: 'column' }}
            >
                <Typography variant='h5' className='self-center'>{username}</Typography>
                <Button variant="outlined" color="error"
                    onClick={handleLogout}>
                    Выйти
                </Button>
            </Box>
        </Popper>
      </>
    )
};