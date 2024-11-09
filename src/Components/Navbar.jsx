import { ArrowDropDownOutlined, ArrowDropUpOutlined, ShoppingCart,} from "@mui/icons-material";
import { Badge, Box, Button, IconButton,Typography, useMediaQuery} from "@mui/material";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

function Navbar() {
    const [activeSelection, setActiveSelection] = useState(null);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access_token');
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const{carts} = useCart()

    // Media query for responsiveness
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1350px)');

    useEffect(() => {
        fetch('https://maingi-shop-server.onrender.com/check_session', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            // Check if the response indicates an error (e.g., unauthorized access)
            if (response.ok) {
                return response.json(); // Call the function to get the JSON data
            }
          })
        .then(data => {
            if (data) {  // Check if data is received
                setIsAuthenticated(true);
            }
        })
        .catch(error => {
            console.error('Error fetching session:', error);
        });
    }, [navigate, accessToken]);


    function handleDropDown(dropdown) {
        setActiveSelection(activeSelection === dropdown ? null : dropdown);
    }

    function handleCart() {
        navigate('/cart');
    }

    function handleLogin() {
        navigate('/login');
    }

    function handleAddress(){
        navigate('/useraccount')
    }

    function handleDashboard() {
        navigate('/');
    }

    function handleOrders() {
        navigate('/orders');
    } 

    const menuItems = (
        <Box display='flex' flexDirection={isMobile ? 'column' : 'row'} alignItems='center' gap={isMobile ? '20px' : '30px'}>
            <Typography fontSize='19px' onClick={() => handleDropDown('categories')} display='flex' alignItems='center'>
                Categories
                {activeSelection === 'categories' ? (
                    <ArrowDropUpOutlined />
                ) : (
                    <ArrowDropDownOutlined />
                )}
            </Typography>
            <Typography fontSize='19px' onClick={handleOrders} sx={{cursor:'pointer'}}>Orders</Typography>
        </Box>
    );

    return (
        <Box >
            
            {isMobile || isTablet ? (
                <Box display='flex' flexDirection='column'>
                    <Box display='flex' justifyContent='space-between' alignItems='center' margin='30px'>
                        <Box display='flex' alignItems='center'>
                            <IconButton onClick={handleDashboard} sx={{ color: 'black' }}>
                                <ShoppingCart sx={{ fontSize: isMobile ? '40px' : '50px' }} />
                            </IconButton>
                            <Typography fontSize={isMobile ? '25px' : '30px'} fontWeight='bold' onClick={handleDashboard} sx={{ cursor: 'pointer' }}>
                                MaingiCart
                            </Typography>
                        </Box>
                        

                        <Box>
                            {isAuthenticated ? (
                                <Box display='flex' alignItems='center' gap='10px'>
                                    <IconButton onClick={handleAddress}>
                                        <PersonOutlineOutlined sx={{ fontWeight: 'bold' }} />
                                    </IconButton>
                                    <Typography>Account</Typography>
                                </Box>
                            ) : (
                                <Button variant="contained" color="secondary" onClick={handleLogin}>
                                    Sign In
                                </Button>
                            )}
                        </Box>
                    </Box>
            
                </Box>

            
            ):(
                <Box display='flex' alignItems='center' margin='30px' justifyContent='space-between'>
                        <Box display='flex' alignItems='center'>
                            <IconButton onClick={handleDashboard} sx={{ color: 'black' }}>
                                <ShoppingCart sx={{ fontSize: isMobile ? '40px' : '50px' }} />
                            </IconButton>
                            <Typography fontSize={isMobile ? '25px' : '30px'} fontWeight='bold' onClick={handleDashboard} sx={{ cursor: 'pointer' }}>
                                MaingiCart
                            </Typography>
                        </Box>

                        <Box>
                            {menuItems}
                        </Box>

                        <Box>
                            {isAuthenticated ? (
                                <Box display='flex' alignItems='center' gap='10px'>
                                    <IconButton onClick={handleAddress}> 
                                        <PersonOutlineOutlined sx={{ fontWeight: 'bold' }} />
                                    </IconButton>
                                    <Typography>Account</Typography>
                                </Box>
                            ) : (
                                <Button variant="contained" color="secondary" onClick={handleLogin}>
                                    Sign In
                                </Button>
                            )}
                        </Box>

                        <Box display='flex' alignItems='center'>
                            <IconButton onClick={handleCart} sx={{ color: 'black' }}>
                                <Badge badgeContent={carts.cart_quantity} variant="contained" color="primary">
                                    <ShoppingCart sx={{ fontWeight: 'bold' }} />
                                </Badge>
                            </IconButton>
                            <Typography>Cart</Typography>
                        </Box>
            
                </Box>
            )}
            
        </Box>
    );
}

export default Navbar;
