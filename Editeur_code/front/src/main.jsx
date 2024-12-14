import React from 'react'
import ReactDom from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import App from './App';
import theme from "./components/pages/Test/allTest/testDev/theme";




const root = ReactDom.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </BrowserRouter>

);
