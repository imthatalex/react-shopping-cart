import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProductList from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'

const productList = [
  { id: 0, name: 'Cap', colors: ['orange', 'blue', 'black'], image: 'balenciaga-c.jpeg' },
  { id: 1, name: 'Hoodie', colors: ['orange', 'blue', 'black'], image: 'balenciaga-h.jpeg' },
  { id: 2, name: 'T-Shirt', colors: ['orange', 'blue', 'black'], image: 'balenciaga-t.jpeg' },
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <ProductList products={productList} />
    </React.StrictMode>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
