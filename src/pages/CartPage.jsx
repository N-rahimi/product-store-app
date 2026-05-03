import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { increaseQuantity, decreaseQuantity, removeItem, clearCart } from '../redux/cartSlice';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi';
import { FaShoppingCart, FaGem } from 'react-icons/fa';
import CheckoutModal from '../components/CheckoutModal';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Calculate discount and shipping
  const discount = totalAmount > 500 ? totalAmount * 0.1 : 0;
  const shipping = totalAmount > 100 ? 0 : 15;
  const finalTotal = totalAmount - discount + shipping;

  // Open checkout modal
  const openCheckoutModal = () => {
    setIsCheckoutOpen(true);
  };

  // Close checkout modal
  const closeCheckoutModal = () => {
    setIsCheckoutOpen(false);
  };

  // Empty cart view
  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto py-5">
        <div className="text-center py-20 px-10 bg-white/25 dark:bg-gray-800/50 backdrop-blur-2xl rounded-3xl border border-gold/25 dark:border-gold/40">
          <div className="relative inline-block mb-8">
            <div className="text-6xl text-gold animate-float">
              <FaShoppingCart className="mx-auto" />
            </div>
            <div className="absolute -top-2 -right-5 text-2xl animate-[sparkleRotate_2s_ease_infinite]">✨</div>
            <div className="absolute -bottom-2 -left-5 text-xl animate-[sparkleRotate_2s_ease_infinite_reverse]">💎</div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] bg-clip-text text-transparent mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-text-secondary dark:text-gray-300 mb-8">Looks like you haven't added any luxury items yet</p>
          <Link to="/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900 font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/40">
            <FiArrowLeft /> Start Shopping
          </Link>
          <div className="flex justify-center gap-6 mt-12 flex-wrap">
            <span className="px-5 py-2 rounded-full bg-gold/15 dark:bg-gold/30 backdrop-blur-md text-sm text-gold">🎁 New Arrivals</span>
            <span className="px-5 py-2 rounded-full bg-gold/15 dark:bg-gold/30 backdrop-blur-md text-sm text-gold">👑 Best Sellers</span>
            <span className="px-5 py-2 rounded-full bg-gold/15 dark:bg-gold/30 backdrop-blur-md text-sm text-gold">💎 Luxury Collection</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto py-5">
      {/* Cart Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] bg-clip-text text-transparent inline-flex items-center gap-4 flex-wrap justify-center">
          <FaShoppingCart /> Your Luxury Cart
          <span className="text-sm px-3 py-1 rounded-full bg-gold/20 dark:bg-gold/40 backdrop-blur-md text-gold font-semibold">{totalQuantity} Items</span>
        </h1>
        <p className="text-text-secondary dark:text-gray-300 mt-2">Review and manage your selected luxury items</p>
      </div>

      {/* Main Cart Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* Cart Items List */}
        <div className="bg-white/25 dark:bg-gray-800/50 backdrop-blur-2xl rounded-3xl border border-gold/25 dark:border-gold/40 overflow-hidden p-6">
          {/* Header - Hidden on mobile */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_0.5fr] pb-4 border-b border-gold/20 dark:border-gold/40 text-text-secondary dark:text-gray-300 font-semibold text-xs uppercase tracking-wider">
            <span>Product Details</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span></span>
          </div>

          {/* Cart Items List */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-[70px_2fr_1fr_1fr_1fr_0.5fr] items-center gap-4 py-5 border-b border-white/10 dark:border-gray-600/30 transition-all duration-300 hover:bg-gold/10 hover:backdrop-blur-md hover:rounded-2xl hover:mx-[-12px] hover:px-3">
                {/* Image */}
                <div className="relative w-[60px] md:w-[70px] h-[60px] md:h-[70px]">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain bg-white/10 dark:bg-gray-700/30 backdrop-blur-sm rounded-2xl p-2" />
                  <div className="absolute -top-2 -right-2 text-sm animate-[sparkle_2s_ease_infinite]">✨</div>
                </div>
                
                {/* Details */}
                <div className="md:col-span-1">
                  <h3 className="text-sm md:text-base font-semibold text-text-primary dark:text-white mb-1">{item.title}</h3>
                  <span className="text-xs text-gold">
                    {item.category === "men's clothing" ? "👔 Men's Fashion" :
                     item.category === "women's clothing" ? "👗 Women's Fashion" :
                     item.category === "electronics" ? "💻 Electronics" :
                     item.category === "jewelery" ? "💎 Fine Jewelery" :
                     "🛍️ Luxury Item"}
                  </span>
                </div>
                
                {/* Price */}
                <div className="flex justify-between items-center md:flex-col md:items-start gap-1 p-2 md:p-0 bg-gold/5 dark:bg-gold/10 md:bg-transparent rounded-xl">
                  <span className="text-xs text-text-muted dark:text-gray-400 uppercase md:hidden">Price</span>
                  <span className="font-bold text-base md:text-lg bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] bg-clip-text text-transparent">${item.price.toFixed(2)}</span>
                </div>
                
                {/* Quantity */}
                <div className="flex justify-between items-center md:justify-start gap-2 p-2 md:p-0 bg-gold/5 dark:bg-gold/10 md:bg-transparent rounded-xl">
                  <span className="text-xs text-text-muted dark:text-gray-400 uppercase md:hidden">Qty</span>
                  <div className="flex items-center gap-2">
                    <button 
                      className="w-8 h-8 rounded-xl border border-gold/30 dark:border-gold/50 bg-white/15 dark:bg-gray-700/50 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all duration-200 text-text-primary dark:text-white hover:bg-gold-gradient-bg hover:border-gold hover:scale-105 hover:text-gray-900"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      <FiMinus />
                    </button>
                    <span className="font-bold text-base min-w-[30px] text-center dark:text-white">{item.quantity}</span>
                    <button 
                      className="w-8 h-8 rounded-xl border border-gold/30 dark:border-gold/50 bg-white/15 dark:bg-gray-700/50 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all duration-200 text-text-primary dark:text-white hover:bg-gold-gradient-bg hover:border-gold hover:scale-105 hover:text-gray-900"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
                
                {/* Total */}
                <div className="flex justify-between items-center md:flex-col md:items-start gap-1 p-2 md:p-0 bg-gold/5 dark:bg-gold/10 md:bg-transparent rounded-xl">
                  <span className="text-xs text-text-muted dark:text-gray-400 uppercase md:hidden">Total</span>
                  <span className="font-bold text-base md:text-lg bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] bg-clip-text text-transparent">${item.totalPrice.toFixed(2)}</span>
                </div>
                
                {/* Remove Button */}
                <button 
                  className="w-9 h-9 rounded-full bg-transparent border-none cursor-pointer text-text-muted dark:text-gray-400 transition-all duration-200 flex items-center justify-center hover:text-ruby hover:bg-ruby/15 hover:scale-110 md:justify-self-end"
                  onClick={() => dispatch(removeItem(item.id))}
                  title="Remove item"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
          
          {/* Clear Cart Button */}
          <button 
            className="mt-6 px-6 py-3 rounded-full bg-ruby/15 dark:bg-ruby/30 backdrop-blur-md border border-ruby/30 dark:border-ruby/40 text-ruby dark:text-ruby-light font-semibold cursor-pointer transition-all duration-200 flex items-center gap-2 hover:bg-ruby hover:text-white hover:border-ruby"
            onClick={() => dispatch(clearCart())}
          >
            <FiTrash2 /> Clear Cart
          </button>
        </div>

        {/* Cart Summary Section */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/25 dark:bg-gray-800/50 backdrop-blur-2xl rounded-3xl border border-gold/25 dark:border-gold/40 p-7">
            <h3 className="text-xl font-bold text-text-primary dark:text-white mb-6 border-l-3 border-gold pl-3">Order Summary</h3>
            
            <div className="flex justify-between py-3 text-text-secondary dark:text-gray-300">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-3 text-text-secondary dark:text-gray-300">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between py-3 text-emerald dark:text-emerald-light">
                <span>Discount (10%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent my-3"></div>
            
            <div className="flex justify-between py-3 text-xl font-extrabold text-text-primary dark:text-white">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
            
            <div className="my-4 p-3 text-center rounded-full bg-gold/15 dark:bg-gold/30 backdrop-blur-md flex items-center justify-center gap-2 text-sm font-semibold text-gold">
              <FaGem /> You save ${discount.toFixed(2)}
            </div>
            
            <button 
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900 font-bold cursor-pointer transition-all duration-300 mt-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/40"
              onClick={openCheckoutModal}
            >
              ✨ Proceed to Checkout
            </button>
            
            <Link to="/" className="flex items-center justify-center gap-2 mt-5 text-text-secondary dark:text-gray-400 text-sm transition-all duration-200 hover:text-gold hover:gap-3">
              <FiArrowLeft /> Continue Shopping
            </Link>
          </div>
          
          {/* Special Offer Card */}
          <div className="p-6 text-center rounded-3xl border border-gold/30 dark:border-gold/50 bg-gradient-to-br from-gold/15 to-gold/5 dark:from-gold/20 dark:to-gold/10 backdrop-blur-2xl">
            <div className="text-3xl mb-3">🎁</div>
            <h4 className="text-lg font-bold text-gold mb-2">Special Offer</h4>
            <p className="text-sm text-text-secondary dark:text-gray-300 mb-4">Free shipping on orders over $100</p>
            <div className="h-1.5 bg-white/15 dark:bg-gray-600/50 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#c4a43c] to-[#e0c460] transition-all duration-300"
                style={{ width: `${Math.min(100, (totalAmount / 100) * 100)}%` }}
              ></div>
            </div>
            {totalAmount < 100 && (
              <span className="text-xs text-gold">Add ${(100 - totalAmount).toFixed(2)} more for free shipping</span>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={closeCheckoutModal}
        items={items}
        totalAmount={totalAmount}
        finalTotal={finalTotal}
      />
    </div>
  );
};

export default CartPage;