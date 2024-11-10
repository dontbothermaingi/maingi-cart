import { Box, Button, Divider, FormControl, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";


function EditProduct () {
    const { productId } = useParams();
    const access_token = localStorage.getItem('access_token');
    const [editSpecificationIndex, setEditSpecificationIndex] = useState(null);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const navigate = useNavigate()
    const [editFeatureIndex, setEditFeatureIndex] = useState(null);
    const [productData, setProductData] = useState({
        product_image: "",
        product_name: "",
        product_description: "",
        product_quantity: "",
        product_price: "",
        key_features: [],
        specifications: []
    });
    const [featureData, setFeatureData] = useState({ description: "" });
    const [specificationData, setSpecificationData] = useState({ header: "", content: "" });

    function handleProductChange(event) {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            setProductData(prevProductData => ({
                ...prevProductData,
                [name]: files[0]
            }));
        } else {
            setProductData(prevProductData => ({
                ...prevProductData,
                [name]: value
            }));
        }
    }

    useEffect(() => {
        fetch(`https://shop-maingi-server.onrender.com/product/${productId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            credentials: 'include'
        })
        .then(response => response.json())
        .then((data) => {
            setProductData({
                product_image: data.product_image,
                product_name: data.product_name,
                product_description: data.product_description,
                product_quantity: data.product_quantity,
                product_price: data.product_price,
                key_features: data.key_features,
                specifications: data.specifications,
            });
        });
    }, [productId, access_token]);

    function handleFeature(index) {
        setEditFeatureIndex(index);
        setFeatureData(productData.key_features[index]);
    }

    function handleSpecification(index) {
        setEditSpecificationIndex(index);
        setSpecificationData(productData.specifications[index]);
    }

    function handleFeatureChange(event) {
        const { name, value } = event.target;
        setFeatureData(prevFeatureData => ({ ...prevFeatureData, [name]: value }));
    }

    function handleSpecificationChange(event) {
        const { name, value } = event.target;
        setSpecificationData(prevSpecificationData => ({ ...prevSpecificationData, [name]: value }));
    }

    function addFeatureItem() {
        if (editFeatureIndex !== null) {
            const updatedFeatures = [...productData.key_features];
            updatedFeatures[editFeatureIndex] = featureData;
            setProductData(prev => ({ ...prev, key_features: updatedFeatures }));
            setEditFeatureIndex(null);
            setFeatureData({ description: "" });
        } else {
            setProductData(prevProductData => ({
                ...prevProductData,
                key_features: [...prevProductData.key_features, featureData]
            }));
            setFeatureData({ description: "" });
        }
    }

    function addSpecificationItem() {
        if (editSpecificationIndex !== null) {
            const updatedSpecifications = [...productData.specifications];
            updatedSpecifications[editSpecificationIndex] = specificationData;
            setProductData(prev => ({ ...prev, specifications: updatedSpecifications }));
            setEditSpecificationIndex(null);
            setSpecificationData({ header: "", content: "" });
        } else {
            setProductData(prevProductData => ({
                ...prevProductData,
                specifications: [...prevProductData.specifications, specificationData]
            }));
            setSpecificationData({ header: "", content: "" });
        }
    }

    function handleDeleteFeatureItem(index) {
        setProductData(prevProductData => ({
            ...prevProductData,
            key_features: prevProductData.key_features.filter((_, i) => i !== index)
        }));
    }

    function handleDeleteSpecificationItem(index) {
        setProductData(prevProductData => ({
            ...prevProductData,
            specifications: prevProductData.specifications.filter((_, i) => i !== index)
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('product_image', productData.product_image);
        formData.append('product_name', productData.product_name);
        formData.append('product_description', productData.product_description);
        formData.append('product_quantity', productData.product_quantity);
        formData.append('product_price', productData.product_price);
        formData.append('key_features', JSON.stringify(productData.key_features));
        formData.append('specifications', JSON.stringify(productData.specifications));

        fetch(`https://shop-maingi-server.onrender.com/product/${productId}`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${access_token}`, 'Content-Type': 'multipart/form-data', },
            body: formData,
            credentials: 'include'
        })
        .then(response => response.ok ? response.json() : response.text().then(text => { throw new Error(text); }))
        .then(() => setProductData({
            product_image: "", product_name: "", product_description: "", product_quantity: "", product_price: "", key_features: [], specifications: []
        }))
        .catch(error => console.error('Error:', error));
    }

    function handleback(){
        navigate('/useraccount')
    }

    return (
        <Box>

                {isMobile ? (
                    <IconButton sx={{color:'black', ml:'30px'}} onClick={handleback}>
                        <ArrowBack />
                    </IconButton>
                ):(
                    <IconButton sx={{color:'black', ml:'30px'}} onClick={handleback}>
                        <ArrowBack />
                    </IconButton>
                )}
            <Typography fontWeight={'bold'} fontSize={'27px'} ml={'80px'}>EDIT PRODUCT</Typography>
            <Divider orientation="horizontal" sx={{margin:'30px'}}/>
            <FormControl sx={{display:'flex', margin:'30px'}}>
                <form style={{display:'flex', flexDirection:'column', margin:'30px'}} onSubmit={handleSubmit}>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Box sx={{ border: '1px solid grey', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '20px', borderRadius: '5px' }}>
                            <input type="file" name="product_image" accept="image/*" onChange={handleProductChange} />
                        </Box>
                        <Box display={'flex'} gap={'20px'} flexDirection={{xs:'column', md:'horizontal'}}>
                            <TextField variant="outlined" label='Product Name' type="text" value={productData.product_name} name="product_name" onChange={handleProductChange} sx={{ mb: '20px' }} />
                            <TextField variant="outlined" label='Product Description' type="text" value={productData.product_description} name="product_description" onChange={handleProductChange} sx={{ mb: '20px' }} />
                            <TextField variant="outlined" label='Product Quantity' type="number" value={productData.product_quantity} name="product_quantity" onChange={handleProductChange} sx={{ mb: '20px' }} />
                            <TextField variant="outlined" label='Product Price' type="number" value={productData.product_price} name="product_price" onChange={handleProductChange} sx={{ mb: '20px' }} />
                        </Box>
                    </Box>

                    <Box>
                        <Typography fontWeight={'bold'}>KEY FEATURES</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ minWidth: 400 }}><Typography fontWeight="bold">Description</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productData.key_features.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>
                                                <IconButton color="primary" onClick={() => handleFeature(index)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDeleteFeatureItem(index)}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell>
                                            <TextField variant="outlined" label='Description' type="text" value={featureData.description} name="description" onChange={handleFeatureChange} sx={{ mb: '20px' }} size="small"
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
                        <Button variant="contained" color="secondary" onClick={addFeatureItem} sx={{ margin: '20px' }}>
                            {editFeatureIndex !== null ? 'UPDATE KEY FEATURE' : 'ADD KEY FEATURE'}
                        </Button>
                    </Box>

                    <Box>
                        <Typography fontWeight={'bold'}>SPECIFICATIONS</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ minWidth: 250 }}><Typography fontWeight="bold">Header</Typography></TableCell>
                                        <TableCell sx={{ minWidth: 400 }}><Typography fontWeight="bold">Specification</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productData.specifications.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.header}</TableCell>
                                            <TableCell>{item.content}</TableCell>
                                            <TableCell>
                                                <IconButton color="primary" onClick={() => handleSpecification(index)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDeleteSpecificationItem(index)}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell>
                                            <TextField variant="outlined" label='Header' type="text" value={specificationData.header} name="header" onChange={handleSpecificationChange} sx={{ mb: '20px' }} 
                                                fullWidth
                                                multiline
                                                minRows={4}  // Initial number of rows
                                                maxRows={20}   // Maximum number of rows 
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField variant="outlined" label='Content' type="text" value={specificationData.content} name="content" onChange={handleSpecificationChange} sx={{ mb: '20px' }}
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
                        <Button variant="contained" color="secondary" onClick={addSpecificationItem} sx={{ margin: '20px' }}>
                            {editSpecificationIndex !== null ? 'UPDATE SPECIFICATION' : 'ADD SPECIFICATION'}
                        </Button>
                    </Box>

                    <Button type="submit" variant="contained" color="primary" sx={{ mt: '20px' }}>Submit Product</Button>
                </form>
            </FormControl>
        </Box>
    );
}

export default EditProduct;
