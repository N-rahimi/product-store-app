import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../api/productsApi";
import ProductCard from "./ProductCard";
import { useAppSettings } from "../context/AppSettingsContext";
import { FiPackage, FiAlertCircle, FiSearch } from "react-icons/fi";

// Skeleton Loader Component
const ProductSkeleton = ({ isListView = false }) => {
  if (isListView) {
    return (
      <div className="flex gap-5 p-5 bg-white/20 dark:bg-gray-800/50 backdrop-blur-lg rounded-3xl border border-white/30 dark:border-gray-600/50">
        <div className="w-[120px] h-[120px] flex-shrink-0 bg-white/10 dark:bg-gray-700/50 rounded-2xl animate-shimmer"></div>
        <div className="flex-1 p-0">
          <div className="h-4 w-4/5 bg-white/15 dark:bg-gray-700/50 rounded-lg mb-3 animate-shimmer"></div>
          <div className="h-3 w-2/5 bg-white/10 dark:bg-gray-700/40 rounded-lg mb-4 animate-shimmer"></div>
          <div className="h-6 w-1/3 bg-white/15 dark:bg-gray-700/50 rounded-lg mb-4 animate-shimmer"></div>
          <div className="h-10 w-full bg-white/10 dark:bg-gray-700/40 rounded-full animate-shimmer"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white/20 dark:bg-gray-800/50 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/30 dark:border-gray-600/50">
      <div className="w-full h-[220px] bg-white/10 dark:bg-gray-700/50 animate-shimmer"></div>
      <div className="p-5">
        <div className="h-4 w-4/5 bg-white/15 dark:bg-gray-700/50 rounded-lg mb-3 animate-shimmer"></div>
        <div className="h-3 w-2/5 bg-white/10 dark:bg-gray-700/40 rounded-lg mb-4 animate-shimmer"></div>
        <div className="h-6 w-1/3 bg-white/15 dark:bg-gray-700/50 rounded-lg mb-4 animate-shimmer"></div>
        <div className="h-10 w-full bg-white/10 dark:bg-gray-700/40 rounded-full animate-shimmer"></div>
      </div>
    </div>
  );
};

const ProductList = () => {
  const { settings, setCategory } = useAppSettings();
  const { searchQuery, selectedCategory, viewMode } = settings;

  // فقط یک بار محصولات را از API میگیریم (بدون وابستگی به searchQuery)
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: productsApi.getAllProducts,
    staleTime: 5 * 60 * 1000, // 5 دقیقه معتبر بماند
    cacheTime: 10 * 60 * 1000,
  });

  // فیلتر کردن محصولات در سمت کلاینت با useMemo (اجرا نمیشود مگر اینکه محصولات یا فیلترها تغییر کنند)
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    let result = [...products];
    
    // فیلتر بر اساس دسته‌بندی
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }
    
    // فیلتر بر اساس جستجو (سمت کلاینت، بدون رفرش API)
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (product) => 
          product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          (product.description && product.description.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [products, selectedCategory, searchQuery]); // فقط وقتی اینها تغییر کنند دوباره محاسبه شود

  if (isLoading) {
    return (
      <div className="mt-6">
        <div className="flex items-center justify-center gap-3 mb-8 p-5 bg-white/15 dark:bg-gray-800/40 backdrop-blur-lg rounded-full">
          <div className="w-6 h-6 border-2 border-gold/20 border-t-gold rounded-full animate-spin-slow"></div>
          <span className="text-text-secondary dark:text-gray-300">Loading luxury products...</span>
        </div>
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
          : "flex flex-col gap-6"
        }>
          {[...Array(6)].map((_, i) => (
            <ProductSkeleton
              key={i}
              isListView={viewMode === "list"}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 px-8 bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-600/50">
        <div className="text-5xl text-gold mb-5">
          <FiAlertCircle className="mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-text-primary dark:text-white mb-2">Failed to load products</h3>
        <p className="text-text-secondary dark:text-gray-300 mb-6">{error.message || "Something went wrong. Please try again."}</p>
        <button 
          className="px-8 py-3 rounded-full bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900 font-semibold cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/40"
          onClick={() => refetch()}
        >
          Try Again
        </button>
      </div>
    );
  }

  // حالت No Result برای جستجو
  if (filteredProducts.length === 0 && searchQuery && searchQuery.trim() !== '') {
    return (
      <div className="text-center py-16 px-8 bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-600/50">
        <div className="text-5xl text-gold mb-5">
          <FiSearch className="mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-text-primary dark:text-white mb-2">No results found</h3>
        <p className="text-text-secondary dark:text-gray-300 mb-4">
          No products matching "<span className="text-gold font-semibold">{searchQuery}</span>" were found
        </p>
        <p className="text-text-muted dark:text-gray-400 text-sm mb-6">
          Try searching with different keywords or browse all products
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button 
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900 font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/40"
            onClick={() => {
              setCategory("all");
            }}
          >
            View All Products
          </button>
        </div>
      </div>
    );
  }

  // حالت No Result برای دسته‌بندی
  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16 px-8 bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-600/50">
        <div className="text-5xl text-gold mb-5">
          <FiPackage className="mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-text-primary dark:text-white mb-2">No products found</h3>
        <p className="text-text-secondary dark:text-gray-300 mb-6">Try changing the category filter</p>
        <button 
          className="px-6 py-2.5 rounded-full bg-gold/20 dark:bg-gold/30 backdrop-blur-md border border-gold/30 dark:border-gold/50 text-gold dark:text-gold-light font-semibold cursor-pointer transition-all duration-300 hover:bg-gold hover:text-gray-900"
          onClick={() => setCategory("all")}
        >
          View All Products
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {/* Stats Bar با نمایش اطلاعات جستجو */}
      <div className="flex justify-between items-center gap-3 mb-6 text-sm text-text-muted dark:text-gray-400 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {searchQuery && (
            <div className="px-3 py-1.5 rounded-full bg-gold/15 dark:bg-gold/25 backdrop-blur-sm text-gold text-xs flex items-center gap-2 animate-fade-in">
              <FiSearch size={12} />
              <span>Search: "<span className="font-semibold">{searchQuery}</span>"</span>
              <button
                onClick={() => {
                  // پاک کردن جستجو از طریق context
                  const { setSearchQuery } = useAppSettings();
                  setSearchQuery('');
                }}
                className="ml-1 w-4 h-4 rounded-full bg-gold/30 hover:bg-gold/50 flex items-center justify-center transition-all"
              >
                ×
              </button>
            </div>
          )}
          {selectedCategory !== "all" && (
            <div className="px-3 py-1.5 rounded-full bg-gold/15 dark:bg-gold/25 backdrop-blur-sm text-gold text-xs flex items-center gap-2">
              <span>Category: {selectedCategory}</span>
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <span className="flex items-center gap-1">
            <span className="text-gold">✦</span> Showing {filteredProducts.length} products
          </span>
          <span className="text-gold">|</span>
          <span>Luxury Collection</span>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className={viewMode === "grid"
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        : "flex flex-col gap-6"
      }>
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
          >
            <ProductCard
              product={product}
              isListView={viewMode === "list"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;