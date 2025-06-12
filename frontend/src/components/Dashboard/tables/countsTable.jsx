import {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
    { field: 'year', headerName:"Год",  width: 300},
    {
        field: 'count',
        headerName: 'Чел.',
        type: 'number',
        width: 300,
    },
    {
        field: 'percents',
        headerName: '% от общего числа участников',
        type: 'number',
        width: 300,
    }
  ];

export default function CountsTable(props){
    const {data} = props
    const [tables, setTables] = useState([])
    const arr = Object.values(data)[0]
    
    useEffect(() =>{
        var tData = []
    for( var i in arr){
        tData = arr[i].map((j, index) => {
            return{id: index, year: j.year,count: j.count_on_exam,
                 percents: ((j.count_on_exam/j.students_at_all)*100).toFixed(1)}
        })
    }
    setTables(tData)
}, [data])
    
   return (
    <div style={{margin: 20, justifyContent: 'center'}}>
        
        <Paper sx={{  height: 266, width: '100%' }}>
            <DataGrid
                rows={tables}
                columns={columns}
                sx={{ border: 1 }}
            />
        </Paper>
    </div>
    );
};