import React, { useState } from 'react';
import { menuCategories } from '../data/menuData';

const MenuPage = ({ cart, setCart, onNavigateToOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0].id);

  const currentCategory = menuCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🍽️ Menyu</h1>
          <p className="text-gray-600">Mahsulotlarni tanlang va savatga qo'shing</p>
        </div>
        {cart.length > 0 && (
          <button
            onClick={onNavigateToOrder}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="text-2xl">🛒</span>
            <div className="text-left">
              <div className="text-sm opacity-90">Savat</div>
              <div className="font-bold">{cart.length} mahsulot</div>
            </div>
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap shadow-md hover:shadow-lg transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentCategory.products.map((product) => {
          const cartItem = cart.find(item => item.id === product.id);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <div
              key={product.id}
              className="bg-black/80 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 border border-gray-700/50 hover:border-gray-500/50 animate-fade-in"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                {quantity > 0 && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg">
                    {quantity}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 bg-gradient-to-b from-black/50 to-black/70 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl font-bold text-blue-400 drop-shadow-lg">
                    {product.price.toLocaleString()}
                  </p>
                  <span className="text-sm text-gray-300">so'm</span>
                </div>
                
                {quantity > 0 ? (
                  <div className="flex items-center justify-between bg-black/40 backdrop-blur-sm rounded-lg p-2 border border-gray-600/30">
                    <button
                      onClick={() => {
                        const newQuantity = quantity - 1;
                        if (newQuantity === 0) {
                          setCart(cart.filter(item => item.id !== product.id));
                        } else {
                          setCart(cart.map(item =>
                            item.id === product.id
                              ? { ...item, quantity: newQuantity }
                              : item
                          ));
                        }
                      }}
                      className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 font-bold text-xl shadow-md hover:shadow-lg transition-all hover:scale-110"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-white px-4">{quantity}</span>
                    <button
                      onClick={() => {
                        setCart(cart.map(item =>
                          item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                        ));
                      }}
                      className="w-10 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 font-bold text-xl shadow-md hover:shadow-lg transition-all hover:scale-110"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setCart([...cart, { ...product, quantity: 1 }]);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-md hover:shadow-lg hover:scale-105 transform"
                  >
                    🛒 Qo'shish
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuPage;