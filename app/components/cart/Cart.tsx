import React, { useState, useEffect } from 'react';
import { CartDisplayDto } from '@/app/lib/cart/cartInterface';
import CartItem from './CartItem';
import OrderForm from '../order/orderForm';
import Link from 'next/link';
import CheckoutContainer from '../checkout_container/Checkout';
import Loader from '@/app/lib/loader';
import LoginModal from './LoginModal';
import { set } from 'react-hook-form';


interface CartProps {
    fetchCartItemCount: () => void;
}

export default function Cart({fetchCartItemCount}: CartProps) {
    const [cartItems, setCartItems] = useState<CartDisplayDto[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility

    useEffect(() => {
        // Carga los elementos del carrito desde tu API
        fetch('https://abda-e-commerce-backend.onrender.com/api/cart/getCartInfo', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setCartItems(data);
                const total = data.reduce((acc: number, item: { product_price: number; quantity: number; }) => acc + (item.product_price * item.quantity), 0);
                setTotalPrice(total);
                console.log(cartItems)
                setLoading(false);
            })
            .catch(error => console.error('Error al obtener los elementos del carrito:', error));
    }, []);

    const handleRemoveItem = (productId: number) => {
        setLoading(true)
        fetch('https://abda-e-commerce-backend.onrender.com/api/cart/deleteCartItem', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }),
        })
        .then(response => {
            if (response.ok) {
                setLoading(false)
                setCartItems(currentItems => currentItems.filter(item => item.product_id !== productId));
                setTotalPrice(currentTotal => currentTotal - (cartItems.find(item => item.product_id === productId)?.product_price ?? 0) * (cartItems.find(item => item.product_id === productId)?.quantity ?? 0));
                // Llama a fetchCartItemCount para actualizar el conteo del carrito
                fetchCartItemCount();
            } else {
                setLoading(false)
                console.error('Error al eliminar el producto del carrito:', response.status);
            }
        })
        .catch(error => console.error('Error al eliminar el producto del carrito:', error));
    };
    
    if (loading) {
      return <Loader/>;
    }
    
    return (
        <div className="flex flex-col md:flex-row md:items-start justify-between bg-[#FBF8F3]">
            <div className="flex-1">
                <h2 className='text-center text-2xl md:text-4xl font-bold mb-8 mt-10'>Your Cart</h2>
                <div className="flex flex-wrap">
                    {cartItems.map(item => (
                        <CartItem
                            key={item.product_id}
                            {...item}
                            onRemoveItem={handleRemoveItem}
                        />
                    ))}
                </div>
            </div>
            <div className="flex justify-center md:w-1/4 mt-28 ">
                <div className="bg-gray-100 rounded-lg shadow-md p-6">
                    <div className="mb-4 text-xl font-bold">
                        Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                    </div>
                    <CheckoutContainer />
                </div>
            </div>
            {/* Render the modal within the Cart component */}
            <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onLogin={() => {}} />
        </div>
    );
}
