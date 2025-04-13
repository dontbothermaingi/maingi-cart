import LocalMallOutlined from "@mui/icons-material/LocalMallOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Alert, Button, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import { Box, useMediaQuery } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router";

function Login ({onLogin}){

    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username:"",
        password:"",
    })

    function handleChange(event){
        const {name,value} = event.target

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]:value
        }))
    }

    function handleSubmit(event){
        event.preventDefault()

        if (!formData.username || !formData.password) {
            setOpenSnackBar(true);
            setSuccessMessage('Please fill in all fields');
            return;
        }

        fetch('https://shop-maingi-server.onrender.com/userLogin', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(errorMsg => {
                    throw new Error(errorMsg.error || 'Login failed');
                });
            }
        })
        .then(userData => {
            onLogin(userData); // Call the onLogin callback
            navigate('/'); // Redirect after login
            setOpenSnackBar(true)
            setSuccessMessage('Login Successful')

        })
        .catch((error) => {
            console.error('Failed to login', error)
            setOpenSnackBar(true)
            setSuccessMessage("username/password is incorrect")
        })
    }

    function handleCloseSnackBar(event,reason){
        if(reason === 'clickaway') return ;
        setOpenSnackBar(false)
    }

    function handleRegister (){
        navigate('/register')
    }

    const isMobile = useMediaQuery('(max-width: 768px)');

    return ( 
      <Box>
      {isMobile ? (
        <Box display="flex" flexDirection="column" justifyContent="space-between" p={4} sx={{margin:'auto', height:'700px',}}>
            {/* Header */}
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                
                <Typography
                    fontSize="35px"
                    fontWeight="bold"
                    textAlign="center"
                    color="#fbc02d"
                    fontFamily={"GT Bold"}
                >
                    MAINGI SHOP
                </Typography>
                <IconButton>
                  <LocalMallOutlined style={{color:'fbc02d', fontSize:'40px'}}/>
                </IconButton>
            </Box>

            {/* Login Form */}
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography fontFamily={"GT Regular"} fontSize="35px" fontWeight="bold" mb="5px" textAlign="center">
                    Welcome back!
                </Typography>
                <Typography fontFamily={"GT Light"} fontSize="15px" mb="20px" textAlign="center">
                    We're glad to see you again. Please enter your credentials to continue accessing your account.
                </Typography>
                <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>
                        <TextField
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            aria-label="Username"
                            variant="outlined"
                            label="Username"
                            sx={{ mb: '20px' }}
                            fullWidth
                        />


                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            variant="outlined"
                            label="Password"
                            sx={{ flex: 1 }}
                            InputProps={{
                                endAdornment: (
                                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                ),
                              }}
                        />

                        <Typography fontFamily={"GT Regular"} onClick={handleRegister} sx={{cursor:'pointer'}}>No account? Register</Typography>


                        <Button sx={{fontFamily:"GT Bold", fontSize:'15px', backgroundColor:"#fbc02d", mt:'20px'}} type="submit" variant="contained" color="secondary" fullWidth>
                            LOGIN
                        </Button>
                </form>
            </Box>

            {/* Footer Text */}
            <Box>
                <Typography fontFamily={"GT Light"} fontSize="15px" mb="20px" textAlign="center">
                    © 2025 Maingi Shop Ltd. All rights reserved.
                </Typography>
            </Box>
        </Box>
      ):(
        <Box sx={{backgroundColor:'#fbc02d'}} padding={'84px'}>
          <Box display="flex" flexDirection="column" justifyContent="space-between" p={4} sx={{ backgroundColor: 'white', margin:'auto', width:'500px', height:'700px', borderRadius:'15px' }}>
            {/* Header */}
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                
                <Typography
                    fontSize="35px"
                    fontWeight="bold"
                    textAlign="center"
                    color="#fbc02d"
                    fontFamily={"GT Bold"}
                >
                    MAINGI SHOP
                </Typography>
                <IconButton>
                  <LocalMallOutlined style={{color:'fbc02d', fontSize:'40px'}}/>
                </IconButton>
            </Box>

            {/* Login Form */}
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography fontFamily={"GT Regular"} fontSize="35px" fontWeight="bold" mb="5px" textAlign="center">
                    Welcome back!
                </Typography>
                <Typography fontFamily={"GT Light"} fontSize="15px" mb="20px" textAlign="center">
                    We're glad to see you again. Please enter your credentials to continue accessing your account.
                </Typography>
                <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>
                        <TextField
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            aria-label="Username"
                            variant="outlined"
                            label="Username"
                            sx={{ mb: '20px' }}
                            fullWidth
                        />


                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            variant="outlined"
                            label="Password"
                            sx={{ flex: 1 }}
                            InputProps={{
                                endAdornment: (
                                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                ),
                              }}
                        />

                        <Typography fontFamily={"GT Regular"} onClick={handleRegister} sx={{cursor:'pointer'}}>No account? Register</Typography>


                        <Button sx={{fontFamily:"GT Bold", fontSize:'15px', backgroundColor:"#fbc02d", mt:'20px'}} type="submit" variant="contained" color="secondary" fullWidth>
                            LOGIN
                        </Button>
                </form>
            </Box>

            {/* Footer Text */}
            <Box>
                <Typography fontFamily={"GT Light"} fontSize="15px" mb="20px" textAlign="center">
                    © 2025 Maingi Shop Ltd. All rights reserved.
                </Typography>
            </Box>
          </Box>
        </Box>
      )}

        <Snackbar 
          open={openSnackBar}
          onClose={handleCloseSnackBar}
          autoHideDuration={6000}
          anchorOrigin={{vertical:'top', horizontal:'center'}}
        >
            <Alert
            onClose={handleCloseSnackBar}
              severity={successMessage.startsWith('Failed') ? 'error': 'success'}
              sx={{ width: '100%' }}
            >
                {successMessage}
            </Alert>
        </Snackbar>

      </Box>
     );
}
 
export default Login;
