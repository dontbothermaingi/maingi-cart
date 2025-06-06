import { Box, Button, Divider, Typography, useMediaQuery, TextField, Pagination } from "@mui/material";
import { Card, CardContent, CardActions } from '@mui/material';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const access_token = localStorage.getItem('access_token');
    const itemsPerPage = 16;

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        fetch('https://shop-maingi-server.onrender.com/products', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then((data) => {
                setProducts(data);
            });
    }, [access_token]);

    // Media query for responsiveness
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1350px)');

    function handleProductDisplay(productId) {
        navigate(`/productdisplay/${productId}`);
    }

    // Filter products based on search term
    const filteredProducts = products.filter(item =>
        item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
    const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() =>{
        fetch('https://shop-maingi-server.onrender.com/cart',{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${access_token}`
            },
            credentials:'include'
        })
        .then(response => {
            if(!response.ok){
                console.log('Failed to create Cart')
            }else{
                return response.json()
            }
        })
        .then((data) => {
            console.log(data)
        })
    },[access_token])

    return (
        <Box margin={'30px'}>
            <TextField
                variant="outlined"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ marginBottom: '20px', width: '100%' }}
            />

            {isMobile || isTablet ? (
                <Box display={'flex'} flexDirection={'column'}>
                    <Box marginLeft={'20px'}>
                        <Typography style={{fontFamily:'GT Bold'}} fontSize={'25px'}>PRODUCTS</Typography>
                    </Box>

                    <Divider orientation="horizontal" sx={{ m: '20px' }} />

                    <Box
                        display="grid"
                        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(3, 1fr)' }}
                        gridAutoRows="auto"
                        gap="20px"
                        margin="0 10px"
                    >
                        {displayedProducts.map((item, index) => (
                            <Card
                                key={index}
                                sx={{
                                    borderRadius: '15px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100vh',
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
                                    '@media (max-width:600px)': {
                                        height: '430px',
                                    },
                                }}
                            >
                                 <Box
                                    sx={{
                                        backgroundImage: `url(https://shop-maingi-server.onrender.com/${item.product_image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        borderRadius: '12px',
                                        width: '60%',
                                        height: '170px', // or dynamic
                                        cursor: 'pointer',
                                        mt:'20px'
                                    }}
                                    onClick={() => handleProductDisplay(item.id)}
                                />   

                                <CardContent sx={{ textAlign: 'center', padding: '10px', display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h8" fontWeight="bold" gutterBottom>
                                        {item.product_name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" paragraph>
                                        {item.product_description}
                                    </Typography>
                                    <Typography variant="h8" fontWeight="bold" color="primary">
                                        {new Intl.NumberFormat('en-KE',{style:'currency', currency:'KES'}).format(item.product_price)}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{ justifyContent: 'center', marginBottom: '10px' }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleProductDisplay(item.id)}
                                        sx={{
                                            borderRadius: '8px',
                                            padding: '4px 8px',
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                        }}
                                    >
                                        View Item
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>

                    {totalPages > 1 && (
                        <Box display="flex" justifyContent="center" mt="20px">
                            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
                        </Box>
                    )}
                    
                </Box>
            ) : (
                <Box display={'flex'} flexDirection={'column'}>

                    <Box marginLeft={'20px'} mt={'20px'}>
                        <Typography style={{fontFamily:'GT Bold'}} fontSize={'30px'}>PRODUCTS</Typography>
                    </Box>

                    <Divider orientation="horizontal" sx={{ m: '20px' }} />

                    <Box
                        display="grid"
                        gridTemplateColumns={'repeat(4, 1fr)'}
                        gridAutoRows="auto"
                        gap="20px"
                        margin="0 10px"
                    >
                        {displayedProducts.map((item, index) => (
                            <Card
                                key={index}
                                sx={{
                                    borderRadius: '15px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    // height: '58vh',
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
                                    '@media (max-width:600px)': {
                                        height: '150px',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundImage: `url(https://shop-maingi-server.onrender.com/${item.product_image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        borderRadius: '12px',
                                        width: '62%',
                                        height: '250px', // or dynamic
                                        cursor: 'pointer',
                                        mt:'30px'
                                    }}
                                    onClick={() => handleProductDisplay(item.id)}
                                />          

                                

                                <CardContent sx={{ textAlign: 'center', padding: '10px' }}>
                                    <Typography fontSize={"25px"} fontFamily={"GT Bold"} gutterBottom>
                                        {item.product_name}
                                    </Typography>
                                    <Typography fontFamily={"GT Regular"} color="textSecondary" paragraph>
                                        {item.product_description}
                                    </Typography>
                                    <Typography variant="h6" fontFamily={"GT Medium"} color="primary">
                                        {new Intl.NumberFormat('en-KE',{style:'currency', currency:'KES'}).format(item.product_price)}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{ justifyContent: 'center', marginBottom: '10px' }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleProductDisplay(item.id)}
                                        sx={{
                                            borderRadius: '8px',
                                            padding: '8px 16px',
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                        }}
                                    >
                                        <Typography fontFamily={"GT Bold"}>View Item</Typography>
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>

                    {totalPages > 1 && (
                        <Box display="flex" justifyContent="center" mt="20px">
                            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}

export default Dashboard;
