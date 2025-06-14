import { IconButton , AppBar, Box, Toolbar, Typography  } from '@mui/material';
import {MenuOpenOutlined, MenuOutlined} from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import UserProfile from './UserProfile';

export default function Topbar({collapsed, Click, theme}) {

return(
    <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1,  }}>
            <AppBar position="static"  >
                <Toolbar>
                <IconButton 
                        color="inherit"
                        onClick={Click}
                        style={{
                        margin: 10,
                        fontSize: '20px',
                        }}                
                    >
                        {collapsed ? <MenuOutlined /> : <MenuOpenOutlined/>}
                    </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    StatExam-Dashboard
                </Typography>
                <UserProfile/>
                </Toolbar>
            </AppBar>
        </Box>
    </ThemeProvider>
    
    )
};
