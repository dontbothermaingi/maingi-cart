import { Box, Divider, IconButton, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import Edit from "@mui/icons-material/Edit";
import CustomerAddress from "./CustomerAddress";
import { useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";

function AccountInfo() {
    const [accountInfo, setAccountInfo] = useState(null); // Initialize as null for an object
    const [accountAdress, setAccountAddress] = useState(null); // Initialize as null for an object
    const access_token = localStorage.getItem('access_token');

    const navigate = useNavigate()

    // Media query for responsiveness
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1020px)');

    useEffect(() => {
        fetch('https://maingi-shop-server.onrender.com/userdetails', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
            credentials: 'include'
        })
        .then(response => response.json())
        .then((data) => {
            console.log("Fetched data:", data);  // Debug: log the fetched data
            setAccountInfo(data.user);  // Set the user object data
        })
        .catch(error => console.error("Error fetching data:", error));
    }, [access_token]);

    useEffect(() => {
        fetch('https://maingi-shop-server.onrender.com/addressbook', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
            credentials: 'include'
        })
        .then(response => response.json())
        .then((data) => {
            console.log("Fetched data:", data);  // Debug: log the fetched data
            setAccountAddress(data[0]);  // Set the user object data
        })
        .catch(error => console.error("Error fetching data:", error));
    }, [access_token]);

    function handleback(){
        navigate('/useraccount')
    }

    return (
        <Box>
            {isMobile || isTablet ? (
                <Box>
                    <Box>
                        <Box>
                            <IconButton onClick={handleback} sx={{color:'black', ml:'30px'}}>
                                <ArrowBack />
                            </IconButton>
                        </Box>

                        <Box margin={'20px'} marginLeft={'40px'}>
                            <Typography fontSize={'25px'} fontWeight={'bold'}>Account Information</Typography>
                        </Box>

                        <Divider orientation="horizontal" sx={{marginLeft:'20px', marginRight:'20px'}}/>

                        {accountInfo ? (  // Ensure the data is loaded before rendering
                        <Box sx={{
                            backgroundColor: 'white',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            borderRadius: "8px",
                            border: '1px solid #ccc'
                        }} width='auto' display='flex' flexDirection={'column'} padding='10px' gap='20px' mb={'20px'} margin={'30px'}>
                            <motion.div>
                                <motion.h4>Username: {accountInfo.username || "Not available"}</motion.h4>
                                <motion.h4>Email: {accountInfo.email || "Not available"}</motion.h4>
                                <motion.h4>Phone Number: {accountInfo.phone_number || "Not available"}</motion.h4>
                            </motion.div>
                        </Box>
                        ) : (
                            <Typography>Loading...</Typography>
                        )}
            
                        {accountAdress ? (  // Ensure the data is loaded before rendering
                        <Box sx={{
                            backgroundColor: 'white',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            borderRadius: "8px",
                            border: '1px solid #ccc'
                        }} width='auto' display='flex' flexDirection={'column'} padding='10px' gap='20px' margin={'30px'}>
                            <motion.div>
                                <Box display={'flex'} justifyContent={'space-between'}>
                                    <Typography fontSize={'20px'} mt={'10px'}>Your default shipping address:</Typography>
                                    <IconButton sx={{color:'black'}}>
                                        <Edit />
                                    </IconButton>
                                </Box>
                                <motion.h4>Street: {accountAdress.street || "Not available"}</motion.h4>
                                <motion.h4>City: {accountAdress.city || "Not available"}</motion.h4>
                                <motion.h4>Country: {accountAdress.country || "Not available"}</motion.h4>
                            </motion.div>
                        </Box>
                        ) : (
                            <Box>
                                <Typography>Create Address</Typography>
                                <CustomerAddress />
                            </Box>
                        )}
        
                    </Box>
                </Box>
            ):(
                <Box>
                    {accountInfo ? (  // Ensure the data is loaded before rendering
                    <Box sx={{
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        borderRadius: "8px",
                        border: '1px solid #ccc'
                    }} width='auto' display='flex' flexDirection={'column'} padding='10px' gap='20px' mb={'20px'}>
                        <motion.div>
                            <motion.h4>Username: {accountInfo.username || "Not available"}</motion.h4>
                            <motion.h4>Email: {accountInfo.email || "Not available"}</motion.h4>
                            <motion.h4>Phone Number: {accountInfo.phone_number || "Not available"}</motion.h4>
                        </motion.div>
                    </Box>
                    ) : (
                        <Typography>Loading...</Typography>
                    )}

                    {accountAdress ? (  // Ensure the data is loaded before rendering
                    <Box sx={{
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        borderRadius: "8px",
                        border: '1px solid #ccc'
                    }} width='auto' display='flex' flexDirection={'column'} padding='10px' gap='20px'>
                        <motion.div>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Typography fontSize={'20px'} mt={'10px'}>Your default shipping address:</Typography>
                                <IconButton sx={{color:'black'}}>
                                    <Edit />
                                </IconButton>
                            </Box>
                            <motion.h4>Street: {accountAdress.street || "Not available"}</motion.h4>
                            <motion.h4>City: {accountAdress.city || "Not available"}</motion.h4>
                            <motion.h4>Country: {accountAdress.country || "Not available"}</motion.h4>
                        </motion.div>
                    </Box>
                    ) : (
                        <Box>
                            <Typography>Create Address</Typography>
                            <CustomerAddress />
                        </Box>
                    )}

                </Box>
            )}
    
        </Box>
    );
}

export default AccountInfo;
