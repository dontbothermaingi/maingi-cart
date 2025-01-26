import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

function Homepage (){

    const navigate = useNavigate()

    function handleDashboard(){
        navigate("/dashboard")
    }
    return ( 
        <Box display={'flex'} flexDirection={"column"}>
            <Box margin={"auto"}>
                <Typography fontFamily={"GT Bold"} textAlign={"center"} fontSize={'30px'}>Find what you are looking for.</Typography>
                <Typography fontFamily={"GT Regular"} textAlign={"center"} fontSize={'20px'}>We offer a wide range of products</Typography>
            </Box>

            <Box display={'flex'} justifyContent={'flex-end'}>
                <Button variant="contained" style={{backgroundColor:'black'}} onClick={handleDashboard}><Typography fontFamily={"GT Bold"}>Shop</Typography></Button>
            </Box>
           
        </Box>
     );
}
 
export default Homepage;