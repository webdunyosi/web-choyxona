import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, currentPage, onPageChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // On desktop, open sidebar by default
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
        <main className="flex-1 px-4 py-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;