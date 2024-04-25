import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, TextField, Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import { createSvgIcon } from '@mui/material/utils';
import { useEffect, useState } from "react";
import ToDoService from "../Components/ToDoService";

const label = { inputProps: { 'aria-label': 'Checkbox demo' }};
const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com/
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Plus',
);


const Task = () => {
  const [projects, setProjects] = useState([]);
 
  const [expanded, setExpanded] = useState(false)
  useEffect(() => {
    ToDoService
      .getAll()
        .then(initialProjects => {
          setProjects(initialProjects)
        })
  }, []);

  const handleChange = (isExpanded, panel) => {
    setExpanded(isExpanded ? panel: false)
  }

  return (
    <Box >
      <Box style={{width: 500, paddingBottom: 10}}>
        {projects.map(project => (
          project.tasks.map(task => (
          <Accordion key={task.id} expanded={expanded === 'panel1'} onChange={(event, isExpanded) => handleChange(isExpanded, 'panel1')}>
            <AccordionSummary 
              id='panel1-header' 
              aria-controls='panel1-content' 
              expandIcon={<ExpandMoreIcon />}
              >
              <Checkbox  {...label} />
              <TextField fullWidth={true} size="small"  value={task.name}>
              </TextField>
            </AccordionSummary>
              <AccordionDetails >
                <Stack   direction="column" spacing={2}>
                  <Stack direction="row">
                    <Checkbox {...label} />
                    {task.subtasks.map(subtask => (
                    <TextField 
                      multiline
                      maxRows={4} 
                      size="small" 
                      key={subtask.id}
                      value={subtask.name}
                      >
                    </TextField>
                  ))}
                  </Stack>
                </Stack>
              </AccordionDetails>
          </Accordion>
    ))))}
      <Button component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<PlusIcon></PlusIcon>}>
        New Task
      </Button>
      </Box>
    </Box>
  )
}

  export default Task;