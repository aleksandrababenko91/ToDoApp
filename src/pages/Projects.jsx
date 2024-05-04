import { useState} from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, TextField, Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import { createSvgIcon } from '@mui/material/utils';
import Tab from '@mui/material/Tab';
import '../Styles/MyAccount.css';
import PropTypes from 'prop-types';
import ToDoService from '../Components/ToDoService';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { v4 as uuidv4 } from 'uuid'; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AddIcon from '@mui/icons-material/Add';


const label = { inputProps: { 'aria-label': 'Checkbox demo'}};
const PlusIcon = createSvgIcon(
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

const Projects = (props) => {
  const { handleProjectChange, handleSubtaskChange, handleTaskChange, createProject, projects= [], setProjects, handleCreateTaskAndSubTask} = props;
  const [value, setValue] = useState('1');
  const [expanded, setExpanded] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (projectId, event) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
      projectId: projectId, // Include the projectId in the contextMenu state
    });
    console.log("Open context Menu for Project ID:", projectId);
  };
  const handleClose = () => {
    setContextMenu(null);
  };
  const handleChange = (event, newValue) => {   
    event.preventDefault()
    setValue(newValue);
    console.log("click Tab project");
  };
  const handleExpandChange = (panel) => (event, isExpanded) => {    /// Expand Accordion
    setExpanded(isExpanded ? panel : null);
  };
  const handleTaskCheckboxChange = (projectIndex, taskIndex, taskId) => {
    const newProjects = [...projects];
    const newCompleteTaskValue = !newProjects[projectIndex].tasks[taskIndex].complete;
    newProjects[projectIndex].tasks[taskIndex].complete = newCompleteTaskValue;
    toggleTask(newProjects[projectIndex].id, taskId, newCompleteTaskValue);
    setProjects(newProjects);
  };
  const toggleTask = (id, taskId, newCompleteTaskValue) => {
    const currentProject= projects.find(project => project.id === id)// return object
    console.log(currentProject);
    if(currentProject) {
      const currentTask = currentProject.tasks.find(task => task.id === taskId);//return object
      console.log(currentTask);
      const updatedTask = {...currentTask[0], complete: !newCompleteTaskValue}
      console.log(updatedTask);
      const updatedTasks = currentProject.tasks.map(task => {
        if(task.id === updatedTask.id) {
          return updatedTask
        } else {
          return task;
        }
      })
      const updatedProject = {...currentProject, tasks: updatedTasks}
      ToDoService
      .update(id, updatedProject)
      .then(
        setProjects(projects.map(project => {
          if(project.id === id) {
            return updatedProject
          } else{
            return project
          }
        })))
      }
  };
  const handleSubtaskCheckBoxChange = (projectIndex, taskIndex, subtaskIndex, subtaskId) => {
    const newProjects = [...projects];
    const currentProject = newProjects[projectIndex];
    console.log(currentProject);
    const currentTask = currentProject.tasks[taskIndex];
    const currentSubtask = currentTask.subtasks[subtaskIndex];
    const newCompleteSubtaskValue = !currentSubtask.complete;
    currentSubtask.complete = newCompleteSubtaskValue;
    toggleSubtask(currentProject.id, currentTask.id, subtaskId, newCompleteSubtaskValue);
    setProjects(newProjects);
  };
  const toggleSubtask = (projectId, taskId, subtaskId, newCompleteSubtaskValue) => {
    const projectToUpdate = projects.find(project => project.id === projectId);
    if (projectToUpdate) {
      const taskToUpdate = projectToUpdate.tasks.find(task => task.id === taskId);
      if (taskToUpdate) {
        const updatedTasks = projectToUpdate.tasks.map(task => {
          if (task.id === taskId) {
            const updatedSubtasks = task.subtasks.map(subtask => {
              if (subtask.id === subtaskId) {
                return { ...subtask, complete: newCompleteSubtaskValue };
              }
              return subtask;
            });
            return { ...task, subtasks: updatedSubtasks };
          }
          return task;
        });
        const updatedProject = { ...projectToUpdate, tasks: updatedTasks };
        ToDoService.update(projectId, updatedProject)
          .then(() => {
            setProjects(projects.map(project => project.id === projectId ? updatedProject : project));
          })
          .catch(error => console.error('Error updating project:', error));
      }
    }
  };
  const handleDatePickerChange = (newValue, projectIndex, taskIndex) => {
    const newProjects = [...projects];
    const parsedDate = dayjs(newValue);
    newProjects[projectIndex].tasks[taskIndex].date = parsedDate;
    setProjects(newProjects);
    editDatePicker(newProjects[projectIndex].id, newProjects[projectIndex].tasks[taskIndex].id, newValue);
  };
  const editDatePicker = (id, taskId, datePicker) => {
      const currentProject= projects.find(project => project.id === id)// return object
      if(currentProject) {
        const currentTask = currentProject.tasks.find(task => task.id === taskId);//return object
        const updatedTask = {...currentTask, date: datePicker}
        const updatedTasks = currentProject.tasks.map(task => {
          if(task.id === updatedTask.id) {
            return updatedTask
          } else {
            return task;
          }
        })
        const updatedProject = {...currentProject, tasks: updatedTasks}
        ToDoService
          .update(id, updatedProject)
          .then(
            setProjects(projects.map(project => {
              if(project.id === id) {
                return updatedProject
              } else{
                return project
              }
            })))
      }
  }; 
  const removeProject = (projectId) => {
    ToDoService
    .remove(projectId)
    .then(() => {
      setProjects(projects.filter(project => project.id !== projectId));
    })
  };
  const duplicateProject = (projectId) => {
    const selectedProject = projects.find(project => project.id === projectId);
    if (selectedProject) {
      const myDuplicatedProject = {
        ...selectedProject,  
        id: uuidv4(),
        title: `${selectedProject.title} (Copy)` 
      };
      setProjects([...projects, myDuplicatedProject]);
      ToDoService.create(myDuplicatedProject)
        .then(returnedProject => {
          console.log("Duplicated Project Added:", returnedProject);
        })
    }
  };
  
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext  value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList  onChange={handleChange} aria-label="lab API tabs example" >
            {projects.map((project, index) => (
              <Tab
                value={(index + 1).toString()}
                key={index + 1}
                label={
                  <TextField
                    value={project.title}
                    onChange={(event) => handleProjectChange(event, index)}
                    onContextMenu={(event) => handleContextMenu(project.id, event)} // Pass projectId here
                  />
                }
              />
            ))}
            {projects.map((project, index) => (
              <Menu
                key={index + 1}
                open={contextMenu !== null && contextMenu.projectId === project.id}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                  contextMenu !== null && contextMenu.projectId === project.id
                  ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                  : undefined
                }
              >
                <MenuItem onClick={() => duplicateProject(contextMenu.projectId)}><FileCopyIcon></FileCopyIcon>Duplicate</MenuItem>
                <MenuItem onClick={() => removeProject(contextMenu.projectId)}><DeleteIcon></DeleteIcon>Delete</MenuItem>
              </Menu>
            ))}
              <Button
                onClick={createProject} // Call createProject function on button click
                component="label"
                role={undefined}
                variant="contained"
                size="small" 
                color="success"
                tabIndex={-1}
                startIcon={<PlusIcon></PlusIcon>}
              >
                New Project
              </Button>
          </TabList>
        </Box>
        <Box className='taskBox'
        >
        {projects.map((project, index) => (          /// ITERATE TASKS
          <TabPanel  
          key={index + 1} value={(index + 1).toString()}>
            {project.tasks.map((task, taskIndex) => (
              <Accordion  
              className='accordionStyle'
              
                key={task.id}
                expanded={expanded === task.id}
                onChange={handleExpandChange(task.id)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                <Stack spacing={1}>
                  <Stack direction="row" space={1}>
                    <Checkbox {...label} 
                      type="checkbox"
                      onChange={() => handleTaskCheckboxChange(index, taskIndex, task.id)}
                      checked={task.complete}
                      />
                    <TextField  
                      fullWidth={true} 
                      size="small" 
                      value={task.name} 
                      onChange={(event) => handleTaskChange(event, index, taskIndex)} 
                      />
                  </Stack>
                  <Stack direction="row" space={1}>
                    <Box className="datePickerBox"> {/* DATE Picker */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DatePicker']}>
                            <DatePicker 
                              value={dayjs(project.tasks[taskIndex].date)} 
                              onChange={(newValue) => handleDatePickerChange(newValue, index, taskIndex)} 
                              />
                          </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                  </Stack>
                </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack direction="column" spacing={2}>
                    {task.subtasks.map((subtask, subtaskIndex) => (           ///ITERATE SUBTASKS
                      <Stack direction="row" key={subtask.id}>
                        <Checkbox {...label}
                          type="checkbox"
                          onChange={() => handleSubtaskCheckBoxChange(index, taskIndex, subtaskIndex, subtask.id)}
                          checked={subtask.complete} 
                        />
                        <TextField 
                          multiline maxRows={4} 
                          size="small" 
                          value={subtask.name} 
                          onChange={(event) => handleSubtaskChange(event, index, taskIndex, subtaskIndex)} 
                        />      
                      </Stack>
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
              ))}
              <Button 
                startIcon={<AddIcon></AddIcon>} 
                size="medium" 
                variant="contained" 
                color="success" 
                onClick={() => handleCreateTaskAndSubTask(project.id)}>
                New Task
              </Button>
          </TabPanel>
        ))}
        </Box>
      </TabContext>
    </Box>
  );
}

Projects.propTypes = {
  handleProjectChange: PropTypes.func.isRequired,
  handleSubtaskChange: PropTypes.func.isRequired,
  handleTaskChange: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  createTaskAndSubtask: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired,
  setProjects: PropTypes.func.isRequired,
  handleCreateTaskAndSubTask: PropTypes.func.isRequired
};
export default Projects;
