import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from '@mui/material';
import Navbar from './Navbar'
import Bottombar from './Bottombar'


function Relative (){

      // Correcting the useMediaQuery syntax
      const isMobile = useMediaQuery('(max-width: 768px)');
      const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1350px)');

    return ( 
        <Box display="flex" flexDirection="column" height="95vh">

            <Navbar />

            <Box flex="1" display="flex" flexDirection="column" justifyContent="space-between" overflow={'auto'}>
                <Outlet />
            </Box>

          {isMobile || isTablet ? <Bottombar /> : null}

        </Box>
     );
}
 
export default Relative;