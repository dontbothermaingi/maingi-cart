import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Logout({onLogout}) {
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();  // Prevent default form submission behavior

        const token = localStorage.getItem('access_token');

        fetch('https://shop-maingi-server.onrender.com/userLogout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Attach token in Authorization header
            },
            credentials: 'include',  // Ensure cookies are sent with the request
        })
        .then(response => {
            if (response.ok) {
                // If the response is OK, parse the response and navigate
                return response.json();
            } else {
                throw new Error('Logout failed');
            }
        })
        .then(() => {
            onLogout()
            navigate('/login');  // Redirect to the login page after logout
        })
        .catch(error => {
            console.error("Error during logout:", error);
            // You can add UI feedback here, like a toast or alert, to inform the user
        });
    }

    return ( 
        <Box>
            <Button variant="contained" color="secondary" onClick={handleSubmit}>
                LOG OUT
            </Button>
        </Box>
    );
}

export default Logout;
