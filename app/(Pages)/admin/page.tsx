"use client"

import AdminForm from "@/app/components/admin/CreateProducts/AdminForm"
import { useState, useEffect } from "react"
import MainLayout from "@/app/components/home/main-layout/MainLayout"
import AdminTable from "@/app/components/admin/ProductTable/AdminTable";
import FilterComponent from "@/app/components/admin/FilterComponent/FilterComponent";
import { ProductInterface } from "@/app/lib/products/ProductInterface";
import { FilterParams } from "@/app/lib/admin/Filter/FilterType";
import Modal from "@/app/components/admin/Modal/Modal";
import EditAdminForm from "@/app/components/admin/EditProduct/EditAdminForm";
import Loader from "@/app/lib/loader";
import DeleteAdminForm from "@/app/components/admin/DeleteProduct/DeleteProductForm";

export default function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [apiUrl, setApiUrl] = useState('https://abda-e-commerce-backend.onrender.com/api/products/wantedProducts');
    const [sectionName, setSectionName] = useState('Most Wanted Products');

    
    const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<ProductInterface | null>(null);
    
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeletemModalOpen, setDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    

    const openEditModal = () => setEditModalOpen(true);
    const handleCloseEditModal = () => setEditModalOpen(false);

    const openDeleteModal = () => setDeleteModalOpen(true);
    const handleCloseDeleteModal = () => setDeleteModalOpen(false);


    const openCreateModal = () => setCreateModalOpen(true);
    const handleCloseCreateModal = () => setCreateModalOpen(false);

    const [loader, setLoader] = useState(true)
    
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://abda-e-commerce-backend.onrender.com/api/user/getUser', {
                    credentials: "include",
                });

                if (response.ok) {
                 setLoader(false)
                    const content = await response.json();
                    setIsAdmin(content.role_id === 2);
                    console.log(content);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsAdmin(false);
            }
        })();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, []);

    
    
    const fetchProducts = async (filters: FilterParams = {}) => {
        setLoader(true)
        const query = new URLSearchParams();
        Object.keys(filters).forEach(key => {
            const value = filters[key as keyof FilterParams];
            if (value) {
                query.append(key, String(value));
            }
        });
        const url = `https://abda-e-commerce-backend.onrender.com/api/products/filter?${query.toString()}`
        console.log(url)
        const response = await fetch(url);
        if (response.ok) {
            setLoader(false)
            const data = await response.json();
            setProducts(data);
        } else {
            setLoader(false)
            console.error('Failed to fetch products');
        }
    };

   

    const handleFilterChange = (filters: {} | undefined) => {
        console.log(filters);
        fetchProducts(filters);
    };


    const handleEdit = (productId: number, colorId: number) => {
        const product = products.find(p => p.general_product_id === productId);
        if (product) {
            setSelectedProduct(product);
            setSelectedColorId(colorId);
            setEditModalOpen(true);
        }
    };
      
      
    const handleRemove = (productId: number, colorId: number) => {
        const product = products.find(p => p.general_product_id === productId);
        if (product){
            setSelectedProduct(product);
            setSelectedColorId(colorId);
            setDeleteModalOpen(true);
        }
    };

    
  const handleCategoryChange = (category: string) => {
    const apiUrlMap = {
      'men': 'https://abda-e-commerce-backend.onrender.com/api/products/men',
      'women': 'https://abda-e-commerce-backend.onrender.com/api/products/women',
      'wantedProducts': 'https://abda-e-commerce-backend.onrender.com/api/products/wantedProducts'
    };

    const sectionNameMap = {
      'men': "Men's Collection",
      'women': "Women's Collection",
      'wantedProducts': "Most Wanted Products"
    };

    const key = category as keyof typeof apiUrlMap; // assert category as a key of apiUrlMap

    // Check if the key exists in the map to ensure type safety
    if (apiUrlMap[key] && sectionNameMap[key]) {
        setApiUrl(apiUrlMap[key]);
        setSectionName(sectionNameMap[key]);
    } else {
        console.error('Invalid category:', category);

    }
  };

  const reloadProducts = () => {
    fetchProducts();
    setDeleteModalOpen(false); 
};

  if (loader) {
    return <Loader/>;
}
    return (
        <>
        <MainLayout isAdmin={isAdmin} onCategoryChange={handleCategoryChange}>
        <div className="mt-20 flex justify-around">
            <div className="text-4xl">
                Administrate Products
            </div>
            <div className="">
                <FilterComponent onFilterChange={handleFilterChange} />
            </div>
            <div className="">
                <Modal  isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} >
                <AdminForm  onSubmitSuccess={handleCloseCreateModal}
                handleCloseEditModal={handleCloseCreateModal} 
                onProductsChange={reloadProducts}
                />
                </Modal>
            </div>
            <div>
                <button  className="px-6 mt-6 flex items-center justify-center w-full bg-green-500 hover:bg-green-600 focus:bg-green-700 text-white rounded-lg py-3 font-semibold" onClick={openCreateModal}>
                    Create  Product
                </button>
            </div> 
        </div>

        <div className="mt-10 w-full flex items-center justify-center">
        <AdminTable 
              products={products} 
              onEdit={handleEdit} 
              onRemove={handleRemove}
            />
        </div>

                <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
                    {selectedProduct && (
                        <EditAdminForm
                            product={selectedProduct}  
                            colorId={selectedColorId}
                            onSubmitSuccess={handleCloseEditModal}
                            onProductsChange={reloadProducts}
                            handleCloseEditModal={handleCloseEditModal}
                        />
                    )}
                </Modal>

                <Modal isOpen={isDeletemModalOpen} onClose={handleCloseDeleteModal}>
                    {selectedProduct && (
                        <DeleteAdminForm
                            product={selectedProduct}
                            colorId={selectedColorId}
                            onSubmitSuccess={handleCloseDeleteModal}
                            onProductsChange={reloadProducts}
                            handleCloseDeleteModal={handleCloseDeleteModal}/>
                    )}
                </Modal>
        
        </MainLayout>
      </>
    )
}


