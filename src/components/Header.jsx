import React from 'react';
import { IoMenu } from 'react-icons/io5';

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="bg-linear-to-r from-emerald-600 to-teal-600 shadow-lg sticky top-0 z-10">
      <div className="px-6 py-2">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <img 
              src="/logo.png" 
              alt="Choyxona Tea House Logo" 
              className="h-16 w-16 object-contain rounded-lg bg-white/10 p-1 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white drop-shadow-md">
              Choyxona
            </h1>
            <p className="text-emerald-50 mt-1 text-sm">
              Menyuni boshqarish tizimi
            </p>
          </div>
          <div className="shrink-0">
            <button
              onClick={onToggleSidebar}
              className="p-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              aria-label="Toggle sidebar"
            >
              <IoMenu className="w-7 h-7 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;