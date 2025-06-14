import {useState, useEffect} from 'react';
import Pie from "../Pie.jsx";
import {TableChartOutlined, PieChartOutlineOutlined} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import {Typography, CircularProgress, Paper, Button  } from '@mui/material';

  const columns = [
    { 
        field: 'name', 
        headerName:"",  
        width: 150, 
    },
    {
        field: 'count',
        headerName: 'Чел.',
        type: 'number',
        width: 60,
        filterable: false,
    },
    {
        field: 'percents',
        headerName: '% общего числа участников',
        type: 'number',
        width: 80,
    }
  ];

export default function TabChart(props){
    const {data} = props
    const [chart, setChart] = useState(false)
    const [e, setData] = useState(false)

      useEffect(() =>{
        setData(data)
        
        }, [data])
    return (
        <>
            {
                e ? 
                
                <div style={{margin: 0, height: (Object.keys(e[1]).length > 5 ? null : 300), 
                    width: '100%',}}>
                    <span className='flex justify-between'>
                        <Button 
                            color="inherit"
                            startIcon={chart ? <TableChartOutlined/> : <PieChartOutlineOutlined />}
                            onClick={() => setChart(chart ? false : true)}
                            style={{
                            fontSize: '20px',
                            padding: 10,
                        }}/>
                        <div className='self-center'>
                            <Typography variant="h5" className='m-auto'>{e[0]}</Typography>
                        </div>
                    </span>

                    {chart ? 
                    <div style={{width: '90%', marginInline: 'auto'}}>
                        <div style={{width: '90%', height: '100%', marginInline: 'auto'}}>
                            <Pie
                                data={e[1]}/>
                        </div>
                    </div>
                    :
                    <Paper sx={{  height:  (Object.keys(e[1]).length > 3 ? 250 : null), width: '100%' }}>
                        <DataGrid
                            style={{fontSize:12 }}
                            rows={e[1]}
                            columns={columns}
                            sx={{ border: 1,
                                 '& .MuiDataGrid-columnHeaderTitle': {
                                    whiteSpace: 'normal',
                                    lineHeight: 'normal', },
                                '& .MuiDataGrid-cell': {
                                    whiteSpace: 'wrap',
                                    lineHeight: 'normal', },
                                    }}
                            density='compact'
                            hideFooter
                            rowHeight={70}
                            columnHeaderHeight={80}
                        />
                    </Paper>
                    }
                </div>
                : <CircularProgress />
            }
        </>
    );
};