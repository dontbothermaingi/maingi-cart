// CartContext.js
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const [cart, setCart] = useState({products:[]})
    const [carts, setCarts] = useState([])
    const token = localStorage.getItem('access_token')

    const addToCart = () => {
        setCartCount(prevCount => prevCount + 1);
    };

    const handleCart = useCallback(() => {
        fetch('https://shop-maingi-server.onrender.com/cart', {
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
            console.log(data);
            setCart(data); // Ensure data is structured correctly
            setCarts(data);
        })
        .catch((error) => {
            console.error("Error fetching cart:", error);
        });
    }, [token]);

    useEffect(() => {
        handleCart();
    }, [token, handleCart]);

    function updateQuantity(productId, newQuantity) {
        // Update the quantity in the backend
        fetch(`https://shop-maingi-server.onrender.com/editcart/${productId}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: newQuantity }), // Send the updated quantity
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            // Update the cart state locally after successful update
            const updatedCart = { ...cart };
            updatedCart.products = updatedCart.products.map((item) => 
                item.product_id === productId ? { ...item, quantity: newQuantity } : item
            );
            setCart(updatedCart);


            fetch('https://shop-maingi-server.onrender.com/cart', {
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
                setCarts(data)
            })
        })
        .catch((error) => {
            console.error("Error updating quantity:", error);
        });
    }

    function handleDelete(productId){

        fetch(`https://shop-maingi-server.onrender.com/editcart/${productId}`, {
            method:'DELETE',
            headers: {
                'Authorization':`Bearer ${token}`,
            }
        })
        .then(response => response.json())
        .then((data)=>{

            fetch('https://shop-maingi-server.onrender.com/cart', {
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
                setCarts(data); // Ensure data is structured correctly

            })

            console.log('Item deleted successfully')
        })
    }

    function handleCartItemsDelete(){

        fetch('https://shop-maingi-server.onrender.com/cart', {
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${token}`
            },
            credentials:'include'
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
        })
    }

    function handleIncrement(productId, currentQuantity) {
        const newQuantity = currentQuantity + 1;
        updateQuantity(productId, newQuantity);
    }

    function handleDecrement(productId, currentQuantity) {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            updateQuantity(productId, newQuantity);
        }
    }



    return (
        <CartContext.Provider value={{ cartCount, addToCart, cart, carts, handleDelete, handleDecrement, handleIncrement, updateQuantity, handleCartItemsDelete, handleCart }}>
            {children}
        </CartContext.Provider>
    );
};
