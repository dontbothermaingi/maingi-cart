import ArrowBack from "@mui/icons-material/ArrowBack";
import { Box,Button,Divider,FormControl,IconButton,TextField, Typography, useMediaQuery} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditAddress(){
  const [formData,setFormData] = useState({
        first_name:"",
        last_name:"",
        phone_number:"",
        city:"",
        street:"",
        country:"",
  })  

  const token = localStorage.getItem('access_token');

  const navigate = useNavigate()

// Media query for responsiveness
const isMobile = useMediaQuery('(max-width: 768px)');
const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1020px)');

  useEffect(() => {
    fetch('https://maingi-shop-server.onrender.com/addressbook', {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        }, 
        credentials:'include'
    })
      .then(response => response.json())
      .then((data) => {
        setFormData({
          first_name: data[0].first_name,
          last_name: data[0].last_name,
          phone_number: data[0].phone_number,
          city: data[0].city,
          street: data[0].street,
          country: data[0].country,
        })

      });
  }, [token]);

  function handleChange(event){
    const{name,value} = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  function handleSubmit(event){
    event.preventDefault()

    fetch('https://maingi-shop-server.onrender.com/addressbook', {
      method:'PATCH',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}` // Attach token in Authorization header
      },
      body:JSON.stringify({...formData}),
      credentials:'include'
    })
    .then(response => response.json())
    .then(data => {


      console.log(data)
      setFormData({
        first_name:"",
        last_name:"",
        phone_number:"",
        city:"",
        street:"",
        country:"",
      })
    })
  }

  function handleback(){
    navigate('/useraccount')
}

  return (
    <Box>

        {isMobile || isTablet ? (
            <Box>
                <IconButton sx={{color:'black', ml:'30px'}} onClick={handleback}>
                    <ArrowBack />
                </IconButton>

                <Box margin={'20px'} marginLeft={'40px'}>
                    <Typography fontSize={'25px'} fontWeight='bold'>Edit Address</Typography>
                </Box>

                <Divider orientation="horizontal" sx={{marginLeft:'20px', marginRight:'20px', marginBottom:'30px'}}/>

                <Box display={'flex'} justifyContent={'center'}>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                                <TextField
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    label="First Name"
                                    variant="outlined"
                                    className='input-field'
                                    onChange={handleChange}
                                    sx={{mb:"40px"}}

                                />

                                <TextField
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    label="Last Name"
                                    className='input-field'
                                    variant="outlined"
                                    onChange={handleChange}
                                    sx={{mb:"40px"}}

                                />

                                <TextField
                                    type="text"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    label="Phone Number"
                                    className='input-field'
                                    variant="outlined"
                                    onChange={handleChange}
                                    sx={{mb:"40px"}}

                                />

                                <TextField
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    label="Street"
                                    className='input-field'
                                    variant="outlined"
                                    onChange={handleChange}
                                    sx={{mb:"40px"}}

                                />

                                <TextField
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    label="City"placeholder
                                    className='input-field'
                                    variant="outlined"
                                    onChange={handleChange}
                                    sx={{mb:"40px"}}
                                />

                                <TextField
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    label="Country"
                                    className='input-field'
                                    variant="outlined"
                                    onChange={handleChange}
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
                                    name="first_name"
                                    value={formData.first_name}
                                    label="First Name"
                                    variant="outlined"
                                    className='input-field'
                                    onChange={handleChange}
                                    sx={{mb:"40px"}}

                                />

                                <TextField
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    label="Last Name"
                                    className='input-field'
                                    variant="outlined"
                                    onChange={handleChange}
                                    sx={{mb:"40px"}}

                                />

                                <TextField
                                    type="text"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    label="Phone Number"
                                    className='input-field'
                                    variant="outlined"
                                    onChange={handleChange}
                                    sx={{mb:"40px"}}

                                />

                                <TextField
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    label="Street"
                                    className='input-field'
                                    variant="outlined"
                                    onChange={handleChange}
                                    sx={{mb:"40px"}}

                                />

                                <TextField
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    label="City"placeholder
                                    className='input-field'
                                    variant="outlined"
                                    onChange={handleChange}
                                    sx={{mb:"40px"}}
                                />

                                <TextField
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    label="Country"
                                    className='input-field'
                                    variant="outlined"
                                    onChange={handleChange}
                                    sx={{mb:"40px"}}

                                />

                        <Button type="submit" className="button" variant="contained" color="secondary">SAVE</Button>
                        </FormControl>
                    </form>
                </Box>
        )}

    </Box>
  );
};

export default EditAddress;
