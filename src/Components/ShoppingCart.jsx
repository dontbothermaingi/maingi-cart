import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useCart } from "./CartContext";

function ShoppingCart() {
    const { cartData, removeItemFromCart } = useCart();

    return ( 
        <Box>
            {cartData.items && cartData.items.length > 0 ? (
                <Box>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>Remove</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartData.items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>${item.price.toFixed(2)}</TableCell>
                                        <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => removeItemFromCart(index)}
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography>Total Amount: ${cartData.total_amount.toFixed(2)}</Typography>
                </Box>
            ) : (
               
                <Typography variant="h5" align="center">
                  Your cart is empty!
                </Typography>

            )}
        </Box>
    );
}

export default ShoppingCart;
