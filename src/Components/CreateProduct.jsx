import { Box, Button, FormControl, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";


function CreateProduct (){

    const navigate = useNavigate()
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [productData, setProductData] = useState({
        product_image:"",
        product_name:"",
        product_description:"",
        product_quantity:"",
        product_price:"",
        key_features:[],
        specifications:[]
    })

    const [featureData, setFeatureData] = useState({
        description:"",
    })

    const [specificationData, setSpecificationData] = useState({
        header:"",
        content:"",
    })

    function handleProductChange(event) {
        const { name, value, type, files } = event.target;
    
        if (type === 'file') {
            // Handle file input
            setProductData(prevProductData => ({
                ...prevProductData,
                [name]: files[0] // Store the file directly
            }));
        } else {
            // Handle text inputs
            setProductData(prevProductData => ({
                ...prevProductData,
                [name]: value
            }));
        }
    }
    

    function handleFeatureChange(event){
        const{name,value} = event.target

        setFeatureData(prevFeatureData => ({
            ...prevFeatureData,
            [name]:value
        }))
    }

    function handleSpecificationChange(event){
        const{name,value} = event.target

        setSpecificationData(prevSpecificationData => ({
            ...prevSpecificationData,
            [name]:value
        }))
    }


    function addFeatureItem() {
        if (featureData.description.trim() !== "") {
            setProductData(prevProductData => ({
                ...prevProductData,
                key_features: [...prevProductData.key_features, featureData]
            }));
            setFeatureData({ description: "" });  // Reset feature data
        } else {
            // Optionally, you can add some user feedback (e.g., alert or error message)
            alert("Feature description cannot be empty.");
        }
    }
    
    
    function addSpecificationItem() {
        if (specificationData.header.trim() !== "" && specificationData.content.trim() !== "") {
            setProductData(prevProductData => ({
                ...prevProductData,
                specifications: [...prevProductData.specifications, specificationData]
            }));
            setSpecificationData({ header: "", content: "" });  // Reset specification data
        } else {
            // Optionally, you can add some user feedback (e.g., alert or error message)
            alert("Specification header and content cannot be empty.");
        }
    }
    
    

    function handleDeleteFeatureItem(index){
        setProductData(prevProductData => ({
            ...prevProductData,
            key_features: prevProductData.key_features.filter((_,i) => i !== index)
        }))
    }
    

    function handleDeleteSpecificationItem(index){
        setProductData(prevProductData => ({
            ...prevProductData,
            specifications: prevProductData.specifications.filter((_,i) => i !== index)
        }))
    }

    function handleSubmit(event) {
        event.preventDefault();
        const access_token = localStorage.getItem('access_token');
    
        // Create a new FormData object
        const formData = new FormData();

        // Append the image and other product data to the FormData object
        formData.append('product_image', productData.product_image);  // Assuming product_image contains the file
        formData.append('product_name', productData.product_name);
        formData.append('product_description', productData.product_description);
        formData.append('product_quantity', productData.product_quantity);
        formData.append('product_price', productData.product_price);

        // Append key features and specifications as JSON strings
        formData.append('key_features', JSON.stringify(productData.key_features));
        formData.append('specifications', JSON.stringify(productData.specifications));

    
        fetch('https://shop-maingi-server.onrender.com/products', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`
                // Note: Do NOT set 'Content-Type' header when sending FormData, as it will be set automatically
            },
            body: formData,
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Network response was not ok: ${text}`);
                });
            }
            return response.json();
        })
        .then((data) => {
            // Handle success and reset form if needed
            setProductData({
                product_image: "",
                product_name: "",
                product_description: "",
                product_quantity: "",
                product_price: "",
                key_features: [],
                specifications: []
            });
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
    
    function handleback(){
        navigate('/useraccount')
    }

    return ( 
        <Box margin={{md:'40px'}}>

            {isMobile ? (
                <IconButton sx={{color:'black', ml:'30px'}} onClick={handleback}>
                <ArrowBack />
                </IconButton>
            ):(
                ""
            )}
                    

            <Typography fontWeight={'bold'} fontSize={'27px'} textAlign={'center'}>CREATE PRODUCT</Typography>
            <FormControl sx={{display:'flex', margin:'30px'}}>
                <form onSubmit={handleSubmit}>

                    <Box display={'flex'} flexDirection={'column'}>
                        <Box sx={{
                            border:'1px solid grey',
                            height:'50px',
                            alignItems:'center',
                            justifyContent:'center',
                            display:'flex',
                            mb:'20px',
                            borderRadius:'5px'
                        }}>

                            <input
                                type="file"
                                name="product_image"
                                onChange={handleProductChange}
                            />

                        </Box>

                        <Box display={'flex'} gap={'20px'} flexDirection={{xs:'column', md:'row'}}>
                            <TextField 
                                variant="outlined"
                                label='Product Name'
                                type="text"
                                value={productData.product_name}
                                name="product_name"
                                onChange={handleProductChange}
                                sx={{mb:'20px'}}
                            />

                            <TextField 
                                variant="outlined"
                                label='Product Description'
                                type="text"
                                value={productData.product_description}
                                name="product_description"
                                onChange={handleProductChange}
                                sx={{mb:'20px'}}
                            />

                            <TextField 
                                variant="outlined"
                                label='Product Quantity'
                                type="number"
                                value={productData.product_quantity}
                                name="product_quantity"
                                onChange={handleProductChange}
                                sx={{mb:'20px'}}
                            />

                            <TextField 
                                variant="outlined"
                                label='Product Price'
                                type="number"
                                value={productData.product_price}
                                name="product_price"
                                onChange={handleProductChange}
                                sx={{mb:'20px'}}
                            />
                        </Box>
                    </Box>

                    <Box>
                        <Typography fontWeight={'bold'}>KEY FEATURES</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ minWidth: 410 }}><Typography fontWeight="bold">Description</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productData.key_features.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDeleteFeatureItem(index)}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell>
                                            <TextField 
                                                variant="outlined"
                                                label='Description'
                                                type="text"
                                                value={featureData.description}
                                                name="description"
                                                onChange={handleFeatureChange}
                                                sx={{mb:'20px'}}
                                                size="small"
                                                fullWidth
                                                multiline
                                                minRows={4}  // Initial number of rows
                                                maxRows={20}   // Maximum number of rows
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button variant="contained" color="secondary" onClick={addFeatureItem} sx={{margin:'20px'}}>
                            ADD KEY FEATURE
                        </Button>
                    </Box>

                    <Box>
                        <Typography fontWeight={'bold'}>SPECIFICATIONS</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ minWidth: 250 }}><Typography fontWeight="bold">Descriptor</Typography></TableCell>
                                        <TableCell sx={{ minWidth: 410 }}><Typography fontWeight="bold">Specification</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productData.specifications.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.header}</TableCell>
                                            <TableCell>{item.content}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDeleteSpecificationItem(index)}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell>
                                            <TextField 
                                                variant="outlined"
                                                label='Descriptor'
                                                type="text"
                                                value={specificationData.header}
                                                name="header"
                                                onChange={handleSpecificationChange}
                                                sx={{mb:'20px'}}
                                                size="small"
                                                fullWidth
                                                multiline
                                                minRows={4}  // Initial number of rows
                                                maxRows={20}   // Maximum number of rows
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                variant="outlined"
                                                label='Specification'
                                                type="text"
                                                value={specificationData.content}
                                                name="content"
                                                onChange={handleSpecificationChange}
                                                sx={{mb:'20px'}}
                                                size="small"
                                                fullWidth
                                                multiline
                                                minRows={4}  // Initial number of rows
                                                maxRows={20}   // Maximum number of rows
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button variant="contained" color="secondary" onClick={addSpecificationItem} sx={{margin:'20px'}}>
                            ADD SPECIFICATION
                        </Button>
                    </Box>

                    <Button 
                        type="submit"
                        variant="contained" color="secondary"
                        sx={{margin:'20px'}}
                    >
                        CREATE PRODUCT
                    </Button>
                </form>
            </FormControl>

        </Box>
     );
}
 
export default CreateProduct;