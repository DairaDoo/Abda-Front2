import React, { useEffect, useState } from 'react';
import { ProductInterface, ProductVariant } from '@/app/lib/products/ProductInterface';
import Modal from '../Modal/Modal';
import ErrorModal from '../Modal/ErrorModal';
import Loader from '@/app/lib/loader';

interface EditAdminFormProps {
  product?: ProductInterface;
  colorId?: number | null;
  onSubmitSuccess: () => void;
  handleCloseDeleteModal: () => void;
  onProductsChange: () => void; 
}

const DeleteAdminForm: React.FC<EditAdminFormProps> = ({
  onProductsChange,
  handleCloseDeleteModal,
  product,
  colorId
}) => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [variant, setVariant] = useState<ProductVariant | null>(null);

  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [loader, setLoader] = useState(false)


  useEffect(() => {
    if (product && colorId != null) {
      const selectedVariant = product.products.find(p => p.color.color_id === colorId);
      setVariant(selectedVariant || null);
    }
  }, [product, colorId]);

  const handleError = (message: string) => {
    setErrorMessage(message);
    setErrorModalOpen(true);
  };

  const deleteSpecificColor = async () => {
    try {
      setLoader(true)
      const response = await fetch('https://abda-e-commerce-backend.onrender.com/api/admin/product/delete/color', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ general_product_id: product?.general_product_id, color_id: colorId })
      });
      if (response.ok) {
        onProductsChange();
        setLoader(false)
    } else {
      const error = await response.json();
      handleError(error.message || 'Failed to delete specific color.');
      setLoader(false)
    }
  } catch (error) {
    setLoader(false)
    handleError('Failed to delete specific color.');
  }
};

  const deleteGeneralProduct = async () => {
    try {
      setLoader(true)
      const response = await fetch('https://abda-e-commerce-backend.onrender.com/api/admin/product/delete/generalProduct', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ general_product_id: product?.general_product_id }) 
      });
      if (response.ok) {
        onProductsChange();
        setLoader(false)
      } else {
        const error = await response.json();
        handleError(error.message || 'Failed to delete all colors.');
        setLoader(false)
      }
    } catch (error) {
      handleError('Failed to delete all colors.');
      setLoader(false)
    }
  };

  if(loader) {
    return <Loader/>
  }

  return (
    <>
      <h1 className='text-center font-bold text-xl m-3 text-red-900'>
        You are Deleting the T-Shirt: "{product?.general_product_name}" of color: {variant?.color.color_name}
      </h1>

      <p className='my-4'>
        This action will only delete the specific color: <span className='italic'>{variant?.color.color_name}</span>, for the 
        T-shirt name "{product?.general_product_name}". If you want to 
        delete all colors of this product <span onClick={() => setModalOpen(true)} className='cursor-pointer text-red-600'>click here</span>.
      </p>

      <div className='flex justify-between'>
        <button onClick={deleteSpecificColor} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Delete Specific Color</button>
        <button onClick={handleCloseDeleteModal} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Close</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div>
          <h1 className='text-center font-bold text-xl m-3 text-red-900'>
          You are about to Delete the T-Shirt: "{product?.general_product_name}"
          </h1>
          <p className='my-3'>Are you sure you want to delete all this product?</p>
          <div className='flex justify-between'>
            <button onClick={deleteGeneralProduct} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Delete All Colors</button>
            <button onClick={() => setModalOpen(false)} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Close</button>
          </div>
        </div>
      </Modal>

      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default DeleteAdminForm;
