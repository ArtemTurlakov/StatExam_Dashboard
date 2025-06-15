
import {ToggleButton , ToggleButtonGroup, Typography } from '@mui/material';
import './selector.css'
export default function ExamSelector({onExamChange}) {
  
  return (
    <ToggleButtonGroup 
      style={{width: '100%'}}
      className='self-center'
      fullWidth
      exclusive
      onChange={onExamChange}
      aria-label="Grade"
    >
      <ToggleButton value="9">
        <Typography color='white' variant="h6" sx={{ flexGrow: 1 }}>
          ОГЭ
        </Typography>
      </ToggleButton>
      <ToggleButton value="11">
        <Typography color='white' variant="h6" sx={{ flexGrow: 1 }}>
          ЕГЭ
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

