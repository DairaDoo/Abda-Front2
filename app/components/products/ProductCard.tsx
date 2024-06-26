import React, { useState, useEffect } from 'react';
import { ProductInterface } from '../../lib/products/ProductInterface';
import LoginModal from '@/app/components/cart/LoginModal';
import { useRouter } from "next/navigation";
import { colors } from '@mui/material';

interface ProductCardProps {
    product: ProductInterface;
    fetchCartItemCount: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, fetchCartItemCount}) => {

    const [selectedColor, setSelectedColor] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedVariant, setSelectedVariant] = useState(product.products[0]);
    const [hoverImage, setHoverImage] = useState<boolean>(false);
    const [uniqueSizes, setUniqueSizes] = useState<string[]>([]);
    const [uniqueColors, setUniqueColors] = useState<string[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const router = useRouter();

    

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://abda-e-commerce-backend.onrender.com/api/user/getUser', {
                    credentials: "include",
                });
                if (response.ok) {
                    const content = await response.json();
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoggedIn(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (product.products.length > 0) {
            const sizes = new Set(product.products.map(p => p.size.size_name));
            setUniqueSizes(Array.from(sizes));
            const colors = new Set(product.products.map(p => p.color.color_name));
            setUniqueColors(Array.from(colors));
            
            setSelectedColor(product.products[0].color.color_name);
            setSelectedSize(product.products[0].size.size_name);
            setSelectedVariant(product.products[0]);
        }
    }, [product.products]);

    useEffect(() => {
        const variant = product.products.find(variant =>
            variant.color.color_name === selectedColor && variant.size.size_name === selectedSize
        );
        setSelectedVariant(variant || product.products[0]);
    }, [selectedColor, selectedSize, product.products]);

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
    };

    const handleSizeChange = (size: string) => {
        setSelectedSize(size);
    };

    const handleViewDetails = async () => {
        try {
            const response = await fetch('https://abda-e-commerce-backend.onrender.com/api/products/addCountMostWanted', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId: selectedVariant.product_id }),
            });
            if (response.ok) {
                console.log('Product variant sent successfully');
            } else {
                console.error('Failed to send product variant to the backend');
            }
        } catch (error) {
            console.error('Error sending product variant to the backend:', error);
        }
    
        localStorage.setItem('selectedProductVariantId', selectedVariant.product_id.toString());
        localStorage.setItem('selectedColorId', selectedVariant.color.color_id.toString());
        
        router.push('/productDetail');
    };
    
    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
        } else {
            try {
                const response = await fetch('https://abda-e-commerce-backend.onrender.com/api/cart/addToCart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include', 
                    body: JSON.stringify({
                        productId: selectedVariant?.product_id,
                        quantity: 1 
                    })
                });
    
                const data = await response.json(); 
                console.log('Response from server:', data); 
    
                if (response.ok) {
                    console.log('Product added to cart successfully');
                    fetchCartItemCount();
                } else {
                    throw new Error('Failed to add product to cart');
                }
            } catch (error) {
                console.error('Error adding product to cart:', error);
            }
        }
    };

    return (
        <div className="m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div onClick={handleViewDetails} className='cursor-pointer'>
                <div className='mx-3 mt-3 h-80 rounded-xl overflow-hidden flex justify-center items-center'
                     onMouseEnter={() => setHoverImage(true)}
                     onMouseLeave={() => setHoverImage(false)}>
                    <img
                        className="object-contain max-h-full max-w-full"
                        src={hoverImage ? selectedVariant?.hover_image_url : selectedVariant?.image_url}
                        alt={product.general_product_name}
                    />
                </div>
                <div className="px-5 pb-5">
                    <h5 className="text-xl tracking-tight text-slate-900">
                        <span className='font-medium'>{product.general_product_name},</span>
                        <span className='italic mx-1'>{product.brand.brand_name}</span>
                    </h5>
                </div>
            </div>
            <div className="px-5">
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col justify-between">
                        <div className="flex justify-between mb-2">
                            <span className="text-3xl font-bold text-green-600">
                                ${selectedVariant?.value}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <div className="">
                                <div className="flex">
                                    <p className="mb-1">Size:</p>
                                    <select value={selectedSize} onChange={e => handleSizeChange(e.target.value)}>
                                        {uniqueSizes.map(size => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>Stock: {selectedVariant.size_amount.size_amount}</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex flex-col">
                                    <p className="mb-2">Color:</p>
                                </div>
                                <div className="flex flex-col">
                                    <select value={selectedColor} onChange={e => handleColorChange(e.target.value)}>
                                        {uniqueColors.map(color => (
                                            <option key={color} value={color}>
                                                {color}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-center mb-3">
                        <button onClick={handleAddToCart} className="w-full py-2.5 bg-slate-900 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            {showLoginModal && (
                <LoginModal 
                isOpen={showLoginModal} 
                onClose={() => setShowLoginModal(false)} 
                onLogin={() => {
                    setIsLoggedIn(true);
                    setShowLoginModal(false);
                }}
            />
            )}
        </div>
    );
};

export default ProductCard;
