import { useMediaQuery,useTheme } from '@mui/material';
import React from 'react';
// import { useTheme, useMediaQuery } from '@mui/material/';

function MyComponent() {
  const theme = useTheme();
  console.log("isXsScreen",theme)
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));
  console.log("isXsScreen",isXsScreen)

  return (
    <div>
      {isXsScreen ? (
        <p>Screen size is XS</p>
      ) : (
        <div>
         <p>Screen size is not  XS</p>
        </div>
      )}
    </div>
  );
}

export default MyComponent;
