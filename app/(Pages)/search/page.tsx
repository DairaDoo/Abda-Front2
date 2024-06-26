"use client"

import MainLayout from "@/app/components/home/main-layout/MainLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ProductInterface } from "@/app/lib/products/ProductInterface";
import ProductsSearchContainer from "@/app/components/home/Search bar/ProductsSearchContainer";

export default function Search() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const queryParam = searchParams.get('query');
        setQuery(queryParam || '');

        (async () => {
            try {
                const response = await fetch('https://abda-e-commerce-backend.onrender.com/api/user/getUser', {
                    credentials: "include",
                });
                if (response.ok) {
                    const content = await response.json();
                    setIsLoggedIn(true);
                    setIsAdmin(content.role_id === 2);
                } else {
                    setIsLoggedIn(false);
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoggedIn(false);
                setIsAdmin(false);
            }

            if (queryParam) {
                const searchResponse = await fetch(`https://abda-e-commerce-backend.onrender.com/api/search?query=${queryParam}`);
                const data = await searchResponse.json();
                setProducts(data);
            }
        })();
    }, []);

    
    const sectionName = `Search Results for "${query}"`;

    return (
        <MainLayout isAdmin={isAdmin} onCategoryChange={() => {}}>
            <div>
                <ProductsSearchContainer products={products} section_name={sectionName} />
            </div>
        </MainLayout>
    );
}