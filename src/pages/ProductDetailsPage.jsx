import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { productsApi } from '../api/productsApi';
import { addItem } from '../redux/cartSlice';
import { FiArrowLeft } from 'react-icons/fi';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getProductById(id),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-5">
        <div className="w-16 h-16 border-4 border-white/30 border-t-gold rounded-full animate-spin-slow"></div>
        <p className="text-text-secondary dark:text-gray-300">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 px-8 backdrop-blur-xl bg-white/20 dark:bg-gray-900/40 rounded-3xl border border-white/30 dark:border-gray-600/50">
        <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-4">Product not found</h2>
        <Link to="/" className="inline-flex items-center gap-2 px-7 py-3 rounded-full backdrop-blur-md bg-white/20 dark:bg-gray-800/50 border border-white/30 dark:border-gray-600/50 text-text-primary dark:text-gray-200 font-semibold transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-x-1">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-10">
      {/* Product Image */}
      <div className="w-full">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full rounded-2xl object-contain backdrop-blur-xl bg-white/25 dark:bg-gray-800/50 p-10 border border-white/40 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:border-gold"
        />
      </div>
      
      {/* Product Info */}
      <div className="details-info">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary dark:text-white">
          {product.title}
        </h1>
        
        <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-5 bg-gold/20 dark:bg-gold/30 backdrop-blur-md text-gold">
          {product.category === "men's clothing" ? "👔 Men's Fashion" :
           product.category === "women's clothing" ? "👗 Women's Fashion" :
           product.category === "electronics" ? "💻 Electronics" :
           product.category === "jewelery" ? "💎 Fine Jewelery" :
           product.category}
        </span>
        
        <p className="text-text-secondary dark:text-gray-300 leading-relaxed my-5">
          {product.description}
        </p>
        
        <div className="text-4xl md:text-5xl font-extrabold my-5 bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] bg-clip-text text-transparent">
          ${product.price.toFixed(2)}
        </div>
        
        <button 
          className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] border-none font-bold text-base text-gray-900 cursor-pointer transition-all duration-300 mr-4 mb-5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/40"
          onClick={() => dispatch(addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
          }))}
        >
          Add to Cart
        </button>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full backdrop-blur-md bg-white/20 dark:bg-gray-800/50 border border-white/30 dark:border-gray-600/50 text-text-primary dark:text-gray-200 font-semibold transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-x-1"
        >
          <FiArrowLeft /> Back to Products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailsPage;