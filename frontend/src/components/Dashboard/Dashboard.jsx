import { Layout } from "antd"
const {Content} = Layout;
import {Typography, CircularProgress, Box, TextField, Button } from '@mui/material';
import Tables from './tables/Tables.jsx'
import CountsTable from "./tables/countsTable.jsx";
import Hist from './Hist.jsx';
import api from "../../api.js";
import { useState } from "react";

export default function Dashboard(props){
  const {subject, counts, grade, subjectKey} = props
  const arr = Object.values(counts)[0]
  const diagdataIndex = arr.findLastIndex(n => n.count_on_exam != 0 )
  const diagData = arr[diagdataIndex]
  const [filename, setFilename] = useState("")

  const name = subject.label.replace(/^./, char => char.toUpperCase())

  const submitLoad = async () => {
   const resp = await api({url: `/report/{grade, subject, name, filename}?grade=${grade}&subject=${subjectKey}&name=${name}&filename=${filename}`,
     method: 'get', responseType: 'blob'}).then(response => {
      const href = window.URL.createObjectURL(response.data);

      const anchorElement = document.createElement('a');

      anchorElement.href = href;
      anchorElement.download = filename;

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      window.URL.revokeObjectURL(href);
    })
    .catch(error => {
      console.log('error: ', error);
    });
   
};
  const handleSubmit = (e) => {
      e.preventDefault();
      submitLoad();
}

  return(
    <>
    {arr[0] ? 
      <Content
        style={{
          position: "sticky",
          margin: '24px 16px',
          minHeight: 280,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
      <Typography variant="h2" className="self-center">{name}</Typography>
        <div className="content-start flex">
          <div className=" m-5 mr-35" >
            <Typography variant="h6">Количество участников ЕГЭ по учебному предмету</Typography >
            <CountsTable 
              data={{counts}}/>
          </div>

          <Box className="m-5 mr-35"
          component="form"
          sx={{ '& .MuiTextField-root': { my: 3, width: '100%', }, }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          >
            <Typography variant="h6" className="self-center">Выгрузить отчет</Typography>
            <TextField className="m-0"
              required
              id="filenameForm"
              label="Имя файла"
              type="filename"
              value={filename}
              onChange={(e) => {
                setFilename(e.target.value)
              }}
            />
            <Button 
              variant="contained"
              type='submit'
            >
                Выгрузить
            </Button>
          </Box>
        </div>
        
        

        <div className="grid grid-cols-2 gap-1">

          <div className="content-start">
              <div className=" m-5" >
                <Typography variant="h6">Процентное соотношение юношей и девушек</Typography >
                <Tables 
                  data={counts}
                  table={"sextable"}
                  type={"sex"}
                />
              </div>
              <div className=" m-5" >
                <Typography variant="h6">Количество участников экзамена в регионе по типам ОО</Typography >
                <Tables 
                  data={counts}
                  table={"OO"}
                  type={"name"}
                />
              </div>
            </div>

            <div className="col-start-2 ">
              <div className=" m-5" >
                <Typography variant="h6">Количество участников экзамена в регионе по категориям</Typography >
                <Tables 
                  data={counts}
                  table={"categories"}
                  type={"description"}
                />
              </div>
              <div className=" m-5" >
                <Typography variant="h6">Количество участников ЕГЭ по АТЕ региона</Typography >
                <Tables 
                  data={counts}
                  table={"areas"}
                  type={"name"}
                />
              </div>
            </div>

          </div>
              
          <Typography variant="h6">Диаграмма распределения тестовых баллов(оценок)</Typography >
          {diagData ?
            <Hist
              data = {diagData}
            /> 
          :  <CircularProgress />}
      </Content>
    :
    <CircularProgress />}
    </>
    
  )
}