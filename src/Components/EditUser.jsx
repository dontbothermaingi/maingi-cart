import ArrowBack from "@mui/icons-material/ArrowBack";
import { Box, Button, Divider, FormControl, IconButton, TextField, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditUser (){

    const [formData, setFormData] = useState(({
        username:'',
        email:'',
        phone_number:'',
    }))

    // Media query for responsiveness
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1020px)');

    const navigate = useNavigate()

    const access_token = localStorage.getItem('access_token')

    useEffect(()=> {
        fetch('https://maingi-shop-server.onrender.com/userdetails', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${access_token}`,
            },
            credentials:'include'
        })
        .then(response => response.json())
        .then((data) => {
            setFormData({
                username: data.user.username,
                email: data.user.email,
                phone_number: data.user.phone_number,
            })
        })
    },[access_token])

    function handleChange(event){
        const{name,value} = event.target

        setFormData( prevFormData => ({
            ...prevFormData,
            [name]:value,
        }))
    }

    function handleSubmit(event){
        event.preventDefault()

        fetch('https://maingi-shop-server.onrender.com/userdetails', {
            method:"PATCH",
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body:JSON.stringify(formData),
            credentials:'include'
        })
        .then( response => response.json())
        .then((data) => {

            setFormData({
                username:'',
                email:'',
                phone_number:'',
            })
        })
    }

    function handleback(){
        navigate('/useraccount')
    }

    return ( 
        <Box>
            {isTablet || isMobile ? (
                <Box>
                    <IconButton sx={{color:'black', ml:'30px'}} onClick={handleback}>
                        <ArrowBack />
                    </IconButton>
                    <Box margin={'20px'} marginLeft={'40px'}>
                        <Typography fontSize={'25px'} fontWeight='bold'>Edit User</Typography>
                    </Box>

                    <Divider orientation="horizontal" sx={{marginLeft:'20px', marginRight:'20px', marginBottom:'30px'}}/>

                    <Box marginLeft={'30px'} display={'flex'} justifyContent={'center'}>
                        <form onSubmit={handleSubmit}>
                        <FormControl>
                            <TextField 
                                type="text"
                                name="username"
                                label="Username"
                                className="bill-inputfield"
                                value={formData.username}
                                variant="outlined"
                                onChange={handleChange}
                                sx={{mb:"40px"}}
            
                            />
            
                            <TextField 
                                type="text"
                                name="email"
                                label="Email"
                                className="bill-inputfield"
                                value={formData.email}
                                variant="outlined"
                                onChange={handleChange}
                                sx={{mb:"40px"}}
            
                            />
            
                            <TextField 
                                type="text"
                                name="phone_number"
                                label="Phone Number"
                                className="bill-inputfield"
                                value={formData.phone_number}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{mb:"40px"}}
            
                            />
            
                            <Button type="submit" className="button" variant="contained" color="secondary">SAVE</Button>
                            
                        </FormControl>
                        </form>
                    </Box>
                </Box>
            ):(
                <Box>
                    <form onSubmit={handleSubmit}>
                    <FormControl>
                        <TextField 
                            type="text"
                            name="username"
                            label="Username"
                            className="bill-inputfield"
                            value={formData.username}
                            variant="outlined"
                            onChange={handleChange}
                            sx={{mb:"40px"}}

                        />

                        <TextField 
                            type="text"
                            name="email"
                            label="Email"
                            className="bill-inputfield"
                            value={formData.email}
                            variant="outlined"
                            onChange={handleChange}
                            sx={{mb:"40px"}}

                        />

                        <TextField 
                            type="text"
                            name="phone_number"
                            label="Phone Number"
                            className="bill-inputfield"
                            value={formData.phone_number}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{mb:"40px"}}

                        />

                        <Button type="submit" className="button" variant="contained" color="secondary">SAVE</Button>
                        
                    </FormControl>
                    </form>
                    </Box>
                    )}
                    
                </Box>
     );
}
 
export default EditUser;