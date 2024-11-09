import { Box, Button, Card, CardContent, CardMedia, Divider, IconButton, TextField, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import Edit from "@mui/icons-material/Edit";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { useCart } from "./CartContext";

function Order (){

    const [selectedMenuItem, setSelectedMenuItem] = useState('AddressInfo'); // State to track selected menu item
    const [selectedDeliveryItem, setSelectedDeliveryItem] = useState('delivery'); // State to track selected menu item
    const [selectedPaymentItem, setSelectedPaymentItem] = useState('payment'); // State to track selected menu item
    const [selectedTotal, setSelectedTotal] = useState('total'); // State to track selected menu item
    const [activeSelection, setActiveSelection] = useState('customeraddress')
    const [cart, setCart] = useState({products: []})
    const [address, setAddress] = useState([])

    const { carts, handleCartItemsDelete } = useCart()
    
    const [formData, setFormData] = useState({
        first_name:"",
        last_name:"",
        phone_number:"",
        city:"",
        street:"",
        country:"",
    })

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0'); // Day of the month

    const formattedDate = `${year}-${month}-${day}`;

    const [orderData, setOrderData] = useState({
        order_date: formattedDate,
        payment_method:"",
        delivery_method:"",
        order_items:[]
    })

    function handleOrderSubmit (event){

        handleCartItemsDelete()

        event.preventDefault()

        const orderPayload = {
            ...orderData,
            order_items: cart.products.map((product, index) => ({
                product_id: product.product_id,
                quantity: product.quantity,
            }))
        };
        

        fetch('https://maingi-shop-server.onrender.com/neworder', {
            method:'POST',
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json',
            },
            body:JSON.stringify(orderPayload),
            credentials:'include'
        })
        .then(response => {
            if(!response.ok){
                return response.text().then(text => {
                    throw new Error(`Network response was not ok: ${text}`);
                });
            }
            return response.json()
        })
        .then((data) => {
            console.log(data)
        })
    }

    
    const handleOptionChange = (event) => {
        const {name,value} = event.target

        setOrderData(prevOrderData =>({
            ...prevOrderData,
            [name]:value,
        }))
    };

    function handleSelection(dropdown) {
        // Toggle activeSelection between the dropdown name or null
        setActiveSelection(prevSelection => (prevSelection === dropdown ? null : dropdown));
    }

    const token = localStorage.getItem('access_token');


    useEffect(() => {
        fetch('https://maingi-shop-server.onrender.com/cart', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: "include"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setCart(data); // Ensure data is structured correctly
        })
        .catch((error) => {
            console.error("Error fetching cart:", error);
        });
    }, [token]);

     // Media query for responsiveness
    const isMobile = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        fetch('https://maingi-shop-server.onrender.com/addressbook', {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        }, 
        credentials:'include'
    })
      .then(response => response.json())
      .then((data) => {
        setFormData({
          first_name: data[0].first_name,
          last_name: data[0].last_name,
          phone_number: data[0].phone_number,
          city: data[0].city,
          street: data[0].street,
          country: data[0].country,
        })

        setAddress(data[0])

      });
    }, [token]);

    function handleChange(event){
        const{name,value} = event.target
        setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
        }));
    }

    function handleSubmit(event){
            event.preventDefault()

            fetch('https://maingi-shop-server.onrender.com/addressbook', {
            method:'PATCH',
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

    function renderAccount(){
        switch(selectedMenuItem){
            case 'AddressEdit':
                return (
                    <Box display='flex' >
                            
                            <Divider orientation='horizontal' sx={{mb:'20px'}}/>

                            {isMobile ? (
                                <Box display={'flex'} justifyContent={'center'}>
                                <form onSubmit={handleSubmit}>
                                    <FormControl>

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
                                                label="Region"
                                                className='input-field'
                                                variant="outlined"
                                                onChange={handleChange}
                                                sx={{mb:"40px"}}

                                            />

                                    <Button type="submit" className="button" variant="contained" color="secondary" onClick={() => setSelectedMenuItem('AddressInfo')}>SAVE</Button>
                                    </FormControl>
                                </form>
                            </Box>
                            ):(
                                <Box display={'flex'} justifyContent={'center'}>
                                <form onSubmit={handleSubmit}>
                                    <FormControl>

                                        <Box display={'flex'} gap={'15px'}>
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

                                        <Box display={'flex'} gap={'15px'}>

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
                                        </Box>

                                            <TextField
                                                type="text"
                                                name="country"
                                                value={formData.country}
                                                label="Region"
                                                className='input-field'
                                                variant="outlined"
                                                onChange={handleChange}
                                                sx={{mb:"40px"}}

                                            />

                                    <Button type="submit" className="button" variant="contained" color="secondary" onClick={() => setSelectedMenuItem('AddressInfo')}>SAVE</Button>
                                    </FormControl>
                                </form>
                            </Box>
                            )}

                            
    
                    </Box>
                )
                default:
                        return null;
            
            case 'AddressInfo':
                    return (
                        <Box display='flex' flexDirection='column'>

                            <Divider orientation='horizontal' sx={{mb:'20px'}}/>

                            <Box display={'flex'} flexDirection={'column'}>

                                <Box display={'flex'} gap={'5px'}>
                                    <Typography>
                                        {address.first_name}
                                    </Typography>
                                    <Typography>
                                        {address.last_name}
                                    </Typography>
                                </Box>
                                <Box display={'flex'}>
                                    {address.street}, {address.city}, {address.country} | {address.phone_number}
                                </Box>
                            </Box>
                            
                        </Box>
                    )
        }
    }
    
    function renderDelivery(){
        switch(selectedDeliveryItem){
            case 'delivery':
                        return (

                            <Box>
                                <Divider orientation='horizontal' sx={{mb:'20px'}}/>

                                <Box display="flex" flexDirection="column" gap="20px" mt="20px">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Choose Delivery Method</FormLabel>
                                    <RadioGroup
                                        name="delivery_method"
                                        value={orderData.delivery_method}
                                        onChange={handleOptionChange}
                                    >
                                        <FormControlLabel
                                            value="Door Delivery"
                                            control={<Radio />}
                                            label="Door Delivery"
                                        />
                                        <FormControlLabel
                                            value="Pick Up Station"
                                            control={<Radio />}
                                            label="Pick Up Station"
                                        />
                                    </RadioGroup>
                                </FormControl>
                                </Box>

                            </Box>
                    )
                    default:
                        return null;
        }
    }   

    function renderTotal(){
        switch(selectedTotal){
            case 'total':
                        return (

                            <Box>
                                <Divider orientation='horizontal' sx={{mb:'20px'}}/>

                                {new Intl.NumberFormat('en-KE', {currency:'KES', style:'currency'}).format(carts.cart_amount)}
                            </Box>
                    )
                    default:
                        return null;
        }
    } 

    function renderPayment(){
        switch(selectedPaymentItem){
            case 'payment':
                        return (

                            <Box>
                                <Divider orientation='horizontal' sx={{mb:'20px'}}/>

                                <Box display="flex" flexDirection="column" gap="20px" mt="20px">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Choose Payment Method</FormLabel>
                                    <RadioGroup
                                        name="payment_method"
                                        value={orderData.payment_method}
                                        onChange={handleOptionChange}
                                    >
                                        <FormControlLabel
                                            value="Mpesa"
                                            control={<Radio />}
                                            label="Mpesa"
                                        />
                                        <FormControlLabel
                                            value="Credit Card"
                                            control={<Radio />}
                                            label="Credit Card"
                                        />
                                    </RadioGroup>
                                </FormControl>
                                </Box>

                            </Box>
                    )
                    default:
                        return null;
        }
    }   

    return ( 
        <Box>

            {/* Different Section */}
            {isMobile ? (
            <Box display={'flex'} flexDirection={'column'}>
                <Box flex={'1'} >
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
                        margin={'30px'} 
                        overflow={'auto'}

                    >
                        <Typography
                            onClick={() => handleSelection('customeraddress')}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                color: activeSelection === 'customeraddress' ? '#1976d2' : 'black', // Corrected comparison
                                transition: 'color 0.3s',
                                justifyContent:'space-between'

                            }}
                        >
                            Customer Address
                            <IconButton onClick={() => setSelectedMenuItem('AddressEdit')}>
                                <Edit />
                            </IconButton>
                        </Typography>
                            <Box mt={1}>
                                {renderAccount()}
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
                        margin={'30px'} 
                        overflow={'auto'}
                    >
                        <Typography
                            onClick={() => handleSelection('delivery')}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                color: activeSelection === 'delivery' ? '#1976d2' : 'black', // Corrected comparison
                                transition: 'color 0.3s',
                            }}
                        >
                            <Box onClick={() => setSelectedDeliveryItem('delivery')}>
                                Delivery Method
                            </Box>

                        </Typography>
                            <Box mt={1}>
                                {renderDelivery()}
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
                        margin={'30px'} 
                        overflow={'auto'}
                    >
                        <Typography
                            onClick={() => handleSelection('delivery')}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                color: activeSelection === 'delivery' ? '#1976d2' : 'black', // Corrected comparison
                                transition: 'color 0.3s',
                            }}
                        >
                            <Box onClick={() => setSelectedTotal('total')} >
                                Total
                            </Box>

                        </Typography>
                            <Box mt={1}>
                                {renderTotal()}
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
                        margin={'30px'} 
                        overflow={'auto'}
                    >
                        <Typography
                            onClick={() => handleSelection('Payment')}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                color: activeSelection === 'Payment' ? '#1976d2' : 'black', // Corrected comparison
                                transition: 'color 0.3s',
                            }}
                        >
                            <Box onClick={() => setSelectedPaymentItem('payment')} >
                                Payment Method
                            </Box>
                        </Typography>
                            <Box mt={1}>
                                {renderPayment()}
                            </Box>
                    </Box>

                </Box>

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
                            <Typography fontSize={'25px'} fontWeight={'bold'} ml={'20px'} mt={'20px'}>Items</Typography>

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
                                            height: '250px',
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
                                                height: '230px',
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
                                                    <Typography>
                                                        {new Intl.NumberFormat('en-KE',{currency:'KES', style:'currency'}).format(item.product_price)} 
                                                    </Typography>
                                                    <Typography color="grey">
                                                        {item.quantity} Items
                                                    </Typography>
                                                    
                                                </CardContent>
    
                                    </Card>
                                ))}
                            </Box>
                        </Box>
                    <Button variant="contained" color="secondary" sx={{ml:'30px',mr:'30px', mb:'30px'}} onClick={handleOrderSubmit}>Confirm Order</Button>

                </Box>
            </Box>
            ):(

            <Box display={'flex'}>
                <Box flex={'1'} >

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
                        margin={'30px'} 
                        overflow={'auto'}

                    >
                        <Typography
                            onClick={() => handleSelection('customeraddress')}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                color: activeSelection === 'customeraddress' ? '#1976d2' : 'black', // Corrected comparison
                                transition: 'color 0.3s',
                                justifyContent:'space-between'

                            }}
                        >
                            Customer Address
                            <IconButton onClick={() => setSelectedMenuItem('AddressEdit')}>
                                <Edit />
                            </IconButton>
                        </Typography>
                            <Box mt={1}>
                                {renderAccount()}
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
                        margin={'30px'} 
                        overflow={'auto'}
                    >
                        <Typography
                            onClick={() => handleSelection('delivery')}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                color: activeSelection === 'delivery' ? '#1976d2' : 'black', // Corrected comparison
                                transition: 'color 0.3s',
                            }}
                        >
                            <Box onClick={() => setSelectedDeliveryItem('delivery')}>
                                Delivery Method
                            </Box>

                        </Typography>
                            <Box mt={1}>
                                {renderDelivery()}
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
                        margin={'30px'} 
                        overflow={'auto'}
                    >
                        <Typography
                            onClick={() => handleSelection('delivery')}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                color: activeSelection === 'delivery' ? '#1976d2' : 'black', // Corrected comparison
                                transition: 'color 0.3s',
                            }}
                        >
                            <Box onClick={() => setSelectedTotal('total')} >
                                Total
                            </Box>

                        </Typography>
                            <Box mt={1}>
                                {renderTotal()}
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
                        margin={'30px'} 
                        overflow={'auto'}
                    >
                        <Typography
                            onClick={() => handleSelection('Payment')}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                color: activeSelection === 'Payment' ? '#1976d2' : 'black', // Corrected comparison
                                transition: 'color 0.3s',
                            }}
                        >
                            <Box onClick={() => setSelectedPaymentItem('payment')} >
                                Payment Method
                            </Box>
                        </Typography>
                            <Box mt={1}>
                                {renderPayment()}
                            </Box>
                    </Box>

                    <Button variant="contained" color="secondary" sx={{ml:'30px'}} onClick={handleOrderSubmit}>Confirm Order</Button>
                </Box>

                <Box display={'flex'} flexDirection={'column'} flex={'1'}>
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
                            <Typography fontSize={'25px'} fontWeight={'bold'} ml={'20px'} mt={'20px'}>Items</Typography>
    
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
                                            height: '270px',
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
                                                    <Typography>
                                                        {new Intl.NumberFormat('en-KE',{currency:'KES', style:'currency'}).format(item.product_price)} 
                                                    </Typography>
                                                    <Typography color="grey">
                                                        {item.quantity} Items
                                                    </Typography>
                                                    
                                                </CardContent>
    
                                    </Card>
                                ))}
                            </Box>
                        </Box>

                </Box>
            </Box>
            )}
            

        </Box>
     );
}
 
export default Order;