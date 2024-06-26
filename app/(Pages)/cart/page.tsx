"use client"

import MainLayout from "@/app/components/home/main-layout/MainLayout";
import { useState, useEffect } from "react";
import Cart from "@/app/components/cart/Cart";

interface CartPageProps {
    fetchCartItemCount: () => void;
}

export default function CartPage({ fetchCartItemCount }: CartPageProps) {
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const [apiUrl, setApiUrl] = useState('https://abda-e-commerce-backend.onrender.com/api/products/getAllProducts');
    const [sectionName, setSectionName] = useState('Most Wanted Products');


    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://abda-e-commerce-backend.onrender.com/api/user/getUser', {
                    credentials: "include",
                });
                if (response.ok) {
                    const content = await response.json();
                    setMessage(`${content.name} ${content.last_name} is logged in with an email: ${content.email}. Its roles is the # ${content.role_id}`);
                    setIsLoggedIn(true);
                    setIsAdmin(content.role_id === 2);
                    console.log(content);
                } else {
                    setIsLoggedIn(false);
                    setIsAdmin(false);
                    setMessage('You need to log in.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoggedIn(false);
                setIsAdmin(false);
                setMessage('You need to log in.');
            }
        })();
    }, []);

    const handleCategoryChange = (category: string) => {
        setApiUrl(`https://abda-e-commerce-backend.onrender.com/api/products/${category}`);
        setSectionName(category === 'men' ? 'Men\'s Collection' : 'Women\'s Collection');
    };

    return (
        <div className="bg-[#FBF8F3] min-h-screen">
            <MainLayout isAdmin={isAdmin} onCategoryChange={handleCategoryChange}> 
                <Cart fetchCartItemCount={fetchCartItemCount} />
            </MainLayout>
        </div>
    );
}
