import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './utilits/CartContext';

export const Context = createContext(null)


ReactDOM.render(
  
  <BrowserRouter >
  <CartProvider>
    <App />
    </CartProvider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);


