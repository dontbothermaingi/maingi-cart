import { Box} from '@mui/material';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CartProvider } from './Components/CartContext';
import ShoppingCart from './Components/ShoppingCart';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';  // Use the correct path to the Login component
import Register from './Components/Register';
import { jwtDecode } from 'jwt-decode';
import UserAccount from './Components/UserAccount';
import CustomerAddress from './Components/CustomerAddress';
import Relative from './Components/Relative';
import AccountInfo from './Components/AccountInfo';
import EditUser from './Components/EditUser';
import EditAddress from './Components/EditAddress';
import ProductDisplay from './Components/ProductDisplay';
import CreateProduct from './Components/CreateProduct';
import Cart from './Components/Cart';
import Order from './Components/Order';
import DisplayOrder from './Components/DisplayOrder';
import FullViewOrder from './Components/FullViewOrder';
import EditProduct from './Components/EditProduct';
import DisplayProducts from './Components/DisplayProducts';
import Homepage from './Components/Homepage';


function App() {

  const navigate = useNavigate()

  const handleLogOut = () => {
    // Remove access token, refresh token, and token expiry time from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expiry");
  };

  const handleLogin = (userData) => {
    const { access_token, refresh_token } = userData;
  
    // Decode the JWT token to get its expiry time
    const decodedToken = jwtDecode(access_token);
    const tokenExpiry = decodedToken.exp * 1000; // `exp` is in seconds, so convert it to milliseconds
  
    // Store the access token, refresh token, and expiry time
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("token_expiry", tokenExpiry);
  
    // Start a timer to check token expiry and refresh token when necessary
    startTokenExpiryTimer(tokenExpiry);
  };

  const startTokenExpiryTimer = (expiryTime) => {
    const currentTime = Date.now();
    const timeUntilExpiry = expiryTime - currentTime;
    
    // Ensure there's at least 1 minute remaining
    if (timeUntilExpiry > 60000) {
      setTimeout(timeUntilExpiry - 60000);
    } else {
      navigate('/login')
    }
  };
  
  return (
    <CartProvider>
      <Box display="flex" flexDirection="column" height="100vh">
        {/* This layout works for both mobile and desktop */}

        {/* Main content area */}
        <Box flex="1" display="flex" flexDirection="column" justifyContent="space-between">
          <Box flex="1" overflow="auto">
            {/* Define the Routes here, taking the available space */}
            <Routes>
              <Route path='/login' element={<Login onLogin={handleLogin} />} />  {/* Pass the handleLogin function to the Login component */}
              <Route path='/register' element={<Register />} />
              <Route element={<Relative/>}>
                  <Route path='/cart-context' element={<ShoppingCart />} />
                  <Route path='/' element={<Homepage />} />
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/useraccount' element={<UserAccount onLogout={handleLogOut} />} />
                  <Route path='/customeraddress' element={<CustomerAddress />} />
                  <Route path='/accountinfo' element={<AccountInfo />} />
                  <Route path='/edituser' element={<EditUser />} />
                  <Route path='/editaddress' element={<EditAddress />} />
                  <Route path='/productdisplay/:productId' element={<ProductDisplay />} />
                  <Route path='/createproduct' element={<CreateProduct />} />
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/order' element={<Order />} />
                  <Route path='/order/:orderId' element={<FullViewOrder />} />
                  <Route path='/orders' element={<DisplayOrder />} />
                  <Route path='/edit-product/:productId' element={<EditProduct />} />
                  <Route path='/products' element={<DisplayProducts />} />
              </Route>
            </Routes>
          </Box>
        </Box>
      </Box>
    </CartProvider>
  );
}

export default App;
