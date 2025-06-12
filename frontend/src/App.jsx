import { useContext } from 'react';
import MyLayout from './components/Layout/MyLayout';
import { UserContext } from './context/UserContext';
import Login from './components/Login';
import { Typography} from 'antd';
const { Title} = Typography;
import Paper from '@mui/material/Paper';

export default function App() {
  const [token] = useContext(UserContext)
  return (
    <>
      {!token ? 
        <div className='flex justify-center' style={{position: 'absolute', width: '100%', }}>
          <Paper sx={{m: 10, width: '40%', display: 'flex', flexDirection: 'column' }}
          className='flex justify-around'>
            <Title className='self-center'>
                StatExam-Dashboard
            </Title>
            <div className='self-center mb-10' style={{width: '60%'}} >
              <Login  />
            </div>
          </Paper>
        </div>
        
      :
        <MyLayout/>}
    </>
    
  );
};



