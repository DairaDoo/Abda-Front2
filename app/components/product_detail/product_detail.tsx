// ProductDetail.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  ProductInterface,
  ColorInterface,
  ProductVariant,
  SizeAmountInterface,
} from "../../lib/products/ProductInterface";
import Loader from "@/app/lib/loader";
import LoginModal from "@/app/components/cart/LoginModal";
import { useRouter } from "next/navigation";

interface ProductDetailProps {
    isLoggedIn: boolean;
    isAdmin: boolean;
    fetchCartItemCount: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ isLoggedIn, isAdmin, fetchCartItemCount}) => {

  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<ColorInterface | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [sizeAmountInterface, setSizeAmountInterface] = useState<SizeAmountInterface | null>(null);
  const [availableQuantity, setAvailableQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const productColor = localStorage.getItem("selectedColorId");
  const [uniqueColors, setUniqueColors] = useState<ColorInterface[]>([]);
  const [uniqueSizes, setUniqueSizes] = useState<string[]>([]);
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    setAvailableQuantity(sizeAmountInterface?.size_amount || 1);
  }, [sizeAmountInterface]);

  useEffect(() => {
    const fetchProduct = async () => {
      const productVariantId = localStorage.getItem("selectedProductVariantId");
      if (!productVariantId) {
        console.error("Product variant ID not found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://abda-e-commerce-backend.onrender.com/api/products/getProductById", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productVariantId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data = await response.json();
        if (data && Array.isArray(data) && data.length > 0) {
          const initialProduct: ProductInterface = data[0];
          setProduct(initialProduct);

          const storedColorId = parseInt(localStorage.getItem("selectedColorId") || "0");
          const initialVariant = initialProduct.products.find(
            (p) => p.color.color_id === storedColorId
          ) || initialProduct.products[0];

          setSelectedVariant(initialVariant);
          setSelectedColor(initialVariant.color);
          setSizeAmountInterface(initialVariant.size_amount);
          setAvailableQuantity(initialVariant.size_amount.size_amount || 1);
        } else {
          console.error("Product data is not in expected format:", data);
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  

  const handleCartClick = async () => {
    fetchCartItemCount()
    if (!isLoggedIn) {
      console.log("Not logged in!");
      setShowLoginModal(true); // Show the login modal if user is not logged in
    } else {
      console.log("Logged in!");
      if (selectedProductVariant) {
        addToCart(selectedProductVariant);
      }
    }
    try {
      setLoading(true)
      const response = await fetch("https://abda-e-commerce-backend.onrender.com/api/cart/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // No es necesario el header 'Authorization' si usas cookies
        },
        credentials: "include", // Asegúrate de incluir las cookies en la solicitud
        body: JSON.stringify({
          productId: selectedProductVariant?.product_id,
          quantity: selectedQuantity, // Assuming quantity is always 1 for now
        }),
      });

      const data = await response.json(); // Esto convierte la respuesta del servidor en un objeto JSON
      console.log("Response from server:", data); // Aquí se registra la respuesta del servidor

      if (response.ok) {
      setLoading(false)
        console.log("Product added to cart successfully");
      } else {
        setLoading(false)
        throw new Error("Failed to add product to cart");
      }
    } catch (error) {
      setLoading(false)
      console.error("Error adding product to cart:", error);
    }
  };

  const addToCart = (selectedProductVariant: ProductVariant | undefined) => {
    if (selectedProductVariant) {
      // Add logic here to add the selected product variant to the cart
      console.log("Adding product to cart:", selectedProductVariant);
      fetchCartItemCount();
      console.log("fetchCartItemCount function:", fetchCartItemCount);

    } else {
      console.error("No product variant selected to add to cart.");
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const newVariant = product?.products.find(
      (p) =>
        p.color.color_id === (selectedColor?.color_id || 0) &&
        p.size.size_name === size
    );
    if (newVariant) {
      setSelectedVariant(newVariant);
    }
    const newSizeAmount = newVariant?.size_amount || null;
    setSizeAmountInterface(newSizeAmount);
    setAvailableQuantity(newSizeAmount?.size_amount || 1);
  };

  const handleColorChange = useCallback(
    (color: ColorInterface) => {
      setDropdownOpen(false);
      const newVariant = product?.products.find(
        (p) =>
          p.color.color_id === color.color_id &&
          p.size.size_name === selectedSize
      );
      if (newVariant) {
        setSelectedVariant(newVariant);
        setSelectedColor(color);
      }
      const newSizeAmount = newVariant?.size_amount || null;
      setSizeAmountInterface(newSizeAmount);
      setAvailableQuantity(newSizeAmount?.size_amount || 1);
    },
    [product, selectedSize]
  );

  useEffect(() => {
    if (product) {
      const colorMap = new Map<number, ColorInterface>();
      product.products.forEach((variant) => {
        if (!colorMap.has(variant.color.color_id)) {
          colorMap.set(variant.color.color_id, variant.color);
        }
      });
      setUniqueColors(Array.from(colorMap.values()));
      const sizes = new Set(product.products.map((p) => p.size.size_name));
      setUniqueSizes(Array.from(sizes));
      setSelectedSize(product.products[0].size.size_name);
    }
  }, [product]);

  const handleIncrement = useCallback(() => {
    setSelectedQuantity(Math.min(selectedQuantity + 1, availableQuantity));
  }, [selectedQuantity, availableQuantity]);

  const handleDecrement = useCallback(() => {
    setSelectedQuantity(Math.max(selectedQuantity - 1, 1));
  }, [selectedQuantity]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(event.target.value);
    if (!isNaN(quantity) && quantity > 0 && quantity <= availableQuantity) {
      setSelectedQuantity(quantity);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <div>Error fetching product details</div>;
  }

  const selectedProductVariant = product.products.find(
    (variant) =>
      variant.color.color_id === selectedColor?.color_id &&
      variant.size.size_name === selectedSize
  );
  console.log("General product name is: ", product.general_product_name);
  console.log("Color is", productColor);
  console.log("size amount", sizeAmountInterface?.size_amount);
  console.log("size amount", sizeAmountInterface?.size_amount_id);

  const renderColorOptions = () => {
    return (
      <div className="relative">
        <button
          type="button"
          className={`inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
            dropdownOpen ? "focus:ring-blue-500" : ""
          }`}
          id="menu-button"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {selectedColor ? selectedColor.color_name : "Select Color"}
        </button>
        {dropdownOpen && uniqueColors.length > 0 && (
          <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-md">
            {uniqueColors.map((color, index) => (
              <button
                key={index}
                className={`block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none ${
                  color.color_id === selectedColor?.color_id
                    ? "bg-gray-100"
                    : ""
                }`}
                onClick={() => handleColorChange(color)}
              >
                {color.color_name}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4">
            <div className="grid gap-4 grid-cols-2">
              <img
                className="rounded-lg border border-transparent shadow-xl"
                src={
                  selectedProductVariant ? selectedProductVariant.image_url : ""
                }
                alt={`Image of ${
                  selectedProductVariant
                    ? selectedProductVariant.color.color_name
                    : ""
                }`}
              />
              <img
                className="rounded-lg border border-transparent shadow-xl"
                src={
                  selectedProductVariant
                    ? selectedProductVariant.hover_image_url
                    : ""
                }
                alt={`Image of ${
                  selectedProductVariant
                    ? selectedProductVariant.color.color_name
                    : ""
                }`}
              />
            </div>
            <div className="flex-1 p-4 rounded-lg border border-gray-200">
              <div className="text-sm">
                <p>{product.section.section_name}</p>
              </div>
              <div className="text-sm">
                <p>{product.brand.brand_name}</p>
              </div>
              <div className="text-2xl">
                <h1>{product.general_product_name}</h1>
              </div>
              <div className="py-3 text-base">
                <p>{product.description}</p>
              </div>
              <div className="text-3xl font-bold text-green-600 ">
                <p>
                  ${selectedProductVariant ? selectedProductVariant.value : ""}
                </p>
              </div>
              <div className="py-3 inline-block text-left">
                <h2>Select Color:</h2>
                <div className="flex">{renderColorOptions()}</div>
              </div>
              <div className="flex py-3 items-center">
                <h2 className="mr-2">Size:</h2>
                <select
                  value={selectedSize}
                  onChange={(e) => handleSizeChange(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  {uniqueSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="py-3">
                <p>Stock: {availableQuantity}</p>
              </div>

              <div className="flex items-center">
                <button
                  className="px-3 py-1 mr-2 text-sm bg-gray-200 rounded-full"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <input
                  type="number"
                  value={selectedQuantity}
                  onChange={handleQuantityChange}
                  min={0}
                  max={availableQuantity}
                  className="block w-24 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md"
                />
                <button
                  className="px-3 py-1 ml-2 text-sm bg-gray-200 rounded-full"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
              <a
                href="#"
                className="flex mt-8 items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={handleCartClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0 2 2 010 4zm-8 2a2 2 114 0 2 2 014 0 2 2 01-4 0z"
                  />
                </svg>
                Add to cart
              </a>
            </div>
          </div>
        </div>
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={() => console.log("User logged in")}
        />
    </>
  );
}

export default ProductDetail;
