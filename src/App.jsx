import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <MainLayout>
          <HomePage />
        </MainLayout>
      } />
      <Route path="/cart" element={
        <MainLayout>
          <CartPage />
        </MainLayout>
      } />
      <Route path="/product/:id" element={
        <MainLayout>
          <ProductDetailsPage />
        </MainLayout>
      } />
    </Routes>
  );
}

export default App;