import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

function Cart() {
    const navigate = useNavigate()

    const isMobile = useMediaQuery('(max-width: 768px)');

    const { handleDelete, handleDecrement, handleIncrement, cart} = useCart()    

    function handleOrder(){
        navigate('/order')
    }

    return ( 
        <Box>
            {cart.products.length === 0 ? ( 
                <Typography fontSize={'30px'} textAlign={'center'} fontWeight={'bold'}>Your cart is empty.</Typography>
            ) : (

                <Box>
                    {isMobile ? (
                        <Box display={'flex'} flexDirection={'column'}>
                        <Box 
                            sx={{
                                backgroundColor: 'white',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                borderRadius: "8px",
                                border: '1px solid #ccc'
                            }}  
                            display='flex' 
                            flexDirection={'column'} 
                            padding='10px' 
                            gap='20px' 
                            margin={'30px'} 
                            height={'77vh'} 
                            overflow={'auto'}
                        >
                            <Typography fontSize={'25px'} fontWeight={'bold'} ml={'20px'} mt={'20px'}>Cart</Typography>
    
                            <Divider orientation="horizontal"/>
    
                            <Box
                                display="grid"
                                gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(3, 1fr)' }}
                                gridAutoRows="auto"
                                gap="20px"
                                margin="0 10px"
                            >
                                {cart.products.map((item) => (
                                    <Card
                                        key={item.product_id}
                                        sx={{
                                            borderRadius: '15px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '300px',
                                            alignItems: 'center',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                            padding: '10px',
                                            backgroundColor: '#fff',
                                            transition: 'transform 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.03)',
                                                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                            },
                                            '@media (max-width:600px)': {
                                                height: '370px',
                                            },
                                        }}
                                    >
                                                <CardMedia
                                                    component="img"
                                                    sx={{ borderRadius: '12px', objectFit: 'cover', width: '70%',  }}
                                                    image={`${item.product_image}`} // Ensure this matches your backend setup} // Adjust the path if needed
                                                    alt="Sony Headphones"
                                                />
    
                                                <CardContent sx={{ textAlign: 'center', padding: '10px', display:'flex', flexDirection:'column' }}>
                                                    <Typography variant="h8" fontWeight="bold" gutterBottom>
                                                        {item.product_name}
                                                    </Typography>
                                                    <Typography >
                                                        {new Intl.NumberFormat('en-KE', {style:'currency', currency:'KES'}).format(item.product_price)}
                                                    </Typography>
                                                    <Typography  color="red">
                                                        Only {item.product_quantity} left in stock.
                                                    </Typography>
                                                    
                                                </CardContent>
    
                                                <CardActions sx={{ justifyContent: 'center', marginBottom: '10px', display:'flex', flexDirection:'column' }}>
                                                            <Box
                                                                display="flex"
                                                                alignItems="center"
                                                                justifyContent="center"
                                                                sx={{
                                                                border: "1px solid #ccc",
                                                                borderRadius: "8px",
                                                                padding: "5px",
                                                                mb: "30px",
                                                                }}
                                                            >
                                                                <Button
                                                                    variant="outlined"
                                                                    
                                                                    onClick={() => handleDecrement(item.product_id, item.quantity)}
                                                                    sx={{
                                                                        minWidth: "40px",
                                                                        borderColor: "#d32f2f",
                                                                        color: "#d32f2f",
                                                                        "&:hover": {
                                                                        backgroundColor: "#ffe6e6",
                                                                        borderColor: "#d32f2f",
                                                                        },
                                                                    }}
                                                                >
                                                                -
                                                                </Button>
    
                                                                <Typography variant="h6" sx={{ mx: 2 }}>
                                                                    {item.quantity}
                                                                </Typography>
    
                                                                <Button
                                                                    variant="outlined"
                                                                    onClick={() => handleIncrement(item.product_id, item.quantity)}
                                                                    sx={{
                                                                        minWidth: "40px",
                                                                        borderColor: "#4caf50",
                                                                        color: "#4caf50",
                                                                        "&:hover": {
                                                                        backgroundColor: "#e6f7e6",
                                                                        borderColor: "#4caf50",
                                                                        },
                                                                    }}
                                                                >
                                                                +
                                                                </Button>
                                                            </Box>
    
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            sx={{
                                                                borderRadius: '8px',
                                                                padding: '8px 16px',
                                                                fontWeight: 'bold',
                                                                textTransform: 'none',
                                                            }}
                                                            onClick={() => handleDelete(item.product_id)}
                                                        >
                                                            REMOVE ITEM
                                                        </Button>
                                                </CardActions>
                                    </Card>
                                ))}
                            </Box>
                        </Box>
    
                        <Box 
                            sx={{
                                backgroundColor: 'white',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                borderRadius: "8px",
                                border: '1px solid #ccc'
                            }}  
                            display='flex' 
                            flexDirection={'column'} 
                            padding='10px' 
                            gap='20px' 
                            margin={'30px'} 
                            overflow={'auto'}
                        >
                            <Typography fontSize={'25px'} fontWeight={'bold'} ml={'20px'} mt={'20px'}>CART SUMMARY</Typography>
    
                            <Divider orientation="horizontal"/>
    
                            <Typography fontSize={'20px'} ml={'20px'} mt={'20px'}>Subtotal: {new Intl.NumberFormat('en-KE',{style:'currency', currency:'KES'}).format(cart.cart_amount)}</Typography>

                            <Button variant="contained" color="secondary" onClick={handleOrder}>Checkout</Button>
                        </Box>
                        </Box>
                    ):(
                        <Box display={'flex'}>
                        <Box 
                            sx={{
                                backgroundColor: 'white',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                borderRadius: "8px",
                                border: '1px solid #ccc'
                            }}  
                            display='flex' 
                            flexDirection={'column'} 
                            padding='10px' 
                            gap='20px' 
                            margin={'30px'} 
                            height={'77vh'} 
                            overflow={'auto'}
                        >
                            <Typography fontSize={'25px'} fontWeight={'bold'} ml={'20px'} mt={'20px'}>Cart</Typography>
    
                            <Divider orientation="horizontal"/>
    
                            <Box
                                display="grid"
                                gridTemplateColumns={'repeat(2, 1fr)'}
                                gridAutoRows="auto"
                                gap="20px"
                                margin="0 10px"
                            >
                                {cart.products.map((item) => (
                                    <Card
                                        key={item.product_id}
                                        sx={{
                                            borderRadius: '15px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '360px',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                            padding: '10px',
                                            backgroundColor: '#fff',
                                            transition: 'transform 0.3s ease-in-out',
                                            '&:hover': {
                                            transform: 'scale(1.03)',
                                            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                            },
                                        }}
                                    >
                                        <Box display={'flex'} alignItems={'center'} margin={'20px'}>
                                            <Box>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ borderRadius: '12px', objectFit: 'cover', width: '70%' }}
                                                    image={`${item.product_image}`}
                                                    alt={`${item.product_name}`}
                                                />
                                            </Box>
    
                                            <Box>
                                                <CardContent sx={{ textAlign: 'center', padding: '10px', }}>
                                                    <Typography variant="h6" fontWeight="bold" gutterBottom textAlign={'left'}>
                                                        {item.product_name}
                                                    </Typography>
                                                    <Typography textAlign={'left'}>
                                                        {new Intl.NumberFormat('en-KE', {style:'currency', currency:'KES'}).format(item.product_price)}
                                                    </Typography>
                                                    <Typography textAlign={'left'} color="red">
                                                        Only {item.product_quantity} left in stock.
                                                    </Typography>
                                                    
                                                </CardContent>
    
                                                <CardActions>
                                                    <Box display={'flex'} flexDirection={'column'}>
                                                        <Box display={"flex"} flexDirection={"column"}>
                                                            <Box
                                                                display="flex"
                                                                alignItems="center"
                                                                justifyContent="center"
                                                                sx={{
                                                                width: "180px",
                                                                border: "1px solid #ccc",
                                                                borderRadius: "8px",
                                                                padding: "5px",
                                                                mb: "30px",
                                                                }}
                                                            >
                                                                <Button
                                                                    variant="outlined"
                                                                    onClick={() => handleDecrement(item.product_id, item.quantity)}
                                                                    sx={{
                                                                        minWidth: "40px",
                                                                        borderColor: "#d32f2f",
                                                                        color: "#d32f2f",
                                                                        "&:hover": {
                                                                        backgroundColor: "#ffe6e6",
                                                                        borderColor: "#d32f2f",
                                                                        },
                                                                    }}
                                                                >
                                                                -
                                                                </Button>
    
                                                                <Typography variant="h6" sx={{ mx: 2 }}>
                                                                    {item.quantity}
                                                                </Typography>
    
                                                                <Button
                                                                    variant="outlined"
                                                                    onClick={() => handleIncrement(item.product_id, item.quantity)}
                                                                    sx={{
                                                                        minWidth: "40px",
                                                                        borderColor: "#4caf50",
                                                                        color: "#4caf50",
                                                                        "&:hover": {
                                                                        backgroundColor: "#e6f7e6",
                                                                        borderColor: "#4caf50",
                                                                        },
                                                                    }}
                                                                >
                                                                +
                                                                </Button>
                                                            </Box>
                                                        </Box>
    
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            sx={{
                                                                borderRadius: '8px',
                                                                padding: '8px 16px',
                                                                fontWeight: 'bold',
                                                                textTransform: 'none',
                                                            }}
                                                            onClick={() => handleDelete(item.product_id)}
                                                        >
                                                            REMOVE ITEM
                                                        </Button>
                                                    </Box>
                                                </CardActions>
                                            </Box>
                                        </Box>
                                    </Card>
                                ))}
                            </Box>
                        </Box>
    
                        <Box 
                            sx={{
                                backgroundColor: 'white',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                borderRadius: "8px",
                                border: '1px solid #ccc'
                            }}  
                            display='flex' 
                            flexDirection={'column'} 
                            padding='10px' 
                            gap='20px' 
                            margin={'30px'} 
                            ml={'1px'}
                            height={'77vh'} 
                            overflow={'auto'}
                            width={'1050px'}
                        >
                            <Typography fontSize={'25px'} fontWeight={'bold'} ml={'20px'} mt={'20px'}>CART SUMMARY</Typography>
    
                            <Divider orientation="horizontal"/>
    
                            <Typography fontSize={'20px'} ml={'20px'} mt={'20px'}>Subtotal: {new Intl.NumberFormat('en-KE',{currency:'KES', style:'currency'}).format(cart.cart_amount)}</Typography>

                            <Button variant="contained" color="secondary" onClick={handleOrder}>Checkout</Button>
                        </Box>
                        </Box>
                    )}
                </Box>
    
            )}
        </Box>
    );
}

export default Cart;
