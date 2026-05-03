import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

const AppSettingsContext = createContext();

// دریافت تنظیمات ذخیره شده از localStorage
const getInitialState = () => {
  const savedTheme = localStorage.getItem('theme');
  const savedViewMode = localStorage.getItem('viewMode');
  const savedCategory = localStorage.getItem('selectedCategory');
  const savedSearchQuery = localStorage.getItem('searchQuery');
  
  return {
    theme: savedTheme || 'light',
    viewMode: savedViewMode || 'grid',
    selectedCategory: savedCategory || 'all',
    searchQuery: savedSearchQuery || '', 
  };
};

const initialState = getInitialState();

const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_SEARCH_QUERY': 
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

export const AppSettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // ذخیره خودکار در localStorage
  useEffect(() => {
    localStorage.setItem('theme', state.theme);
    localStorage.setItem('viewMode', state.viewMode);
    localStorage.setItem('selectedCategory', state.selectedCategory);
    localStorage.setItem('searchQuery', state.searchQuery); // اضافه شده
    
    // اعمال تم به body
    document.body.className = state.theme;
  }, [state.theme, state.viewMode, state.selectedCategory, state.searchQuery]);

  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const setViewMode = (mode) => {
    dispatch({ type: 'SET_VIEW_MODE', payload: mode });
  };

  const setCategory = (category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const value = {
    settings: state,
    setTheme,
    setViewMode,
    setCategory,
    setSearchQuery,
    isSettingsOpen,
    setIsSettingsOpen,
  };

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used within AppSettingsProvider');
  }
  return context;
};