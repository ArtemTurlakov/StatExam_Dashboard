import React, {useEffect, useState} from 'react';
import { Menu, Layout, theme, Spin, Divider} from 'antd';

const {Sider} = Layout;
import Dashboard from '../Dashboard/Dashboard.jsx';
import api from "../../api.js";
import Topbar from './Topbar.jsx';
import ExamSelector from './ExamSelector.jsx';


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
  const [examType, setExamType] = useState(9);
  const [subjects, setSubjects] = useState([])
  const [data, setData] = useState(null)
  const [subject, setSubject] = useState(1)

  const { 
    token: { colorBgContainer},
  } = theme.useToken();

  const fetchSubjects = async () => {
    const resp = await api.get(`/subjects/`)
    const subjs = resp.data
    const menuItems = (
      subjs.map(j => {
        return{key: j.subject_id, label: j.name.replace(/^./, char => char.toUpperCase()), grade: j.grade}
      })
    )
    setSubjects(menuItems)
    console.log(subjects)
  }

  const fetchDashboardData = async () => {
    const resp = await api.get(`/dashboard/{grade, subject}?grade=${examType}&subject=${subject}` )
    const r = resp.data
    console.log(r)
    setData(r)
  }

  useEffect(() =>{
    fetchSubjects()
  }, [])

  useEffect(() =>{
    fetchDashboardData()
  }, [examType, subject])

  function handleClick(){
    setExamType(examType == 9 ? 11 : 9)
  }
  return(
    <Layout>
      <Sider style={siderStyle} trigger={null} 
        collapsible collapsed={collapsed} 
        collapsedWidth="0">

        <ExamSelector
          onExamChange={() => handleClick()}/>

        <Menu 
          theme="dark" mode="inline" 
          defaultSelectedKeys={['1']} 
          onClick={(e) => (setSubject(e.key), console.log(subject))}
          items={subjects
                  .filter(s => s.grade == examType)
                  .sort((a, b) => a.key - b.key)} />

      </Sider>
      <Layout>
        
        <Topbar
          collapsed={collapsed}
          colorBgContainer={colorBgContainer}
          Click={() => setCollapsed(!collapsed)}/>

        <div className='mx-auto my-auto'>
          
          {subjects.length > 0 ? (
              data ? 
              <Dashboard 
                subject={subjects.filter(s => s.key == subject)[0]}
                counts={data}/>

              : <Spin/>
            ) : <></>}
        </div>
        <Divider type='vertical'/>
      </Layout>
    </Layout>
    )
};
