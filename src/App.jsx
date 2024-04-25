import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import ToDoService from "./Components/ToDoService";
import { useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid'; 
import { createTheme, colors, ThemeProvider } from "@mui/material"; 


const theme = createTheme({
  typography: {
    fontFamily: 'sans-serif',
    fontSize: 13,
    fontWeightLight: 100,
    htmlFontSize: 14
    },
  status: {
    danger: '#e53e3e',   
  },
  palette: {
    secondary: {
      main: colors.orange[500],
    },
    neutral: {
      main: colors.grey[500],
      darker: colors.grey[50],
    },
  }
})

function App() {
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [newSubtaskName, setNewSubtaskName] = useState("");


  useEffect(() => {
    ToDoService.getAll().then(initialProjects => {
      setProjects(initialProjects);
    });
  }, []);
  useEffect(() => { 
     // this hook executes when app component is loaded and everytime projects are updated
  }, [projects]);
  const handleProjectChange = (event, index) => {
    const newProjects = [...projects];
    newProjects[index].title = event.target.value;
    setProjects(newProjects);
    editProject(newProjects[index].id, event.target.value); // Call editProject to update the project on the server
  };
  const handleCreateTaskAndSubTask = (newValue, index) => {
    const newProjects = [...projects];
    newProjects[index] = newValue;
    setProjects(newProjects);
    createTaskAndSubtask(newProjects[index].tasks, newValue)
  }
  const handleTaskChange = (event, projectIndex, taskIndex) => {
    const newProjects = [...projects];
    newProjects[projectIndex].tasks[taskIndex].name = event.target.value;
    setProjects(newProjects);
    editTask(newProjects[projectIndex].id, newProjects[projectIndex].tasks[taskIndex].id, event.target.value);
  };
  const handleSubtaskChange = (event, projectIndex, taskIndex, subtaskIndex,) => {
    const newProjects = [...projects];  
    newProjects[projectIndex].tasks[taskIndex].subtasks[subtaskIndex].name = event.target.value;
    setProjects(newProjects);
    editSubtask(newProjects[projectIndex].id, newProjects[projectIndex].tasks[taskIndex].id, newProjects[projectIndex].tasks[taskIndex].subtasks[subtaskIndex].id, event.target.value);
  };
  const createTaskAndSubtask = (id, projectId) => {
    const projectToUpdate = projects.find(project => project.id === projectId);
  
    if (projectToUpdate) {
      const newTask = {
        id: uuidv4(), 
        name: newTaskName,
        complete: false,
        selected: false,
        date: new Date(), 
        subtasks: [
          {
            id: uuidv4(), 
            name: newSubtaskName,
            complete: false,
            date: new Date(), 
            selected: false,
          }
        ]
      };
  
      const updatedTasks = [...projectToUpdate.tasks, newTask];
      const updatedProject = { ...projectToUpdate, tasks: updatedTasks };
  
      // Update the project on the server
      ToDoService.update(projectId, updatedProject)
        .then(returnedProject => {
          const updatedProjects = projects.map(project => 
            project.id === projectId ? returnedProject : project
          );
  
          setProjects(updatedProjects);
          setNewTaskName("");
          setNewSubtaskName(""); // Reset the input fields
          console.log("Added a new task and subtask to the project");
        })
        .catch(error => console.error('Error updating project:', error));
    }
  };
  const createProject = () => {
    const projectInfo = {
      
      id: uuidv4(), 
      title: newProjectTitle,
      selected: false,
      date: new Date(), 
      tasks: [
        {
          name: newTaskName,
          id: uuidv4(), 
          complete: false,
          selected: false,
          date: new Date(), 
          subtasks: [
            {
              id: uuidv4(), 
              name: newSubtaskName,
              complete: false,
              selected: false,
              date: new Date(), 
            }
          ]
        }
      ]
    };
    ToDoService
      .create(projectInfo)
      .then(returnedProject => {
        setProjects([...projects, returnedProject]); // Add the new project to the projects array
        setNewProjectTitle(""); // Reset the new project title input field
        console.log("Add a new Project");
      })
  };
  const editProject = (id, newProjectTitle) => {  
    const currentProject= projects.find(project => project.id === id)
    console.log(currentProject.id);
    ToDoService
    .update(id, {...currentProject, title: newProjectTitle})
  };
  const editTask = (id, taskId, newTaskName) => {
    const currentProject= projects.find(project => project.id === id)// return object
    if(currentProject) {
      const currentTask = currentProject.tasks.find(task => task.id === taskId);//return object
      const updatedTask = {...currentTask[0], name: newTaskName}
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
  }
  const editSubtask = (projectId, taskId, subtaskId, newSubtaskName, newCompleteSubtaskValue) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const updatedTasks = project.tasks.map(task => {
          if (task.id === taskId) {
            const updatedSubtasks = task.subtasks.map(subtask => {
              if (subtask.id === subtaskId) {
                return { ...subtask, name: newSubtaskName, complete: newCompleteSubtaskValue };
              }
              return subtask;
            });
            return { ...task, subtasks: updatedSubtasks };
          }
          return task;
        });
        return { ...project, tasks: updatedTasks };
      }
      return project;
    });
  
    // Update the project on the server
    ToDoService
    .update(projectId, updatedProjects.find(project => project.id === projectId))
      .then(() => {
        setProjects(updatedProjects);
      })
      .catch(error => console.error('Error updating project:', error));
  };
  
  
  return (
    <ThemeProvider theme={theme}>
      <Router >
        <Routes >
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects 
            handleProjectChange={handleProjectChange} 
            handleTaskChange={handleTaskChange} 
            handleSubtaskChange={handleSubtaskChange}
            createProject={createProject}
            projects={projects}
            setProjects={setProjects}
            createTaskAndSubtask={createTaskAndSubtask}
            handleCreateTaskAndSubTask={handleCreateTaskAndSubTask}
            />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;

