import { Box, Button, Card, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DisplayOrder() {
    const token = localStorage.getItem('access_token');
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");  // State to hold error messages
    const navigate = useNavigate();

    useEffect(() => {

        if (!token) {
            setError("Please log in to see your orders.");
            return;
        }

        fetch('https://shop-maingi-server.onrender.com/orderitems', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                setError('Failed to fetch orders. Please try again later.');
                return;
            }
            return response.json();
        })
        .then((data) => {
            if (data && data.length === 0) {
                setError('You have no orders.');
            } else {
                setOrders(data);
                setError('');  // Clear the error if there are orders
            }
        })
        .catch(() => {
            setError('An error occurred while fetching your orders.');
        });

    }, [token]);

    function handleOrder(orderId) {
        navigate(`/order/${orderId}`);
    }

    return (
        <Box>
            {error ? (
                <Typography fontSize={'27px'} fontStyle={'bold'} textAlign={'center'}>{error}</Typography>
            ):(
                <Box>
                <Box ml={'30px'}>
                    <Typography fontSize={'25px'} fontWeight={'bold'}>Orders</Typography>
                </Box>

                <Divider orientation="horizontal" sx={{ marginLeft: '30px', marginRight: '30px', marginBottom: '30px' }} />


                <Box
                    display="grid"
                    gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)', // 1 card per row on extra-small screens
                        sm: 'repeat(1, 1fr)', // 1 card per row on small screens
                        md: 'repeat(2, 1fr)', // 2 cards per row on medium screens
                        lg: 'repeat(2, 1fr)', // 2 cards per row on large screens
                        xl: 'repeat(2, 1fr)'  // 2 cards per row on extra-large screens
                    }}
                    gridAutoRows="auto"
                    gap="20px"
                    margin="0 10px"
                    overflow={'auto'}
                >

                {orders.map(order => (
                    <Box key={order.id}>
                        
                            <Card
                                display={'flex'}
                                flexDirection="column"
                                sx={{
                                    borderRadius: '15px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 'auto', // Adjust height for better flexibility
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    padding: '10px',
                                    margin: '30px',
                                    backgroundColor: '#fff',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.03)',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                    },
                                }}
                            >
                                {/* Upper Part */}
                                <Box display={'flex'} justifyContent={'space-between'} margin={'20px'}>
                                    <Box>
                                        <Typography>Order ID</Typography>
                                        <Typography>#{order.id}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography>{order.order_date}</Typography>
                                    </Box>
                                </Box>

                                <Divider orientation="horizontal" sx={{ mb: '20px' }} />

                                {/* Middle Part */}
                                <Box
                                    display="grid"
                                    gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }}
                                    gridAutoRows="auto"
                                    gap="20px"
                                    margin="0 10px"
                                    overflow={'auto'}
                                    maxHeight="400px" // Adjust max height and enable scrolling
                                    sx={{ overflowY: 'auto' }}
                                >
                                    {order.products && order.products.map(product => (
                                        <Box key={product.product_id}>
                                            <Card
                                                sx={{
                                                    borderRadius: '15px',
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    height: '100px',
                                                    alignItems: 'center',
                                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                                    padding: '10px',
                                                    margin: '10px',
                                                    backgroundColor: '#fff',
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.03)',
                                                        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                                    },
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    sx={{ borderRadius: '12px', objectFit: 'cover', width: '20%' }}
                                                    image={`https://shop-maingi-server.onrender.com${product.product_image}`}
                                                    alt={product.product_name}
                                                />

                                                <CardContent sx={{ textAlign: 'center', padding: '10px', display: 'flex', flexDirection: 'column' }}>
                                                    <Typography variant="h8" fontWeight="bold" gutterBottom>
                                                        {product.product_name}
                                                    </Typography>
                                                    <Box display={'flex'} gap={'5px'}>
                                                        <Typography>
                                                            {new Intl.NumberFormat('en-KE',{currency:'KES', style:'currency'}).format(product.product_price)} 
                                                        </Typography>
                                                        <Typography color="grey">
                                                            x{product.quantity}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    ))}
                                </Box>

                                <Divider orientation="horizontal" sx={{ mb: '20px' }} />

                                {/* Bottom Part */}
                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} marginLeft={'20px'} marginRight={'20px'}>
                                    <Box display={'flex'} gap={'5px'}>
                                        <Typography>{new Intl.NumberFormat('en-KE',{currency:'KES', style:'currency'}).format(order.order_amount || 0)}</Typography>
                                        <Typography color="grey">({order.order_quantity || 0} items)</Typography>
                                    </Box>
                                    <Box>
                                        <Button variant="contained" color="secondary" onClick={() => handleOrder(order.id)}>Details</Button>
                                    </Box>
                                </Box>
                                
                            </Card>
                    </Box>

                ))}
            </Box>
                
                </Box>
            )}
            
        </Box>
    );
}

export default DisplayOrder;
