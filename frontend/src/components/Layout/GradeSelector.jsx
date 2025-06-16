
import {ToggleButton , ToggleButtonGroup, Typography } from '@mui/material';
import './selector.css'
export default function GradeSelector({grade, setGrade}) {
  const handleGrade = (event, newGrade) => {
    setGrade(newGrade);
  };
  return (
      <ToggleButtonGroup 
        style={{width: '100%', borderWidth: 1, borderColor: 'white'}}
        className='self-center'
        fullWidth
        exclusive
        
        value={grade}
        onChange={handleGrade}
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

