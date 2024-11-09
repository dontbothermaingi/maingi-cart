import { Button, TextField, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from "@mui/icons-material";
import { Box,IconButton,Typography,} from "@mui/material";
import './Login.css';

function Login({ onLogin }) {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: ''
    });

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false); // State to track password visibility
    const navigate = useNavigate();

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    const handleLoginChange = (event) => {
        const { name, value } = event.target;
        setLoginData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = (event) => {
        event.preventDefault();

        // Check for correct username and password
            fetch('https://shop-maingi-server.onrender.com/userLogin', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData),
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
            })
            .catch(error => {
                console.error('Error occurred during login:', error);
            });
        
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('https://shop-maingi-server.onrender.com/userRegister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify(registerData)
            });

            if (response.ok) {
                const userData = await response.json();
                console.log('User registered successfully:', userData);
                // Redirect to login page after successful registration
                navigate('/login');
                setIsLogin(true)
            } else {
                const errorMessage = await response.json();
                console.error('Registration failed:', errorMessage);
                // Handle registration error
            }
        } catch (error) {
            console.error('Error occurred during registration:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1350px)');

    return (

        <div>
            {isMobile || isTablet ? (

                <Box>   
                    {isLogin ? (
                        <Box className='mobile'>

                        <Box display='flex' alignItems='center' mt='20px'>
                        <IconButton  sx={{ color: 'black' }}>
                            <ShoppingCart sx={{ fontSize:'50px' }} />
                        </IconButton>
                        <Typography fontWeight='bold' fontSize='40px' sx={{ cursor: 'pointer' }}>
                            MaingiCart
                        </Typography>
                        </Box>

                        <Box>
                            <Typography textAlign='center' fontSize='30px' fontWeight='bold' mb='30px'>Welcome Back!</Typography>
                            <form onSubmit={handleLogin} className='mobile-form-design'>
                                <TextField type="text" label="Username" variant='outlined' name='username' value={loginData.username} onChange={handleLoginChange} className='input-field' sx={{mb:"40px"}}/>
                                <TextField type="password" label="Password" variant='outlined' name='password' value={loginData.password} onChange={handleLoginChange} className='input-field'sx={{mb:"40px"}}/>
                                <Button variant='contained' color='black' sx={{backgroundColor:'white'}} type="submit">Login</Button>
                            </form>
                        </Box>

                        <Box>
                            <Typography fontSize="16px" sx={{cursor:'pointer'}} mb='20px' onClick={toggleAuthMode}>Don't have an account? Sign Up</Typography>
                        </Box>

                    </Box>
                    ) : (

                        <Box className='mobile'>

                        <Box display='flex' alignItems='center' mt='20px'>
                        <IconButton  sx={{ color: 'black' }}>
                            <ShoppingCart sx={{ fontSize:'50px' }} />
                        </IconButton>
                        <Typography fontWeight='bold' fontSize='40px' sx={{ cursor: 'pointer' }}>
                            MaingiCart
                        </Typography>
                        </Box>

                        <Box>
                                    <Typography textAlign='center' fontSize='30px' fontWeight='bold' mb='30px'>Create your account</Typography>
                                    <form onSubmit={handleRegisterSubmit} className='form-design'>
                                        <TextField type="text" label="Username" variant='outlined' name='username' value={registerData.username} onChange={handleRegisterChange} className='input-field' sx={{mb:"40px"}}/>
                                        <TextField type="text" label="Email" variant='outlined' name='email' value={registerData.email} onChange={handleRegisterChange} className='input-field' sx={{mb:"40px"}}/>
                                        <TextField type="text" label="Phone Number" variant='outlined' name='phone_number' value={registerData.phone_number} onChange={handleRegisterChange} className='input-field' sx={{mb:"40px"}}/>
                                        <TextField type="password" label="Password" variant='outlined' name='password' value={registerData.password} onChange={handleRegisterChange} className='input-field' sx={{mb:"40px"}}/>
                                        <TextField type="password" label="Confirm Password" variant='outlined' name='confirm_password' value={registerData.confirm_password} onChange={handleRegisterChange} className='input-field' sx={{mb:"40px"}}/>
                                        <Button variant='contained' color='black' sx={{backgroundColor:'white'}} type="submit">Sign Up</Button>
                                    </form>
                        </Box>

                        <Box>
                                    <Typography fontSize="16px" sx={{cursor:'pointer'}} mb='20px' onClick={toggleAuthMode} >Already have an account? Login</Typography>
                        </Box>

                    </Box>
                    )}

                </Box>
            ):(
            <div className={`auth-container ${isLogin ? 'login' : 'signup'}`}>
                <div className={`background ${isLogin ? 'login' : 'signup'}`} />
                <div className="form-container">
                    <div className={`form ${isLogin ? 'login-form' : 'signup-form'}`}>
                        {isLogin ? (
                            <>
                            <Box display='flex' justifyContent='space-between' flexDirection='column' alignItems='center' gap='200px'>

                                    <Box display='flex' alignItems='center'>
                                        <IconButton  sx={{ color: 'black' }}>
                                            <ShoppingCart sx={{ fontSize:'50px' }} />
                                        </IconButton>
                                        <Typography fontWeight='bold' fontSize='40px' sx={{ cursor: 'pointer' }}>
                                            MaingiCart
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography textAlign='center' fontSize='30px' fontWeight='bold' mb='30px'>Welcome Back!</Typography>
                                        <form onSubmit={handleLogin} className='form-design'>
                                            <TextField type="text" label="Username" variant='outlined' name='username' value={loginData.username} onChange={handleLoginChange} className='input-field' sx={{mb:"40px"}}/>
                                            <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                                                <TextField type={showPassword ? 'text' : 'password'} label="Password" variant='outlined' name='password' value={loginData.password} onChange={handleLoginChange} className='input-field'sx={{mb:"40px"}}/>
                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={togglePasswordVisibility}
                                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                >
                                                    {showPassword ? 'Hide' : 'Show'}
                                                </Button>
                                            </Box>
                                            <Button variant='contained' color='primary' type="submit">Login</Button>
                                        </form>
                                    </Box>

                                    <Box>
                                            <Typography fontSize="16px" sx={{cursor:'pointer'}} onClick={toggleAuthMode}>Don't have an account? Sign Up</Typography>
                                    </Box>
                            </Box>

                            </>
                        ) : (
                            <>

                            <Box display='flex' justifyContent='space-between' flexDirection='column' alignItems='center' gap='100px' className='desktop'>

                                <Box>
                                    <Box display='flex' alignItems='center'>
                                        <IconButton  sx={{ color: 'black' }}>
                                            <ShoppingCart sx={{ fontSize:'50px' }} />
                                        </IconButton>
                                        <Typography fontWeight='bold' fontSize='40px' sx={{ cursor: 'pointer' }}>
                                            MaingiCart
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography textAlign='center' fontSize='30px' fontWeight='bold' mb='30px'>Create your account</Typography>
                                    <form onSubmit={handleRegisterSubmit} className='form-design'>
                                        <TextField type="text" label="Username" variant='outlined' name='username' value={registerData.username} onChange={handleRegisterChange} className='input-field' sx={{mb:"40px"}}/>
                                        <TextField type="text" label="Email" variant='outlined' name='email' value={registerData.email} onChange={handleRegisterChange} className='input-field' sx={{mb:"40px"}}/>
                                        <TextField type="text" label="Phone Number" variant='outlined' name='phone_number' value={registerData.phone_number} onChange={handleRegisterChange} className='input-field' sx={{mb:"40px"}}/>
                                        <TextField type="password" label="Password" variant='outlined' name='password' value={registerData.password} onChange={handleRegisterChange} className='input-field' sx={{mb:"40px"}}/>
                                        <TextField type="password" label="Confirm Password" variant='outlined' name='confirm_password' value={registerData.confirm_password} onChange={handleRegisterChange} className='input-field' sx={{mb:"40px"}}/>
                                        <Button variant='contained' color='primary' type="submit">Sign Up</Button>
                                    </form>
                                </Box>

                                <Box>
                                    <Typography fontSize="16px" sx={{cursor:'pointer'}} onClick={toggleAuthMode} >Already have an account? Login</Typography>
                                </Box>

                            </Box>
        
                            </>
                        )}
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}

export default Login;
