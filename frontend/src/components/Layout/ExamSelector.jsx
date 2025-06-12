import { Tabs } from 'antd';
import './selector.css'
export default function ExamSelector({onExamChange}) {
  const items = [
    {
      key: '1',
      label: 'ОГЭ',
    },
    {
      key: '2',
      label: 'ЕГЭ',
    },
  ];

  return (
        <Tabs style={{paddingTop: 10}}
          centered='true'
          size='large'
          type='card'
          defaultActiveKey="1" 
          items={items} onChange={onExamChange} />
  );
};

