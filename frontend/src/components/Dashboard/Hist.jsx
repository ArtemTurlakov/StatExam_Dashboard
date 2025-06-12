import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from 'antd';
const { Title } = Typography;

export default function Hist(props) {
    const {data} = props
    const d = data.marks[0].finals_diag
    const c = d[0].score ? 'score' : 'final_points'
    // console.log(d)
    // console.log(data.year)
    const [diagData, setData] = useState([{id: 0}]);
        
    useEffect(() => {
        setTimeout(() => {
            setData(d);
        }, 50);
    }, [data]);
  return (
    <>
    {
    data ? <>
        <Title>{data.year}</Title>
        <BarChart
            series={[{ 
                    data: diagData.map(function (obj)
                        {return obj.count}),
                    label: 'Количество участников',}]}

            xAxis={[{ 
                    data: diagData.map(function (obj)
                        {return obj[c]}),
                    label: "Баллы"
                }]}

            yAxis={[{ width: 50 }]}
            height={300}
            width={700}
            barLabel= {c === "score" ? "value" : null}
        />
        </>
        :<Spin/>
        }
    </>
  );
}
