import Navbar from "../navBar/Navbar";
import React, { ReactNode, useEffect, useState } from 'react';
import Footer from "../footer/Footer";

type MainLayoutProps = {
  children: ReactNode;
  isAdmin: boolean;
  onCategoryChange: (category: string) => void;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children, isAdmin, onCategoryChange }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  const fetchCartItemCount = async () => {
    try {
      const response = await fetch('https://abda-e-commerce-backend.onrender.com/api/cart/itemCount', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setCartItemCount(data);
      } else {
        console.error('Error fetching cart item count');
      }
    } catch (error) {
      console.error('Error fetching cart item count:', error);
    }
  };

  useEffect(() => {
    fetchCartItemCount();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onCategoryChange={onCategoryChange} isAdmin={isAdmin} cartItemCount={cartItemCount} />
      <main className="flex-grow mt-16">
        {React.Children.map(children, child =>
          React.cloneElement(child as React.ReactElement<any>, { fetchCartItemCount })
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
