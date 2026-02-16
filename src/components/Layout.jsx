import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, currentPage, onPageChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex">
      {/* Sidebar */}
      {isSidebarOpen && (
        <Sidebar currentPage={currentPage} onPageChange={onPageChange} />
      )}
      
      {/* Main content area */}
      <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
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