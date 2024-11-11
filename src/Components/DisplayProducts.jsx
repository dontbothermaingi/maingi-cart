import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider,IconButton,Pagination, Typography, useMediaQuery } from "@mui/material";


function DisplayProducts (){

    const access_token = localStorage.getItem('access_item')
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([])
    const itemsPerPage = 16;
    const navigate = useNavigate()

    // Media query for responsiveness
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1020px)');

    const totalPages = Math.ceil(products.length / itemsPerPage)
    const displayedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    function handleProductDisplay(productId) {
        navigate(`/productdisplay/${productId}`);
    }

    function handleProductEdit(productId){
        navigate(`/edit-product/${productId}`)
    }

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

    function handleback(){
        navigate('/useraccount')
    }

    return ( 

        <Box display='flex' flexDirection='column' margin={'20px'} mt={'0'}>
                {isMobile || isTablet ? (
                    <Box>
                        <IconButton sx={{color:'black', m:'20px'}} onClick={handleback}>
                            <ArrowBack />
                        </IconButton>
                    <Box display={'flex'} flexDirection={'column'}>
                        
                        <Box marginLeft={'20px'}>
                            <Typography fontWeight={'bold'} fontSize={'25px'}>PRODUCTS</Typography>
                        </Box>
                        <Divider orientation="horizontal" sx={{ m: '20px' }} />

                        <Box
                            display="grid"
                            gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(3, 1fr)' }}
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
                                            height: '400px',
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{ borderRadius: '12px', objectFit: 'cover', width: '70%' }}
                                        image={`https://shop-maingi-server.onrender.com${item.product_image}`}
                                        alt={item.product_name}
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
                                            onClick={() => handleProductEdit(item.id)}
                                            sx={{
                                                borderRadius: '8px',
                                                padding: '4px 8px',
                                                fontWeight: 'bold',
                                                textTransform: 'none',
                                            }}
                                        >
                                            EDIT
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
                    </Box>
                ) : (
                    <Box display={'flex'} flexDirection={'column'}>

                        <Box marginLeft={'20px'} mt={'20px'}>
                            <Typography fontWeight={'bold'} fontSize={'25px'}>PRODUCTS</Typography>
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
                                        height: '480px',
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
                                            height: '400px',
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{ borderRadius: '12px', objectFit: 'cover', width: '70%' }}
                                        image={`https://shop-maingi-server.onrender.com${item.product_image}`}
                                        alt={item.product_name}
                                        onClick={() => handleProductEdit(item.id)}
                                    />

                                    <CardContent sx={{ textAlign: 'center', padding: '10px' }}>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            {item.product_name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            {item.product_description}
                                        </Typography>
                                        <Typography variant="h6" fontWeight="bold" color="primary">
                                            {new Intl.NumberFormat('en-KE',{style:'currency', currency:'KES'}).format(item.product_price)}
                                        </Typography>
                                    </CardContent>

                                    <CardActions sx={{ justifyContent: 'center', marginBottom: '10px' }}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleProductEdit(item.id)}
                                            sx={{
                                                borderRadius: '8px',
                                                padding: '8px 16px',
                                                fontWeight: 'bold',
                                                textTransform: 'none',
                                            }}
                                        >
                                            EDIT
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
 
export default DisplayProducts;