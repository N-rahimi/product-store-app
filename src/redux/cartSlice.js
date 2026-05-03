import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart:', error);
  }
  return { items: [], totalQuantity: 0, totalAmount: 0 };
};

const saveCartToStorage = (cartState) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cartState));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
      
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
      
      saveCartToStorage(state);
      toast.success('Added to cart!');
    },
    
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
      saveCartToStorage(state);
      toast.success('Removed from cart');
    },
    
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.price * item.quantity;
        state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
        state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
        saveCartToStorage(state);
      }
    },
    
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.price * item.quantity;
        state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
        state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
        saveCartToStorage(state);
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
        state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
        saveCartToStorage(state);
        toast.success('Removed from cart');
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      saveCartToStorage(state);
      toast.success('Cart cleared');
    },
  },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;