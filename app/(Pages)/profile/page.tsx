"use client"

import Navbar from "@/app/components/home/navBar/Navbar"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie';
import MainLayout from "@/app/components/home/main-layout/MainLayout";

export default function Admin() {
    const router = useRouter();
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

    const handleLogout = async () => {
        try {
            // Make a request to the backend logout endpoint
            const response = await fetch('https://abda-e-commerce-backend.onrender.com/api/user/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                console.log('Logout successful');
                Cookies.set('isLoggedIn', 'false');
                setIsLoggedIn(false);
                router.push('/')

            } else {
                console.error('Logout failed:', await response.text());
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };


    return (
        <>
            <div>
                <MainLayout isAdmin={isAdmin} onCategoryChange={handleCategoryChange}>
                    <div className="bg-[#FBF8F3] min-h-screen">
                        <div className="p-10">
                            <p className="text-center text-gray-800">
                                {isLoggedIn ? message : 'You need to log in.'}
                            </p>
                        </div>
                        {isLoggedIn && (
                            <div className="flex justify-center">
                                <div className="flex items-center space-x-4">
                                    {/* Logout Button */}
                                    <button onClick={handleLogout} className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </MainLayout>
            </div>
        </>
    );
    
    
    
}