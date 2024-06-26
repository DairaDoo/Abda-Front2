// Components/ProductsContainer.js
'use client'
import React from 'react';
import ProductCard from '../../products/ProductCard';
import { ProductInterface } from '../../../lib/products/ProductInterface';

interface ProductsContainerProps {
    products: ProductInterface[];
    section_name: string;
    fetchCartItemCount: () => void; // Adding this line
}

const ProductsSearchContainer: React.FC<ProductsContainerProps> = ({ products, section_name, fetchCartItemCount }) => {
    return (
        <>
            <h2 className="text-2xl md:text-4xl font-bold text-center">{section_name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <ProductCard key={product.general_product_id} product={product} fetchCartItemCount={fetchCartItemCount} /> // Added fetchCartItemCount here
                ))}
            </div>
        </>
    );
};

export default ProductsSearchContainer;