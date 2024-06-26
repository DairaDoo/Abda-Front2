import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import FormField from './AdminFormField';
import { MyFormData, FormProduct } from '../../../lib/admin/createProduct/adminType';
import { zodResolver } from '@hookform/resolvers/zod';
import AdminFormSchema from '../../../lib/admin/createProduct/AdminFormSchema';
import Loader from '@/app/lib/loader';





interface AdminFormProps {
  onSubmitSuccess: () => void;
  handleCloseEditModal: () => void;
  onProductsChange: () => void; 

}


const AdminForm: React.FC<AdminFormProps>= ({ onProductsChange, onSubmitSuccess, handleCloseEditModal}) => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<MyFormData>({
    resolver: zodResolver(AdminFormSchema),
  });
  const [loader, setLoader] = useState(false)
  
  const [products, setProducts] = useState<FormProduct[]>([{
    value: '',
    color_name: '',
    imageFile: null,
    hoverImageFile: null,
    sizes: { S: '', M: '', L: '', XL: '' }
  }]);

  const onSubmit: SubmitHandler<MyFormData> = async (data) => {
    const formData = new FormData();

    formData.append("general_product_name", data.general_product_name);
    formData.append("brand_name", data.brand_name);
    formData.append("description", data.description);
    formData.append("section", data.section);

    data.products.forEach((product, index) => {
      formData.append(`products[${index}][value]`, product.value);
      formData.append(`products[${index}][color_name]`, product.color_name);
      if (product.imageFile) {
        formData.append(`products[${index}][imageFile]`, product.imageFile);
      }
      if (product.hoverImageFile) {
        formData.append(`products[${index}][hoverImageFile]`, product.hoverImageFile);
      }

      // Append size amounts for each size
      Object.keys(product.sizes).forEach((size) => {
        formData.append(`products[${index}][sizes][${size}]`, product.sizes[size]);
      });
    });

    console.log(formData)

    try {
      setLoader(true)
      const response = await fetch('https://abda-e-commerce-backend.onrender.com/api/admin/product/create', {
        method: 'POST',
        body: formData,

      });
      console.log(formData)

      if (response.ok) {
        console.log('Form submitted successfully');
        console.log(formData)
        onProductsChange();
        onSubmitSuccess();
        setLoader(false)
      } else {
        console.error('Error submitting form');
        console.log(formData)
        setLoader(false)
      }
    } catch (error) {
      console.error('Error:', error);
      console.log(formData)
      setLoader(false)
    }
  };


  const addProduct = () => {
    setProducts([...products, {
      value: '',
      color_name: '',
      imageFile: null,
      hoverImageFile: null,
      sizes: { S: '', M: '', L: '', XL: '' }
    }]);
  };

  if (loader) {
    return <Loader/>;
}

  return (
    <>
      <div className='flex items-center justify-center'>
        
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full max-w-4xl p-5 bg-white shadow-md rounded-lg items-center'>

        <h1 className='text-center font-bold text-xl'>
          Creating a Product
        </h1>
    
        <FormField
          type="text"
          placeholder="Enter product name"
          label="Product Name"
          name="general_product_name"
          register={register}
          error={errors.general_product_name}
          inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
          labelStyle=''
          inputIcon=''
        />
        <FormField
          type="text"
          placeholder="Enter brand name"
          label="Brand Name"
          name="brand_name"
          register={register}
          error={errors.brand_name}
          inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
          labelStyle=''
          inputIcon=''
        />
        <FormField
          type="text"
          placeholder="Enter description"
          label="Description"
          name="description"
          register={register}
          error={errors.description}
          inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
          labelStyle=''
          inputIcon=''
        />
        <FormField
          type="text"
          placeholder="Enter section"
          label="Section"
          name="section"
          register={register}
          error={errors.section}
          inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
          labelStyle=''
          inputIcon=''
        />

        {products.map((product, index) => (
          <div key={index} className='flex flex-col gap-4 my-4 items-center'>
            <h3 className='text-center font-bold'>Product Details of Variant {index + 1}</h3>
            <FormField
              type="text"
              placeholder={`Enter product ${index + 1} value`}
              label={`Product ${index + 1} Value`}
              name={`products.${index}.value`}
              register={register}
              inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
              labelStyle=''
              inputIcon=''
              error={undefined}
            />
            <FormField
              type="text"
              placeholder={`Enter product ${index + 1} color`}
              label={`Product ${index + 1} Color`}
              name={`products.${index}.color_name`}
              register={register}
              inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
              error={undefined}
              labelStyle=''
              inputIcon=''
            />

            <div className='flex flex-col justify-center gap-2'>
              {['S', 'M', 'L', 'XL'].map((size) => (
                <FormField
                  key={size}
                  type="text"
                  label={`Enter amount for size ${size}`}
                  name={`products[${index}].sizes.${size}` as keyof MyFormData}
                  register={register}
                  error={errors.products?.[index]?.sizes?.[size]}
                  inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
                  inputIcon=''
                  labelStyle=''
                />
              ))}
            </div>

            <div className='flex flex-col gap-4'>
              <label htmlFor=""> Main Image</label>
              <Controller
                name={`products[${index}].imageFile`  as keyof MyFormData}
                control={control}
                render={({ field }) => (
                  <input type="file" onChange={(e) => e.target.files && field.onChange(e.target.files[0])} className="form-input rounded" />
                )}
              />
              <label htmlFor=""> Hover Image</label>
              <Controller
                name={`products[${index}].hoverImageFile`  as keyof MyFormData}
                control={control}
                render={({ field }) => (
                  <input type="file" onChange={(e) => e.target.files && field.onChange(e.target.files[0])} className="form-input rounded" />
                )}
              />
            </div>
          </div>
        ))}
        <div className='flex gap-3 my-3'>
          <button type="button" onClick={addProduct} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Product</button>
          <button type="submit" className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
          <button onClick={handleCloseEditModal} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Cancel</button>
        </div>
      </form>
    </div>
    </>);
};

export default AdminForm;
