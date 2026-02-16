import React, { useState } from 'react';
import Layout from './components/Layout';
import OrdersPage from './pages/OrdersPage';
import MenuPage from './pages/MenuPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('orders');

  const renderPage = () => {
    switch (currentPage) {
      case 'orders':
        return <OrdersPage />;
      case 'menu':
        return <MenuPage />;
      default:
        return <OrdersPage />;
    }
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;