import { Box,Button,FormControl,TextField} from "@mui/material";
import { useState } from "react";

function CustomerAddress(){
  const [formData,setFormData] = useState({
        first_name:"",
        last_name:"",
        phone_number:"",
        city:"",
        street:"",
        country:"",
  })  

  const token = localStorage.getItem('access_token');


  function handleChange(event){
    const{name,value} = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  function handleSubmit(event){
    event.preventDefault()

    fetch('/addressbook', {
      method:'POST',
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

  return (
    <Box>
                
                <form className='mobile-form-design' onSubmit={handleSubmit}>
                  <FormControl>
                    <Box display='flex' gap='20px'>
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
                    </Box>

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

                    <Button type="submit" className="button" variant="contained" color="tertiary">SAVE</Button>
                    </FormControl>
                </form>
    </Box>
  );
};

export default CustomerAddress;
