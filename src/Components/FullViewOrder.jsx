import { Box, Card, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function FullViewOrder() {
    const [orders, setOrders] = useState([]);
    const [address, setAddress] = useState([]);
    const { orderId } = useParams();
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetch(`https://shop-maingi-server.onrender.com/order/${orderId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then((data) => {
                console.log("Fetched order data:", data);
                setOrders(Array.isArray(data) ? data : [data]); // Ensure data is an array
            })
            .catch(error => console.error("Error fetching order data:", error));
    }, [token, orderId]);

    useEffect(() => {
        fetch('https://shop-maingi-server.onrender.com/addressbook', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then((data) => {
                setAddress(data[0]);
            });
    }, [token]);

    return (
        <Box>
            <Box
                sx={{
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    borderRadius: "8px",
                    border: '1px solid #ccc',
                    padding: '10px',
                    margin: '30px',
                    height: 'auto', // Adjust height for responsiveness
                    overflow: 'auto',
                }}
            >
                {orders.map((order) => (
                    <Box key={order.id} display="flex" flexDirection={{ xs: 'column', md: 'row' }} marginBottom="20px">
                        <Box flex={1} marginLeft={{ xs: '0', md: '50px' }} marginRight={{ xs: '0', md: '50px' }}>

                            <Box display="flex" flexDirection="column">
                                <Box display="flex" flexDirection={{ xs: 'row', md: 'row' }} gap={'20px'} alignItems="flex-start">
                                    <Typography fontSize="40px" fontWeight="bold">Order /</Typography>
                                    <Typography fontSize="40px" fontWeight="bold"> #{order.id}</Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between" flexDirection={{ xs: 'column', md: 'row' }} margin="50px 0" gap={{xs: '20px'}}>
                                    <Box flex={1} marginRight={{ md: '10px' }}>
                                        <Typography mb="15px" fontSize="20px" fontWeight="bold">Order Summary</Typography>

                                        <Box display="flex" justifyContent="space-between" mb="15px">
                                            <Typography>Created:</Typography>
                                            <Typography>{order.order_date}</Typography>
                                        </Box>

                                        <Box display="flex" justifyContent="space-between" mb="15px">
                                            <Typography>Items Quantity:</Typography>
                                            <Typography>{order.order_quantity}</Typography>
                                        </Box>

                                        <Divider orientation="horizontal" sx={{ marginBottom: '20px', marginTop: '20px' }} />

                                        <Box>
                                            <Box display="flex" justifyContent="space-between" mb="15px">
                                                <Typography>Subtotal:</Typography>
                                                <Typography>{new Intl.NumberFormat('en-KE', {style:'currency', currency:'KES'}).format(order.order_amount)}</Typography>
                                            </Box>

                                            <Box display="flex" justifyContent="space-between" mb="63px">
                                                <Typography>Shipping:</Typography>
                                                <Typography>0</Typography>
                                            </Box>

                                            <Box display="flex" justifyContent="space-between">
                                                <Typography>Taxes:</Typography>
                                                <Typography>0</Typography>
                                            </Box>
                                        </Box>

                                        <Divider orientation="horizontal" sx={{ marginBottom: '20px', marginTop: '20px' }} />

                                        <Box>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography>Total:</Typography>
                                                <Typography>{new Intl.NumberFormat('en-KE', {currency:'KES', style:'currency'}).format(order.order_amount)}</Typography>
                                            </Box>
                                        </Box>

                                    </Box>

                                    <Divider orientation="vertical" sx={{ display: { xs: 'none', md: 'block' }, height:'auto', margin:'20px' }} />
                                    <Divider orientation="horizontal" sx={{ marginBottom: '20px', marginTop: '20px', display: { xs: 'block', md: 'none' }, }} />


                                    <Box flex={1} marginLeft={{ md: '10px' }}>
                                        <Typography mb="15px" fontSize="20px" fontWeight="bold">Payment Information</Typography>

                                        <Box>
                                            <Box display="flex" justifyContent="space-between" mb="15px">
                                                <Typography>Payment Method:</Typography>
                                                <Typography>{order.payment_method}</Typography>
                                            </Box>

                                            <Box display="flex" justifyContent="space-between" mb="15px">
                                                <Typography>Processed:</Typography>
                                                <Typography>Automatically</Typography>
                                            </Box>

                                            <Box display="flex" justifyContent="space-between" mb="15px">
                                                <Typography>Date of Processing:</Typography>
                                                <Typography>{order.order_date}</Typography>
                                            </Box>
                                        </Box>

                                        <Divider orientation="horizontal" sx={{ marginBottom: '20px', marginTop: '20px' }} />

                                        <Box>
                                            <Box display="flex" justifyContent="space-between" mb="15px">
                                                <Typography>Shipping Address:</Typography>
                                                <Box display="flex" gap="10px">
                                                    <Typography>{address.first_name}</Typography>
                                                    <Typography>{address.last_name}</Typography>
                                                </Box>
                                            </Box>

                                            <Box display="flex" justifyContent="space-between" mb="15px">
                                                <Typography></Typography>
                                                <Box justifyContent="right">
                                                    <Typography textAlign={"right"}>{address.street}</Typography>
                                                    <Typography textAlign={'right'}>{address.city}</Typography>
                                                    <Typography textAlign={'right'}>{address.country}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Divider orientation="horizontal" sx={{ marginBottom: '20px', marginTop: '20px' }} />

                                        <Box>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography>Billing Address:</Typography>
                                                <Typography>Same as Shipping Address</Typography>
                                            </Box>
                                        </Box>

                                    </Box>

                                </Box>
                            </Box>

                            <Box>
                                <Typography fontSize="20px" fontWeight="bold">Items</Typography>

                                <Box
                                    display="grid"
                                    gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(1, 1fr)' }}
                                    gridAutoRows="auto"
                                    gap="20px"
                                    margin="0 10px"
                                    overflow="auto"
                                    maxHeight="400px"
                                    sx={{ overflowY: 'auto' }}
                                >
                                    {order.products.map((product) => (
                                        <Card
                                            key={product.id} // Ensure you have a unique ID for each product
                                            sx={{
                                                borderRadius: '15px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                flexDirection:({xs:'column', md:'row'}),
                                                height: '150px',
                                                alignItems: ({md:'center'}),
                                                padding: '10px',
                                                margin: '10px',
                                                border: '1px solid black'
                                            }}
                                        >
                                            <Box display="flex" flex={{md:'1', xs:'0'}}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ borderRadius: '12px', objectFit: 'cover', width: ({xs:'30%',md:'10%'}) }}
                                                    image={`https://shop-maingi-server.onrender.com${product.product_image}`}
                                                    alt={product.product_name}
                                                />

                                                <CardContent sx={{ textAlign: 'left', padding: '10px', display: 'flex', flexDirection: 'column' }}>
                                                    <Typography variant="h8" fontWeight="bold" gutterBottom>
                                                        {product.product_name}
                                                    </Typography>
                                                    <Typography>
                                                        {product.product_description}
                                                    </Typography>
                                                </CardContent>
                                            </Box>
                                            
                                            <Box>
                                                <CardContent sx={{ textAlign: 'center', padding: '10px', mr: '30px', display: 'flex' }}>
                                                    <Typography>
                                                        {new Intl.NumberFormat('en-KE',{style:'currency', currency:'KES'}).format(product.product_price)}
                                                    </Typography>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default FullViewOrder;
