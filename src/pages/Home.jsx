import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import '../Styles/MyAccount.css';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Stack } from '@mui/material';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const images = [
    {
      label: 'Your notes',
      imgPath: '/src/images/taskTable.jpg', // Provide the relative path without quotes
    },
    {
      label: 'Calendar',
      imgPath:
        '/src/images/calendarImage.jpg',
    },
    {
      label: 'Task App',
      imgPath:
        './src/images/taskExample.png',
    },
    {
      label: 'Smart Management',
      imgPath:
        './src/images/planner.jpg',
    },
  ];
    const StyledBox = styled(Box)(({ theme }) => ( {
        height: '600px',
        width: '250px',
        marginLeft: '300px',
        marginTop: '160px',
        borderRadius: '20px',
        padding: '50px',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',    
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }))

const Home = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    const maxSteps = images.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleStepChange = (step) => {
      setActiveStep(step);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSignUpSuccess = () => {
      setSuccessOpen(true);
    }
    const handleSuccessAlertClose = () => {
      setSuccessOpen(false);
    }
    return (
        <div >
          <Stack direction="row">
            <StyledBox >
                <Paper 
                  square
                  elevation={0}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    borderRadius: 10,
                    pl: 2,
                    bgcolor: 'background.default',
                    color: 'black'
                  }}
                    >
                  <Typography>{images[activeStep].label}</Typography>
                </Paper>
                <AutoPlaySwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                >
                  {images.map((step, index) => (
                      <div key={step.label}>
                      {Math.abs(activeStep - index) <= 2 ? (
                          <Box
                          component="img"
                          sx={{
                            height: 255,
                            display: 'block',
                            maxWidth: 400,
                            overflow: 'hidden',
                            width: '100%',
                            borderRadius: 10,

                          }}
                            src={step.imgPath}
                            alt={step.label}
                            />
                            ) : null}
                      </div>
                  ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    style={{ borderRadius: '20px' }}
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                          variant="contained"
                          size="small" 
                          color="success"
                          onClick={handleNext}
                          disabled={activeStep === maxSteps - 1}
                          >
                          Next
                          {theme.direction === 'rtl' ? (
                              <KeyboardArrowLeft />
                              ) : (
                                  <KeyboardArrowRight />
                                  )}
                        </Button>
                    }
                    backButton={
                        <Button 
                          variant="contained"
                          size="small" 
                          color="success" 
                          onClick={handleBack} 
                          disabled={activeStep === 0}>
                          {theme.direction === 'rtl' ? (
                              <KeyboardArrowRight />
                              ) : (
                                  <KeyboardArrowLeft />
                                  )}
                          Back
                        </Button>
                    }
                />
            </StyledBox>
            <StyledBox >
                <React.Fragment>
                  <Box className='signUpBox'>
                  <h3>Websites that grow audiences from day one</h3>
                  <h5>
                    With built-in signup and pop-up forms connected to your Marketing CRM,
                    your Mailchimp website is optimized to convert leads
                    and help you stay engaged with your audience.
                  </h5>
                  </Box>
                  <Button className='button'
                    variant="contained"
                    color="success" 
                    onClick={handleClickOpen}>
                    Create an Account
                  </Button>
                  <Dialog open={successOpen} onClose={handleSuccessAlertClose}>
                     <Alert severity="success">
                       <AlertTitle>Success</AlertTitle>
                       Congratulations! We are thrilled to inform you that your registration with 
                       Task App was successful! 
                     </Alert>
                  </Dialog>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      component: 'form',
                      onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        const name = formJson.name;
                        console.log(email);
                        console.log(name);
                        handleClose();
                        handleSignUpSuccess();
                      },
                    }}
                  >
                    <DialogTitle>Sign up</DialogTitle>
                    <DialogContent
                      style={{
                        height: 'fit-content',
                        width: 'fit-content',
                        position: 'center',
                        borderRadius: '30px',
                        padding: '30px',
                      }}>
                      <DialogContentText>
                        Welcome to Taks App!
                        Please confirm your email and password
                        and we send a confirmation message to you email.
                      </DialogContentText>
                      <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="name"
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button 
                        variant="contained"
                        size="small" 
                        color="success" 
                        onClick={handleSignUpSuccess}>Cancel</Button>
                      <Button 
                        variant="contained"
                        size="small" 
                        color="success" 
                        type="submit">Sign Up</Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
            </StyledBox>
          </Stack>
        </div>
    );
};

export default Home;