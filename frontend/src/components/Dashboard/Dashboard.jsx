import { Layout, Typography, Spin } from "antd"
const {Content} = Layout;
import Tables from './tables/Tables.jsx'
import CountsTable from "./tables/countsTable.jsx";
import Hist from './Hist.jsx';
import Login from "../Login.jsx";

const { Title } = Typography;

export default function Dashboard(props){
  const {subject, counts} = props
  const arr = Object.values(counts)[0]
  const diagdataIndex = arr.findLastIndex(n => n.count_on_exam != 0 ) - 1
  const diagData = arr[diagdataIndex]
  return(
        
        <Content
              style={{
                position: "sticky",
                margin: '24px 16px',
                justifyContent: 'center',
                padding: 24,
                minHeight: 280,
                display: 'flex',
                flexDirection: 'column'
              }}

            >
            <Title className="self-center">{subject.label.replace(/^./, char => char.toUpperCase())}</Title>
            
            <Title level={2}> Количество участников ЕГЭ по учебному предмету</Title>
            <CountsTable 
              data={{counts}}/>

            <Title level={2}>Процентное соотношение юношей и девушек, участвующих в ЕГЭ</Title>
            <Tables 
              data={counts}
              table={"sextable"}
              type={"sex"}
            />

            <Title level={2}>Количество участников экзамена в регионе по категориям</Title>
            <Tables 
              data={counts}
              table={"categories"}
              type={"description"}
            />

            <Title level={2}>Количество участников экзамена в регионе по типам ОО</Title>
            <Tables 
              data={counts}
              table={"OO"}
              type={"name"}
            />
            
            <Title level={2}>Количество участников ЕГЭ по учебному предмету по АТЕ региона</Title>
            <Tables 
              data={counts}
              table={"areas"}
              type={"name"}
            />
            <Title level={2}>Диаграмма распределения тестовых баллов(оценок)</Title>
            {diagData ?
             
            <Hist
              data = {diagData}
            /> 
            : <Spin/>}
            
           
        </Content>
            )
}