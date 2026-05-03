import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../redux/cartSlice';
import { useAppSettings } from '../context/AppSettingsContext';
import { FiShoppingCart, FiEye, FiHeart } from 'react-icons/fi';

const ProductCard = ({ product, isListView = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { settings } = useAppSettings();
  const [isAdding, setIsAdding] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (isAdding) return;
    
    setIsAdding(true);
    setTimeout(() => {
      dispatch(addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
      }));
      setIsAdding(false);
    }, 100);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const truncatedTitle = product.title.length > 40 
    ? `${product.title.slice(0, 40)}...` 
    : product.title;

  const categoryDisplay = {
    "men's clothing": { icon: "👔", name: "Men's Fashion" },
    "women's clothing": { icon: "👗", name: "Women's Fashion" },
    "electronics": { icon: "💻", name: "Electronics" },
    "jewelery": { icon: "💎", name: "Fine Jewelery" }
  };

  const categoryInfo = categoryDisplay[product.category] || { icon: "🛍️", name: product.category };

  // حالت لیست ویو
  if (isListView) {
    return (
      <div 
        className="flex gap-6 bg-white/45 dark:bg-gray-800/50 backdrop-blur-2xl border border-white/45 dark:border-gray-600/50 rounded-3xl p-5 transition-all duration-300 cursor-pointer shadow-lg hover:translate-x-1.5 hover:border-gold hover:shadow-gold hover:bg-white/55 dark:hover:bg-gray-700/60"
        onClick={handleCardClick}
      >
        <div className="w-[140px] flex-shrink-0 p-3 relative">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-[120px] object-contain transition-transform duration-500 group-hover:scale-110" 
            loading="lazy" 
          />
          <button 
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/30 dark:bg-gray-700/50 backdrop-blur-md border border-white/30 dark:border-gray-500 flex items-center justify-center cursor-pointer text-white transition-all duration-300 hover:bg-ruby hover:scale-110"
            onClick={handleLike}
          >
            <FiHeart className={isLiked ? 'text-ruby fill-ruby' : ''} />
          </button>
        </div>
        <div className="flex-1 p-0 bg-transparent backdrop-blur-none">
          <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
            <span className="text-xs uppercase tracking-wider text-gold flex items-center gap-1.5">
              <span>{categoryInfo.icon}</span> {categoryInfo.name}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-gold text-sm tracking-wider">★★★★★</span>
              <span className="text-xs text-text-muted dark:text-gray-400">(4.8)</span>
            </div>
          </div>
          <h3 className="text-base font-semibold mb-3 line-clamp-2 text-text-primary dark:text-white">
            {truncatedTitle}
          </h3>
          <div className="text-2xl font-extrabold bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] bg-clip-text text-transparent mb-4">
            ${product.price.toFixed(2)}
          </div>
          <button 
            className={`w-auto px-7 py-2.5 bg-gold/20 dark:bg-gold/30 backdrop-blur-md border border-gold/35 dark:border-gold/50 rounded-full font-semibold text-gold dark:text-gold-light cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#c4a43c] hover:via-[#e0c460] hover:to-[#c4a43c] hover:text-gray-900 hover:border-gold ${isAdding ? 'opacity-70 cursor-wait' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? '✨ Adding...' : <><FiShoppingCart /> Add to Cart</>}
          </button>
        </div>
      </div>
    );
  }

  // حالت گرید ویو (پیش‌فرض)
  return (
    <div 
      className="group bg-white/45 dark:bg-gray-800/50 backdrop-blur-2xl border border-white/45 dark:border-gray-600/50 rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer relative shadow-lg hover:-translate-y-2 hover:border-gold hover:shadow-gold hover:bg-white/55 dark:hover:bg-gray-700/60"
      onClick={handleCardClick}
    >
      {/* Badge */}
      <div className="absolute top-4 left-4 bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900 px-3 py-1 rounded-full text-xs font-bold tracking-wider z-10 backdrop-blur-sm">
        LUXURY
      </div>
      
      {/* Image Wrapper */}
      <div className="relative overflow-hidden p-6 bg-white/10 dark:bg-gray-700/30 backdrop-blur-md">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-[220px] object-contain transition-transform duration-500 group-hover:scale-110" 
          loading="lazy" 
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/35 backdrop-blur-md flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button className="bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] border-none px-6 py-2.5 rounded-full font-semibold text-gray-900 cursor-pointer translate-y-5 transition-transform duration-300 group-hover:translate-y-0 backdrop-blur-sm">
            Quick View
          </button>
        </div>
        
        {/* Like Button */}
        <button 
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/30 dark:bg-gray-700/50 backdrop-blur-md border border-white/30 dark:border-gray-500 flex items-center justify-center cursor-pointer text-white transition-all duration-300 z-10 hover:bg-ruby hover:scale-110"
          onClick={handleLike}
        >
          <FiHeart className={isLiked ? 'text-ruby fill-ruby' : ''} />
        </button>
      </div>
      
      {/* Card Info */}
      <div className="p-5 bg-white/5 dark:bg-gray-800/30 backdrop-blur-md">
        <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
          <span className="text-xs uppercase tracking-wider text-gold flex items-center gap-1.5">
            <span>{categoryInfo.icon}</span> {categoryInfo.name}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-gold text-sm tracking-wider">★★★★★</span>
          </div>
        </div>
        
        <h3 className="text-base font-semibold mb-3 line-clamp-2 text-text-primary dark:text-white">
          {truncatedTitle}
        </h3>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </div>
          <div className="text-sm text-text-muted dark:text-gray-400 line-through">
            ${(product.price * 1.2).toFixed(2)}
          </div>
        </div>
        
        <button 
          className={`w-full py-3 bg-gold/20 dark:bg-gold/30 backdrop-blur-md border border-gold/35 dark:border-gold/50 rounded-full font-semibold text-gold dark:text-gold-light cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#c4a43c] hover:via-[#e0c460] hover:to-[#c4a43c] hover:text-gray-900 hover:border-gold ${isAdding ? 'opacity-70 cursor-wait' : ''}`}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? '✨ Adding...' : <><FiShoppingCart /> Add to Cart</>}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;