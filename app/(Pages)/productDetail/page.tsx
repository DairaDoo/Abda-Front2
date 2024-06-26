"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/app/components/home/main-layout/MainLayout";
import ProductDetail from "@/app/components/product_detail/product_detail"; // Asegúrate de ajustar esta ruta según la ubicación de tu archivo
import { useRouter } from "next/navigation";

interface productDetailProps {
    fetchCartItemCount: () => void;
}

const ProductDetailPage: React.FC<productDetailProps> = ({ fetchCartItemCount }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [apiUrl, setApiUrl] = useState('https://abda-e-commerce-backend.onrender.com/api/products/wantedProducts');
  const [sectionName, setSectionName] = useState('Most Wanted Products');


  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://abda-e-commerce-backend.onrender.com/api/user/getUser", {
          credentials: "include",
        });
        if (response.ok) {
          const content = await response.json();
          setIsLoggedIn(true);
          setIsAdmin(content.role_id === 2);
          console.log(content);
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    })();
  }, []);

  

  const handleCategoryChange = (category: string) => {
    setApiUrl(`https://abda-e-commerce-backend.onrender.com/api/products/${category}`);
    setSectionName(category === 'men' ? 'Men\'s Collection' : 'Women\'s Collection');
  };

  return (
    <>
      <MainLayout isAdmin={isAdmin} onCategoryChange={handleCategoryChange}>
        <ProductDetail isLoggedIn={isLoggedIn} isAdmin={isAdmin} fetchCartItemCount={fetchCartItemCount}/>
      </MainLayout>
    </>
  );
}

export default ProductDetailPage;
