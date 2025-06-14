import {useEffect, useState} from 'react';
import { Divider } from 'antd';

import TabChart from './TabChart.jsx';


export default function Tables(props){
    const {data, table, type} = props
    const [tables, setTables] = useState([])
    
    const arr = Object.values(data)[0]

    useEffect(() =>{
      const tabs = []
      for( var i in arr){
        if (arr[i].count_on_exam == 0) continue
        
        const tData = arr[i][eval(`"${table}"`)].map((j, index) => {
          return{ name: j[type], id: index, count: j.count,
                percents: ((j.count/arr[i].count_on_exam)*100).toFixed(1)}
           })
          tabs.push(
            [arr[i].year, tData]
          )
       }
       setTables(tabs)
   }, [data])

    return (
      <div style={{justifyContent: 'space-between', width: '100%'}}>
      <ul className='flex'>
          {tables.map((e) => (
            <li className='mr-4' style={{width: '50%'}} key={e[0]}>
              <TabChart
                data={e}
              />
            </li>
          ))}
       </ul>
       <Divider/>
  </div>
    );
};