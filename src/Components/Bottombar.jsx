import { Box, IconButton, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import Favorite from "@mui/icons-material/Favorite";
import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";
import { useNavigate} from "react-router-dom";
import { Badge} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Example cart icon
import { useCart } from "./CartContext";


function Bottombar(){

    const {carts} = useCart()

    const navigate = useNavigate()

    function handleCart() {
        navigate('/cart');
    }

    function handleDashboard() {
        navigate('/');
    }

    function handleOrders() {
        navigate('/orders');
    }    

    return ( 
        <Box display='flex' alignItems='center' justifyContent='space-between' margin='10px'>
            <Typography display='flex' flexDirection='column' alignItems='center'>
                <IconButton onClick={handleDashboard}>
                    <HomeIcon />
                </IconButton>
                Home
            </Typography>

            <Typography display='flex' flexDirection='column' alignItems='center'>
                <IconButton>
                    <Inventory2Outlined />
                </IconButton>
                Catalog
            </Typography>

            <Typography display='flex' flexDirection='column' alignItems='center'>
            <IconButton onClick={handleCart}>
                <Badge badgeContent={carts.cart_quantity} color="primary">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
                Cart
            </Typography>

            <Typography display='flex' flexDirection='column' alignItems='center'>
                <IconButton>
                    <Favorite />
                </IconButton>
                Favourite
            </Typography>

            <Typography display='flex' flexDirection='column' alignItems='center'>
                <IconButton onClick={handleOrders}>
                    <ReceiptLongOutlined />
                </IconButton>
                Orders
            </Typography>

        </Box>
     );
}
 
export default Bottombar;