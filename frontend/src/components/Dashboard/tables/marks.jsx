import React, {useEffect, useState} from 'react';
import { Divider, Table } from 'antd';

const columns = [
    {
        title: "Год",
        dataIndex: "year"
    },
    {
      title: 'Чел.',
      dataIndex: 'count',
    },
    {
      title: '% от общего числа участников',
      dataIndex: 'percents',
      width: '30%'
    },
  ];

export default function MarksTable(props){
    const {data} = props
    const [tables, setTables] = useState([])
    const arr = Object.values(data)[0]
    
    
    useEffect(() =>{
        const tabs = []
    for( var i in arr){
        const e = arr[i]
        // console.log(e)
        const tData = e.map(j => {
            return{year: j.year,count: j.count_on_exam,
                 percents: ((j.count_on_exam/j.students_at_all)*100).toFixed(1)}
        })
        // console.log(tData)
        tabs.push(
            tData
        )
    }
    // console.log(tabs)
    setTables(tabs)
}, [data])
    
   return (
    <div style={{margin: 20, justifyContent: 'center'}}>
                {tables.map((e, index) => (
                        <Table
                            key={index}
                            columns={columns}
                            dataSource={e}
                            bordered        
                            pagination={false}
                        />
                ))}
    </div>
    );
};