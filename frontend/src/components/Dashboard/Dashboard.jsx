import { Layout, Typography, Spin } from "antd"
const {Content} = Layout;
import Tables from './tables/Tables.jsx'
import CountsTable from "./tables/countsTable.jsx";
import Hist from './Hist.jsx';

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
              }}
            >
            <Title style={{}}>{subject.label.replace(/^./, char => char.toUpperCase())}</Title>

            <CountsTable 
              data={{counts}}/>

            <Title >{}</Title>
            <Tables 
              data={counts}
              table={"sextable"}
              type={"sex"}
            />

            <Title >{}</Title>
            <Tables 
              data={counts}
              table={"categories"}
              type={"description"}
            />

            <Title >{}</Title>
            <Tables 
              data={counts}
              table={"OO"}
              type={"name"}
            />
            
            <Title >{}</Title>
            <Tables 
              data={counts}
              table={"areas"}
              type={"name"}
            />
            {diagData ? 
            <Hist
              data = {diagData}
            /> 
            : <Spin/>}
            
           
        </Content>
            )
}