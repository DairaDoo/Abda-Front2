import React, { useState, useEffect } from 'react';
import { ProductInterface, ProductVariant } from '../../../lib/products/ProductInterface';

type ProductTableProps = {
    products: ProductInterface[];
    onEdit: (productId: number, colorId: number) => void;
    onRemove: (id: number, color_id: number) => void;
};

const AdminTable: React.FC<ProductTableProps> = ({ products, onEdit, onRemove }) => {

    const [hoverImage, setHoverImage] = useState<Record<number, boolean>>({})

    const [selectedColors, setSelectedColors] = useState<Record<number, string>>({});


    // Effect to set initial selected color for each product
    useEffect(() => {
        const initialColors = products.reduce((acc, product) => {
            const firstColor = product.products[0]?.color.color_name || '';
            acc[product.general_product_id] = firstColor;
            return acc;
        }, {} as Record<number, string>);

        setSelectedColors(initialColors);
    }, [products]);

    const getImageUrls = (variants: ProductVariant[], color: string) => {
        const variant = variants.find(v => v.color.color_name === color);
        return {
            main: variant?.image_url || 'default-image-url',
            hover: variant?.hover_image_url || 'default-hover-image-url'
        };
    };


    return (
        <div className='w-full flex items-center justify-center mb-2'>
            <table className='w-[90%] border-2 border-gray-400'>
                <thead>
                    <tr>
                        <th className='border-2 border-gray-400 bg-black text-white p-2'>Product</th>
                        <th className='border-2 border-gray-400 bg-black text-white p-2'>Image</th>
                        <th className='border-2 border-gray-400 bg-black text-white'>Section</th>
                        <th className='border-2 border-gray-400 bg-black text-white'>Info</th>
                        <th className='border-2 border-gray-400 bg-black text-white'>Brand</th>
                        <th className='border-2 border-gray-400 bg-black text-white'>Color</th>
                        <th className='border-2 border-gray-400 bg-black text-white'>Value</th>
                        <th className='border-2 border-gray-400 bg-black text-white'>Sizes & Stock</th>
                        <th className='border-2 border-gray-400 bg-black text-white'>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        const selectedColor = selectedColors[product.general_product_id];
                        const { main, hover } = getImageUrls(product.products, selectedColor);
                        const filteredVariants = product.products.filter(v => v.color.color_name === selectedColor);
                        const selectedVariant = product.products.find(v => v.color.color_name === selectedColor);

                        return (
                            <tr className='border-2 border-gray-400' key={product.general_product_id}>
                                <td className='border-2 border-gray-400 text-center'>{product.general_product_name}</td>
                                <td className='border-2 border-gray-400 text-center'>
                                    <div
                                        className='mx-3 mt-3 h-80 rounded-xl overflow-hidden flex justify-center items-center'
                                        onMouseEnter={() => setHoverImage(prev => ({ ...prev, [product.general_product_id]: true }))}
                                        onMouseLeave={() => setHoverImage(prev => ({ ...prev, [product.general_product_id]: false }))}
                                    >
                                        <img
                                            className="object-fit max-h-full max-w-full"
                                            src={hoverImage[product.general_product_id] ? hover : main}
                                            alt={product.general_product_name}
                                        />
                                    </div>
                                </td>
                                <td className='border-2 border-gray-400 text-center'>{product.section.section_name}</td>
                                <td className='border-2 border-gray-400 text-center'>{product.description}</td>
                                <td className='border-2 border-gray-400 text-center'>{product.brand.brand_name}</td>
                                <td className='border-2 border-gray-400 text-center'>
                                    <select className=' p-2 border-2 border-gray-600 rounded-lg '
                                        onChange={(e) => setSelectedColors(prev => ({
                                            ...prev,
                                            [product.general_product_id]: e.target.value
                                        }))}
                                        value={selectedColor || ''}
                                    >
                                        {product.products.map(p => p.color.color_name)
                                            .filter((value, index, self) => self.indexOf(value) === index)
                                            .map(color => (
                                                <option key={color} value={color}>{color}</option>
                                            ))}
                                    </select>
                                </td>
                                <td className='border-2 border-gray-400 text-center text-2xl font-bold text-green-600 '>
                                    ${selectedVariant ? selectedVariant.value : 'N/A'}
                                </td>
                                <td className='border-2 border-gray-400 text-center'>
                                    {filteredVariants.map(variant => (
                                        <div key={`${variant.size.size_id}-${variant.color.color_id}`}>
                                            <span className='italic'>{variant.size.size_name} </span>: In Stock {variant.size_amount.size_amount}
                                        </div>
                                    ))}
                                </td>
                                <td className=''>
                                    <div className='flex flex-col justify-center items-center mb-2'>
                                        <button
                                            className="w-3/4 px-4 mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg text-sm px-4 py-2 focus:outline-none focus:ring-red-300"
                                            onClick={() => {
                                                const selectedVariant = product.products.find(v => v.color.color_name === selectedColor);
                                                if (selectedVariant) {
                                                    onEdit(product.general_product_id, selectedVariant.color.color_id);
                                                }
                                            }}>
                                            Edit
                                        </button>
                                        <button
                                            className="w-3/4 px-4 mt-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg text-sm px-4 py-2 focus:outline-none focus:ring-red-300"
                                            onClick={() => {
                                                
                                                const selectedVariant = product.products.find(v => v.color.color_name === selectedColor);
                                                if (selectedVariant){
                                                    onRemove(product.general_product_id, selectedVariant.color.color_id)
                                                }
                                                }}
                                        >
                                            Remove
                                        </button>
                                    </div></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AdminTable;

