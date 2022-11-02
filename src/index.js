import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProductGallery from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'



// add quantity
const productList = [
  {id: 0, name: 'Basketball', colors: ['orange', 'blue', 'black'], image: 'Basketball Image', quantity: 3},
  {id: 1, name: 'Football', colors: ['orange', 'blue', 'black'], image: 'Football Image', quantity: 9},
  {id: 2, name: 'Baseball', colors: ['orange', 'blue', 'black'], image: 'Baseball Image', quantity: 7},
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <ProductGallery products={productList} />
    </React.StrictMode>
  </ChakraProvider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
