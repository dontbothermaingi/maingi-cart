import { Box, Button, Divider, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

function ProductDisplay() {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const { productId } = useParams();
    const access_token = localStorage.getItem('access_token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  // State to hold error messages
    const { addToCart } = useCart();
    const navigate = useNavigate();  // To redirect to login if necessary

    const [cartData, setCartData] = useState({
        product_id: productId,
        quantity: quantity,
    });

    useEffect(() => {
        setCartData(prevCartData => ({
            ...prevCartData,
            product_id: productId,
            quantity: quantity,
        }));
    }, [quantity, productId]);

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        addToCart()

        if (!access_token) {
            setError("Please log in to add items to the cart.");
            setLoading(false);
            return;
        }

        fetch('/cartitems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(cartData),
            credentials: 'include'
        })
        .then(response => {
            setLoading(false);
            if (response.status === 401) {
                setError("You must be logged in to add items to the cart.");
                navigate('/login');  // Redirect to login page
                return;
            }
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Network response was not ok: ${text}`);
                });
            }
            return response.json();
        })
        .then((data) => {
            console.log("Added to cart:", data);
        })
        .catch((error) => {
            console.error("Error adding to cart:", error);
            setError("An error occurred while adding to the cart.");
        });
    }

    const isMobile = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        if (!access_token) {
            setError("Please log in to view product details.");
            return;
        }

        fetch(`/product/${productId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
            credentials: 'include'
        })
        .then(response => {
            if (response.status === 401) {
                setError("You must be logged in to view this product.");
                navigate('/login');  // Redirect to login page
                return;
            }
            return response.json();
        })
        .then((data) => {
            setProduct(data);
        })
        .catch((error) => {
            console.error("Error fetching product:", error);
            setError("An error occurred while fetching product details.");
        });
    }, [access_token, productId, navigate]);

    function handleIncrement() {
        setQuantity(prevQuantity => prevQuantity + 1);
    }

    function handleDecrement() {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6">{error}</Typography>
            </Box>
        );
    }

    if (!product) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6">Loading product details...</Typography>
            </Box>
        );
    }

  return (

    <Box>

        {isMobile ? (
            <Box>
            <Box display={"flex"} justifyContent={"center"} gap={"50px"} flexWrap="wrap" padding={"40px"}>
                {/* Image Side */}
                <Box
                    sx={{
                    backgroundColor: "#f2f0f0",
                    borderRadius: "8px",
                    padding: "20px",
                    boxSizing: "border-box",
                    maxHeight: "700px",
                    }}
                >
                    <img
                    src={product.product_image}
                    alt="headphones"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                </Box>

                {/* Product Info Side */}
                <Box display={"flex"} flexDirection={"column"} maxWidth={"400px"} >
                    {/* Product Title and Description */}
                    <Box mb={"30px"}>
                    <Typography fontSize={"35px"} fontWeight={"bold"}>
                        {product.product_name}
                    </Typography>
                    <Typography color={"#555"}>
                        {product.product_description}      
                    </Typography>
                    </Box>

                    <Divider orientation="horizontal" sx={{ mb: "30px" }} />

                    {/* Price Section */}
                    <Typography fontSize={"30px"} fontWeight={"bold"} color={"#d32f2f"} mb={"30px"}>
                        {new Intl.NumberFormat('en-KE', {style:'currency', currency:'KES'}).format(product.product_price)}
                    </Typography>

                    <Divider orientation="horizontal" sx={{ mb: "30px" }} />

                    {/* Quantity Selector & Buttons */}

                    {/* Quantity Section */}
                    <Typography fontSize={"20px"} fontWeight={"bold"} mb={"30px"}>
                        Only {product.product_quantity} left in stock
                    </Typography>
                    <Box display={"flex"} flexDirection={"column"}>
                    {/* Quantity Selector */}
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
                        onClick={handleDecrement}
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
                        {quantity}
                        </Typography>

                        <Button
                        variant="outlined"
                        onClick={handleIncrement}
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

                    {/* Action Buttons */}
                    <Box display={"flex"} gap={"20px"}>
                        <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: "20px",
                            padding: "10px 20px",
                            fontWeight: "bold",
                            textTransform: "none",
                            flexGrow: 1,
                        }}
                        >
                        BUY NOW
                        </Button>

                        <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ borderRadius: "20px", padding: "10px 20px", fontWeight: "bold", textTransform: "none", flexGrow: 1 }} disabled={loading}>
                                        {loading ? "ADDING..." : "ADD TO CART"}
                        </Button>
                    </Box>
                    </Box>
                </Box>

            </Box>

            <Box>
                <Divider orientation="horizontal" sx={{ m: "30px" }} />

                {/* Key Features Section */}
                <Box m='40px' border={'1px solid grey'}>
                    <Typography variant="h5" fontWeight="bold" mb="15px" ml={'15px'} mt={'15px'}>
                        Key Features
                    </Typography>

                    <Divider orientation="horizontal" sx={{ color: 'black' }} />

                        {product.key_features.map((item, index) => (
                        <Box key={index} m={'20px'}>
                            <Typography>{item.description}</Typography>
                        </Box>
                        ))}
                </Box>


                <Box m='40px' border={'1px solid grey'}>


                    {/* Specifications Section */}
                    <Typography  variant="h5" fontWeight="bold" mb="15px" ml={'15px'} mt={'15px'}>
                    Specifications
                    </Typography>

                    <Divider orientation="horizontal"/>

                    <Box>

                        {product.specifications.map((item, index) => (
                            <Box key={index} m={'20px'}>
                                <Typography>{item.header}: {item.content}</Typography>
                            </Box>
                        ))}

                    

                    </Box>

                </Box>
            </Box>
            </Box>
        ):(
            <Box>
            <Box display={"flex"} justifyContent={"center"} gap={"50px"} flexWrap="wrap" padding={"40px"} flex={'1'}>
                {/* Image Side */}
                <Box
                    sx={{
                    backgroundColor: "#f2f0f0",
                    borderRadius: "8px",
                    padding: "20px",
                    boxSizing: "border-box",
                    maxHeight: "700px",
                    flex:'1'
                    }}
                >
                    <img
                    src={product.product_image}
                    alt="headphones"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                </Box>

                {/* Product Info Side */}
                <Box display={"flex"} flexDirection={"column"} maxWidth={"400px"} flex={'1'}>
                    {/* Product Title and Description */}
                    <Box mb={"30px"}>
                    <Typography fontSize={"35px"} fontWeight={"bold"}>
                        {product.product_name}
                    </Typography>
                    <Typography color={"#555"}>
                        {product.product_description}      
                    </Typography>
                    </Box>

                    <Divider orientation="horizontal" sx={{ mb: "30px" }} />

                    {/* Price Section */}
                    <Typography fontSize={"30px"} fontWeight={"bold"} color={"#d32f2f"} mb={"30px"}>
                        {new Intl.NumberFormat('en-KE', {style:'currency', currency:'KES'}).format(product.product_price)}
                    </Typography>

                    <Divider orientation="horizontal" sx={{ mb: "30px" }} />

                    {/* Quantity Selector & Buttons */}

                    {/* Quantity Section */}
                    <Typography fontSize={"20px"} fontWeight={"bold"} mb={"30px"}>
                        Only {product.product_quantity} left in stock
                    </Typography>
                    
                    <Box display={"flex"} flexDirection={"column"}>
                    {/* Quantity Selector */}
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
                        onClick={handleDecrement}
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
                        {quantity}
                        </Typography>

                        <Button
                        variant="outlined"
                        onClick={handleIncrement}
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

                    {/* Action Buttons */}
                    <Box display={"flex"} gap={"20px"}>
                        <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: "20px",
                            padding: "10px 20px",
                            fontWeight: "bold",
                            textTransform: "none",
                            flexGrow: 1,
                        }}
                        >
                        BUY NOW
                        </Button>

                        <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ borderRadius: "20px", padding: "10px 20px", fontWeight: "bold", textTransform: "none", flexGrow: 1 }} disabled={loading}>
                                        {loading ? "ADDING..." : "ADD TO CART"}
                        </Button>

                    </Box>
                    </Box>
                </Box>

            </Box>

            <Box>
                <Divider orientation="horizontal" sx={{ m: "30px" }} />

                {/* Key Features Section */}
                <Box m='40px' border={'1px solid grey'}>
                    <Typography variant="h5" fontWeight="bold" mb="15px" ml={'15px'} mt={'15px'}>
                        Key Features
                    </Typography>

                    <Divider orientation="horizontal" sx={{ color: 'black' }} />

                        {product.key_features.map((item, index) => (
                        <Box key={index} m={'20px'}>
                            <Typography>{item.description}</Typography>
                        </Box>
                        ))}
                </Box>


                <Box m='40px' border={'1px solid grey'}>


                    {/* Specifications Section */}
                    <Typography  variant="h5" fontWeight="bold" mb="15px" ml={'15px'} mt={'15px'}>
                    Specifications
                    </Typography>

                    <Divider orientation="horizontal"/>

                    <Box>

                        {product.specifications.map((item, index) => (
                            <Box key={index} m={'20px'}>
                                <Typography>{item.header}: {item.content}</Typography>
                            </Box>
                        ))}

                    

                    </Box>

                </Box>
            </Box>
            </Box>
        )}
        
    </Box>
  );
}

export default ProductDisplay;
