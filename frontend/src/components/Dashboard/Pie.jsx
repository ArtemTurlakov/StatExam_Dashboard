import { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

export default function Pie(d) {
      const [data, setData] = useState([{id: 0, value: 1, label: "0"}]);
    
      useEffect(() => {
        setTimeout(() => {
            const arr = Object.values(d)[0]
            const tData = arr.map((j, index) => {
                return{id: index, label: Object.values(j)[0], value: j.count, percent: j.percents}
                 })
          setData(tData);
        }, 200);
      }, [data]);
    return (
        <PieChart
            series={[
                {
                    'data': data,
                    arcLabel: (item) => `${item.percent}%`,
                    arcLabelMinAngle: 25
                }
            ]}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fontWeight: '',
                },
              }}
            hideLegend={true}
            width={300}
            height={300}
     />
  );
}