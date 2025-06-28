import  {useEffect, useState} from 'react';
import {CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Menu, Layout, Divider, ConfigProvider} from 'antd';
const {Sider} = Layout;
import Dashboard from '../Dashboard/Dashboard.jsx';
import api from "../../api.js";
import Topbar from './Topbar.jsx';
import GradeSelector from './GradeSelector.jsx';


const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  top: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
  alignContent: "center"
};


export default function MyLayout(){
  const [collapsed, setCollapsed] = useState(false);
  const [grade, setGrade] = useState(9);
  const [subjects, setSubjects] = useState([])
  const [data, setData] = useState(null)
  const [subject, setSubject] = useState(1)
  const color = '#238bc8'
  const theme = createTheme({
  palette: {
    primary: {
      main: color,
    },
  },
});

  const fetchSubjects = async () => {
    const resp = await api.get(`/subjects/`)
    const subjs = resp.data
    const menuItems = (
      subjs.map(j => {
        return{key: j.subject_id, label: j.name.replace(/^./, char => char.toUpperCase()), grade: j.grade}
      })
    )
    setSubjects(menuItems)
  }

  const fetchDashboardData = async () => {
    const resp = await api.get(`/dashboard/{grade, subject}?grade=${grade}&subject=${subject}` )
    const r = resp.data
    setData(r)
  }

  useEffect(() =>{
    fetchSubjects()
  }, [])

  useEffect(() =>{
    fetchDashboardData()
  }, [grade, subject])

  return(
    <ThemeProvider theme={theme}>
      <ConfigProvider
          theme={{
            components: {
              Menu: {
                darkItemBg: color
              },
              Layout: {
                siderBg: color
              },
            },
          }}
        >
    <Layout>
      <Sider  style={siderStyle} trigger={null} 
        collapsible collapsed={collapsed} 
        collapsedWidth="0">
        
          <div style={{width: '100%'}} className='flex '>
          <GradeSelector className='self-center'
            grade={grade}
            setGrade={setGrade}
            onExamChange={() => handleClick()}/>
          </div>
        
          <Menu
            theme='dark' mode="inline" 
            defaultSelectedKeys={['1']} 
            onClick={(e) => (setSubject(e.key))}
            items={subjects
                    .filter(s => s.grade == grade)
                    .sort((a, b) => a.key - b.key)}
            />
      </Sider>
      <Layout>
        
        <Topbar
          collapsed={collapsed}
          Click={() => setCollapsed(!collapsed)}
          theme={theme}/>

        <div className='mx-auto my-auto'>
          
          {subjects.length > 0 ? (
              data ? 
              <Dashboard 
                subject={subjects.filter(s => s.key == subject)[0]}
                counts={data}
                grade={grade}
                subjectKey={subject}/>

              : <CircularProgress/>
            ) : <CircularProgress/>}
        </div>
        <Divider type='vertical'/>
      </Layout>
    </Layout>
     </ConfigProvider>
    </ThemeProvider>
    )
};
