import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { IoBook, IoCart, IoPerson } from 'react-icons/io5';

const Layout = ({ children, currentPage, onPageChange, cart = [] }) => {
  // Initialize with proper mobile detection
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768);

  // Update mobile detection on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex">
      {/* Backdrop for mobile - appears behind sidebar when open */}
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={onPageChange}
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        onClose={closeSidebar}
      />
      
      {/* Main content area */}
      <div className={`flex-1 flex flex-col ${isSidebarOpen && !isMobile ? 'md:ml-64' : ''} transition-all duration-300`}>
        {/* Header */}
        <Header onToggleSidebar={toggleSidebar} />
        
        {/* Main content */}
        <main className="flex-1 px-4 py-4 pb-24 md:pb-4">
          {children}
        </main>
      </div>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] z-50 md:hidden flex justify-around items-center py-3 px-4">
        <button
          onClick={() => onPageChange('menu')}
          className={`flex flex-col items-center gap-1 py-1.5 px-4 rounded-xl transition-all duration-300 cursor-pointer ${
            currentPage === 'menu'
              ? 'text-emerald-600 font-bold scale-105 bg-emerald-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
          }`}
        >
          <IoBook className="w-6 h-6" />
          <span className="text-[11px] tracking-wide">Menyu</span>
        </button>

        <button
          onClick={() => onPageChange('order')}
          className={`relative flex flex-col items-center gap-1 py-1.5 px-4 rounded-xl transition-all duration-300 cursor-pointer ${
            currentPage === 'order'
              ? 'text-emerald-600 font-bold scale-105 bg-emerald-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
          }`}
        >
          <IoCart className="w-6 h-6" />
          <span className="text-[11px] tracking-wide">Buyurtma</span>
          {cart.length > 0 && (
            <span className="absolute top-1 right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md animate-pulse">
              {cart.length}
            </span>
          )}
        </button>

        <button
          onClick={() => onPageChange('waiter-rating')}
          className={`flex flex-col items-center gap-1 py-1.5 px-4 rounded-xl transition-all duration-300 cursor-pointer ${
            currentPage === 'waiter-rating'
              ? 'text-emerald-600 font-bold scale-105 bg-emerald-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
          }`}
        >
          <IoPerson className="w-6 h-6" />
          <span className="text-[11px] tracking-wide">Ofitsiantlar</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;