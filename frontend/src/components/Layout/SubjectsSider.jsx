import React, {useEffect, useState} from 'react';
import { Menu, Layout} from 'antd';
import api from "../../api.js";
import ExamSelector from './ExamSelector.jsx';
const {Sider}=Layout;

const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
  alignContent: "center"
};

export default function SubjectsSider(colorBgContainer){
  const [subjects, setSubjects] = useState([])
  const [examType, setExamType] = useState(9); 
  function handleClick(){
    setExamType(examType == 9 ? 11 : 9)
  }
  
  const fetchSubjects = async () => {
    const resp = await api.get(`/subjects/`)
    const subjs = resp.data
    const menuItems = (
      subjs.map(j => {
        return{key: j.id, label: j.name, grade: j.grade}
      })
    )
    setSubjects(menuItems)
    // console.log(subjects)
  }

  useEffect(() =>{
      fetchSubjects()
    }, [])

return (
  <Sider style={siderStyle}>
    <ExamSelector
     colorBgContainer={colorBgContainer}
     onExamChange={() => handleClick()}
   />           
    <Menu theme="dark" mode="inline" 
    defaultSelectedKeys={['1']} 
    items={subjects
              .filter(s => s.grade == examType)
              .sort((a, b) => a.key - b.key)} />
        
  </Sider>
  )
};
