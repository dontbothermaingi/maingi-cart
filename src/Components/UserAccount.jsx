import React, { useEffect, useState } from 'react';
import Person2Outlined from "@mui/icons-material/Person2Outlined";
import ShoppingBagTwoTone from "@mui/icons-material/ShoppingBagTwoTone";
import { Box, Button,Divider, IconButton,Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InboxIcon from '@mui/icons-material/Inbox';
import AccountInfo from './AccountInfo';
import EditUser from './EditUser';
import EditAddress from './EditAddress';
import CreateProduct from './CreateProduct';
import DisplayOrder from './DisplayOrder'
import DisplayProducts from './DisplayProducts';

function UserAccount({ onLogout }) {
    const navigate = useNavigate();
    const [selectedMenuItem, setSelectedMenuItem] = useState('Account Information'); // State to track selected menu item
    const access_token = localStorage.getItem('access_item')


    // Media query for responsiveness
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1020px)');

    useEffect(() => {
        fetch('https://shop-maingi-server.onrender.com/products', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then((data) => {
            });
    }, [access_token]);

    function handleSubmit(event) {
        event.preventDefault();

        const token = localStorage.getItem('access_token');
        fetch('https://shop-maingi-server.onrender.com/userLogout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Logout failed');
                }
            })
            .then(() => {
                onLogout();
                navigate('/login');
            })
            .catch(error => {
                console.error("Error during logout:", error);
            });
    }

    // Function to render the content based on selected menu item
    function renderContent() {
        switch (selectedMenuItem) {
            case 'Account Information':
                return (
                <Box display='flex' flexDirection='column'>
                    <Box mb='10px'>
                        <Typography fontSize={'25px'}>Account Overview</Typography>
                    </Box>

                    <Divider orientation='horizontal' sx={{mb:'20px'}}/>

                    <AccountInfo />
                    {/* <Button variant='contained' color='secondary' onClick={() => setSelectedMenuItem('Address Book')} sx={{marginTop:'20px'}}>
                        Edit Address
                    </Button> */}
                </Box>
                )
            case 'Inbox':
                return <Typography>Here are your orders...</Typography>;
            case 'Orders':
                return (
                    <DisplayOrder />
            )
            case 'Account Management':
                return (
                    <Box display='flex' flexDirection='column'>
                        <Box mb='10px'>
                            <Typography fontSize={'25px'}>Account Details</Typography>
                        </Box>

                        <Divider orientation='horizontal' sx={{mb:'20px'}}/>

                        <EditUser />
                    </Box>
                )
            case 'Address Book':
                return (
                        <Box display='flex' flexDirection='column'>
                            <Box mb='10px'>
                                <Typography fontSize={'25px'}>Address Details</Typography>
                            </Box>
    
                            <Divider orientation='horizontal' sx={{mb:'20px'}}/>
    
                            <EditAddress />
                        </Box>
                    )
            case 'Create Product':
                return (
                    <Box display='flex' flexDirection='column'>
                            <Box mb='10px'>
                                <Typography fontSize={'25px'}>New Product</Typography>
                            </Box>
            
                            <Divider orientation='horizontal' sx={{mb:'20px'}}/>
            
                                <CreateProduct />
                    </Box>
                    )
            case 'Edit Product':
                return (
                        <DisplayProducts/>
                    )

            default:
                return null;
        }
    }

    function handleaccountinfo(){
        navigate('/accountinfo')
    }

    function handleuseredit(){
        navigate('/edituser')
    }

    function handleaddressedit(){
        navigate('/editaddress')
    }

    function handleProducts(){
        navigate('/products')
    }

    function handleCreateProduct(){
        navigate('/createproduct')
    }

    return (
        <Box >

            {isMobile || isTablet ? (
                <Box sx={{
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    borderRadius: "8px",
                    border: '1px solid #ccc'
                    }} 
                    width='auto' 
                    display='flex' 
                    flexDirection={'column'} 
                    height={'100%'} 
                    padding='10px' 
                    gap='20px' 
                    margin={'20px'}
                >
                    {/* Account Information Menu Item */}
                    <Box display='flex' alignItems='center' onClick={handleaccountinfo} sx={{ cursor: 'pointer' }}>
                        <IconButton color="black">
                            <Person2Outlined />
                        </IconButton>
                        <Typography fontSize='20px'>Account Information</Typography>
                    </Box>

                    {/* Orders Menu Item */}
                    <Box display='flex' alignItems='center' onClick={() => setSelectedMenuItem('Orders')} sx={{ cursor: 'pointer' }}>
                        <IconButton color="black">
                            <ShoppingBagTwoTone />
                        </IconButton>
                        <Typography fontSize='20px'>Orders</Typography>
                    </Box>

                    {/* Inbox Menu Item */}
                    <Box display='flex' alignItems='center' onClick={() => setSelectedMenuItem('Inbox')} sx={{ cursor: 'pointer' }}>
                        <IconButton color="black">
                            <InboxIcon />
                        </IconButton>
                        <Typography fontSize='20px'>Inbox</Typography>
                    </Box>

                    <Divider orientation='horizontal'/>

                    {/* Account Management */}
                    <Box display='flex' alignItems='center' onClick={handleuseredit} sx={{ cursor: 'pointer' }}>
                        <IconButton color="black">
                        </IconButton>
                        <Typography fontSize='19px'>Account Management</Typography>
                    </Box>

                    {/* Address Book */}
                    <Box display='flex' alignItems='center' onClick={handleaddressedit} sx={{ cursor: 'pointer' }}>
                        <IconButton color="black">
                        </IconButton>
                        <Typography fontSize='19px'>Edit Address</Typography>
                    </Box>

                    {/* Create Product */}
                    <Box display='flex' alignItems='center'  onClick={handleCreateProduct} sx={{ cursor: 'pointer' }}>
                        <IconButton color="black">
                        </IconButton>
                        <Typography fontSize='19px'>Create Product</Typography>
                    </Box>

                    {/* Edit Product */}
                    <Box display='flex' alignItems='center'  onClick={handleProducts} sx={{ cursor: 'pointer' }}>
                        <IconButton color="black">
                        </IconButton>
                        <Typography fontSize='19px'>Edit Product</Typography>
                    </Box>

                    <Button variant="contained" color="secondary" onClick={handleSubmit}>
                        LOG OUT
                    </Button>
                </Box>

            ) : (
                <Box display='flex' height='80vh' padding='20px' gap='20px'>
                {/* Left Side: Menu */}
                <Box sx={{
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    borderRadius: "8px",
                    border: '1px solid #ccc'
                }} width='250px' display='flex' flexDirection={'column'} padding='10px' gap='20px'>
                    {/* Account Information Menu Item */}
                    <Box display='flex' alignItems='center' onClick={() => setSelectedMenuItem('Account Information')} sx={{ cursor: 'pointer' }}>
                        <IconButton color="black">
                            <Person2Outlined />
                        </IconButton>
                        <Typography fontSize='20px'>Account Information</Typography>
                    </Box>

                    {/* Orders Menu Item */}
                    <Box display='flex' alignItems='center' onClick={() => setSelectedMenuItem('Orders')} sx={{ cursor: 'pointer' }}>
                        <IconButton color="black">
                            <ShoppingBagTwoTone />
                        </IconButton>
                        <Typography fontSize='20px'>Orders</Typography>
                    </Box>

                    {/* Inbox Menu Item */}
                    <Box display='flex' alignItems='center' onClick={() => setSelectedMenuItem('Inbox')} sx={{ cursor: 'pointer' }}>
                        <IconButton color="black">
                            <InboxIcon />
                        </IconButton>
                        <Typography fontSize='20px'>Inbox</Typography>
                    </Box>

                    <Divider orientation='horizontal'/>

                    {/* Account Management */}
                    <Box display='flex' alignItems='center' onClick={() => setSelectedMenuItem('Account Management')} sx={{ cursor: 'pointer' }}>
                        <IconButton color="black">
                        </IconButton>
                        <Typography fontSize='19px'>Account Management</Typography>
                    </Box>

                    {/* Address Book */}
                    <Box display='flex' alignItems='center' onClick={() => setSelectedMenuItem('Address Book')} sx={{ cursor: 'pointer' }}>
                        <IconButton color="black">
                        </IconButton>
                        <Typography fontSize='19px'>Edit Address</Typography>
                    </Box>

                    {/* Create Product */}
                    <Box display='flex' alignItems='center'  onClick={() => setSelectedMenuItem('Create Product')} sx={{ cursor: 'pointer' }}>
                        <IconButton color="black">
                        </IconButton>
                        <Typography fontSize='19px'>Create Product</Typography>
                    </Box>

                    {/* Edit Product */}
                    <Box display='flex' alignItems='center'  onClick={() => setSelectedMenuItem('Edit Product')} sx={{ cursor: 'pointer' }}>
                        <IconButton color="black">
                        </IconButton>
                        <Typography fontSize='19px'>Edit Product</Typography>
                    </Box>

                    <Button variant="contained" color="secondary" onClick={handleSubmit}>
                        LOG OUT
                    </Button>
                </Box>

                {/* Right Side: Display Content Based on Selected Menu Item */}
                <Box sx={{
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    borderRadius: "8px",
                    border: '1px solid #ccc',
                    padding: '20px',
                    flex: '1',
                    overflow:"auto"
                }}>
                    {renderContent()}
                </Box>
                
                </Box>

            )}
        </Box>
    );
}

export default UserAccount;
