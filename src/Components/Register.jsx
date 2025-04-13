import LocalMallOutlined from "@mui/icons-material/LocalMallOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Alert, Button, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import { Box, useMediaQuery } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router";

function Register(){

    const [openSnackbar, setOPenSnackbar] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [showPassowrd, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [formData,setFormData] = useState({
        phone_number:"",
        username:"",
        email:"",
        password:"",
        confirm_password:"",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            setOPenSnackbar(true);
            setSuccessMessage('Passwords do not match');
            return;
        }
        
        try {
            const response = await fetch('https://maingi-shop-server.onrender.com/userRegister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const userData = await response.json();
                console.log('User registered successfully:', userData);
                setOPenSnackbar(true)
                setSuccessMessage("Registration Successfull")
                // Redirect to login page after successful registration
                navigate('/login');
            } else {
                const errorMessage = await response.json();
                console.error('Registration failed:', errorMessage);

                // Handle registration error
            }
        } catch (error) {
            console.error('Error occurred during registration:', error);
            setOPenSnackbar(true)
            setSuccessMessage('Failed to Register')

        }
    };

    function handleShowPassword(){
        setShowPassword(!showPassowrd)
    }

    function handleCloseSnackBar(reason, event){
        if(reason === 'clickaway') return;
        setOPenSnackbar(false)
    }

    function handleLogin(){
      navigate('/login')
    }

    const isMobile = useMediaQuery('(max-width: 768px)');
    

    return ( 
        <Box>
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
                            Create Account
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
                                    value={formData.email}
                                    name="email"
                                    onChange={handleChange}
                                    type="text"
                                    label="Email"
                                    variant="outlined"
                                    sx={{mb:'20px'}}
                                />

                                <TextField 
                                    value={formData.phone_number}
                                    name="phone_number"
                                    onChange={handleChange}
                                    type="text"
                                    label="Phone Number"
                                    variant="outlined"
                                    sx={{mb:'20px'}}
                                />


                                <TextField
                                    type={showPassowrd ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    variant="outlined"
                                    label="Password"
                                    sx={{mb:'20px', flex: 1 }}
                                    InputProps={{
                                        endAdornment: (
                                          <IconButton onClick={handleShowPassword}>
                                            {showPassowrd ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        ),
                                    }}
                                />


                                <TextField
                                    type={showPassowrd ? 'text' : 'password'}
                                    id="confirm_password"
                                    name="confirm_password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    variant="outlined"
                                    label="Confirm Password"
                                    sx={{ flex: 1 }}
                                    InputProps={{
                                        endAdornment: (
                                          <IconButton onClick={handleShowPassword}>
                                            {showPassowrd ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        ),
                                    }}
                                />

                                <Typography fontFamily={"GT Regular"} onClick={handleLogin} sx={{cursor:'pointer'}}>Already have an account? Login</Typography>


                                <Button sx={{fontFamily:"GT Bold", fontSize:'15px', backgroundColor:"#fbc02d", mt:'20px'}} type="submit" variant="contained" color="secondary" fullWidth>
                                REGISTER
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
                            Create Account
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
                                    value={formData.email}
                                    name="email"
                                    onChange={handleChange}
                                    type="text"
                                    label="Email"
                                    variant="outlined"
                                    sx={{mb:'20px'}}
                                />

                                <TextField 
                                    value={formData.phone_number}
                                    name="phone_number"
                                    onChange={handleChange}
                                    type="text"
                                    label="Phone Number"
                                    variant="outlined"
                                    sx={{mb:'20px'}}
                                />


                                <TextField
                                    type={showPassowrd ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    variant="outlined"
                                    label="Password"
                                    sx={{ mb:'20px', flex: 1 }}
                                    InputProps={{
                                        endAdornment: (
                                          <IconButton onClick={handleShowPassword}>
                                            {showPassowrd ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        ),
                                    }}
                                />


                                <TextField
                                    type={showPassowrd ? 'text' : 'password'}
                                    id="confirm_password"
                                    name="confirm_password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    variant="outlined"
                                    label="Confirm Password"
                                    sx={{ flex: 1 }}
                                    InputProps={{
                                        endAdornment: (
                                          <IconButton onClick={handleShowPassword}>
                                            {showPassowrd ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        ),
                                    }}
                                />

                                <Typography fontFamily={"GT Regular"} onClick={handleLogin} sx={{cursor:'pointer'}}>Already have an account? Login</Typography>


                                <Button sx={{fontFamily:"GT Bold", fontSize:'15px', backgroundColor:"#fbc02d", mt:'20px'}} type="submit" variant="contained" color="secondary" fullWidth>
                                    REGISTER
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
            </Box>

            

            <Snackbar 
              open={openSnackbar}
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
 
export default Register;

