import { Layout } from "antd"
const {Content} = Layout;
import {Typography, CircularProgress } from '@mui/material';
import Tables from './tables/Tables.jsx'
import CountsTable from "./tables/countsTable.jsx";
import Hist from './Hist.jsx';

export default function Dashboard(props){
  const {subject, counts} = props
  const arr = Object.values(counts)[0]
  const diagdataIndex = arr.findLastIndex(n => n.count_on_exam != 0 ) - 1
  const diagData = arr[diagdataIndex]

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

        <Typography variant="h2" className="self-center">{subject.label.replace(/^./, char => char.toUpperCase())}</Typography>
        <div className=" m-5 mr-35" >
          <Typography variant="h6">Количество участников ЕГЭ по учебному предмету</Typography >
          <CountsTable 
            data={{counts}}/>
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