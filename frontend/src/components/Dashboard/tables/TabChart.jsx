import {useState, useEffect} from 'react';
import Pie from "../Pie.jsx";
import { Typography, Button, theme, Spin } from 'antd';
const { Title } = Typography;
import {
    PieChartOutlined,
    TableOutlined
  } from '@ant-design/icons';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
  const columns = [
    { field: 'name', headerName:"",  width: 200 },
    {
        field: 'count',
        headerName: 'Чел.',
        type: 'number',
        width: 70,
    },
    {
        field: 'percents',
        headerName: '% от общего числа участников',
        type: 'number',
        width: 160,
    }
  ];

export default function TabChart(props){
    const {data, i} = props
    const [chart, setChart] = useState(false)
    const [e, setData] = useState(false)

    const { 
        token: { colorBgContainer},
      } = theme.useToken();

      useEffect(() =>{
        setData(data)
        
        }, [data])
    return (
         <div style={{margin: 20, width: '90%', justifyContent: "center"}}>
            {
                e ? 
                <>
                    <span className='flex'>
                    <Button
                        type="text"
                        icon={chart ? <PieChartOutlined /> : <TableOutlined/>}
                        onClick={() => setChart(chart ? false : true)}
                        style={{
                        background: colorBgContainer,
                        fontSize: '20px',
                        margin: 10,
                        padding: 10,
                    }}/>

                    <Title className='mx-35'>{e[0]}</Title>

                    </span>

                    {chart ? 
                    <div style={{width: '100%',justifyContent: 'center'}}>
                        <div style={{width: '30em', height: '20em', marginInline: 'auto'}}>
                            <Pie
                                data={e[1]}/>
                        </div>
                    </div>
                    :
                    <Paper sx={{  height: Math.min( e[1].length *107, 350), width: '100%' }}>
                        <DataGrid
                            rows={e[1]}
                            columns={columns}
                            sx={{ border: 1 }}
                        />
                    </Paper>
                    }
                </>
                :<Spin/>
            }
        </div>
        
        
    );
};