import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import {Popper, Box, Button,} from '@mui/material';
import { Avatar, Typography} from 'antd';
const { Title} = Typography;
import {
    UserOutlined
  } from '@ant-design/icons';
export default function UserProfile({}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;


    const [token, setToken] = useContext(UserContext)

    const handleLogout = () => {
        setToken(null);
};

return(
    <>
        <div className='absolute inset-y-0 right-0'>
            <Avatar size={40}   style={{ backgroundColor: '#aaaaaa', marginInline: 40 }}
             icon={<UserOutlined />} onClick={handleClick} />
        </div>
        <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                <Title>user</Title>
                <Button variant="outlined" color="error"
                    onClick={handleLogout}>
                    Выйти
                </Button>
            </Box>
        </Popper>
      </>
    )
};