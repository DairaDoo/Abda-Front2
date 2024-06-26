import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormField from './EditAdminFormField';
import { MyFormData, FormProduct} from '../../../lib/admin/createProduct/editAdminType';
import EditAdminFormSchema from '../../../lib/admin/createProduct/EditAdminFormSchema';
import { ProductInterface, ProductVariant } from '@/app/lib/products/ProductInterface';
import Loader from '@/app/lib/loader';

interface EditAdminFormProps {
  product?: ProductInterface;
  colorId?: number | null;
  onSubmitSuccess: () => void;
  handleCloseEditModal: () => void;
  onProductsChange: () => void; 
}
interface ProductIds {
  S: number;
  M: number;
  L: number;
  XL: number;
}

const defaultProductIds: ProductIds = { S: 0, M: 0, L: 0, XL: 0 };

const EditAdminForm: React.FC<EditAdminFormProps> = ({ onProductsChange, onSubmitSuccess, handleCloseEditModal, product, colorId }) => {
  const [productIds, setProductIds] = useState<ProductIds>(defaultProductIds);
  const [loader, setLoader] = useState(false)

  
  const [hoverImage, setHoverImage] = useState<Record<number, boolean>>({})
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm<MyFormData>({
    resolver: zodResolver(EditAdminFormSchema),
  });

  const [variant, setVariant] = useState<ProductVariant | null>(null);

  useEffect(() => {
    if (product && colorId !== null && colorId !== undefined) {
      const selectedVariant = product.products.find(p => p.color.color_id === colorId);
      setVariant(selectedVariant || null);

      console.log('General Product id:', product.general_product_id)

      if (selectedVariant) {
        const variantsBySize = {
          S: product.products.find(p => p.color.color_id === colorId && p.size.size_name === 'S'),
          M: product.products.find(p => p.color.color_id === colorId && p.size.size_name === 'M'),
          L: product.products.find(p => p.color.color_id === colorId && p.size.size_name === 'L'),
          XL: product.products.find(p => p.color.color_id === colorId && p.size.size_name === 'XL'),
        };

        setProductIds({
          S: variantsBySize.S?.product_id || 0,
          M: variantsBySize.M?.product_id || 0,
          L: variantsBySize.L?.product_id || 0,
          XL: variantsBySize.XL?.product_id || 0
        });
    
        const formData: MyFormData = {
          general_product_id: String(product.general_product_id),
          general_product_name: product.general_product_name,
          brand_name: product.brand.brand_name,
          description: product.description,
          section: product.section.section_name,
          products: [
            {
              product_ids: {
                S: variantsBySize.S?.product_id || 0,
                M: variantsBySize.M?.product_id || 0,
                L: variantsBySize.L?.product_id || 0,
                XL: variantsBySize.XL?.product_id || 0,
              },
              value: variantsBySize.S?.value.toString() || '',
              color_name: product.products[0]?.color.color_name,
              imageUrl: product.products[0]?.image_url,
              hoverImageUrl: product.products[0]?.hover_image_url,
              sizes: {
                S: variantsBySize.S?.size_amount.size_amount.toString() || '',
                M: variantsBySize.M?.size_amount.size_amount.toString() || '',
                L: variantsBySize.L?.size_amount.size_amount.toString() || '',
                XL: variantsBySize.XL?.size_amount.size_amount.toString() || '',
              },
              imageFile: null,
              hoverImageFile: null,
            }
          ]
        };
        reset(formData);
      }
    }
  }, [product, colorId, reset]);

  const getSizeAmount = (variants: ProductVariant[], sizeName: string, colorId: number): string => {
    const variant = variants.find(v => v.size.size_name === sizeName && v.color.color_id === colorId);
    return variant ? variant.size_amount.size_amount.toString() : '';
  };

  const onSubmit: SubmitHandler<MyFormData> = async (data) => {
    console.log("Submitting data:", data);
    const formData = new FormData();


    formData.append("general_product_id", data.general_product_id);
    formData.append("general_product_name", data.general_product_name);
    formData.append("brand_name", data.brand_name);
    formData.append("description", data.description);
    formData.append("section", data.section);

    data.products.forEach((product, index) => {
      formData.append(`products[${index}][value]`, product.value);
      formData.append(`products[${index}][color_name]`, product.color_name);
  
      // Append URLs as text fields
      if (product.imageUrl) {
        formData.append(`products[${index}][imageUrl]`, product.imageUrl);
      }
      if (product.hoverImageUrl) {
        formData.append(`products[${index}][hoverImageUrl]`, product.hoverImageUrl);
      }
  
      // Append Files as blob data
      if (product.imageFile) {
        formData.append(`products[${index}][imageFile]`, product.imageFile);
      }
      if (product.hoverImageFile) {
        formData.append(`products[${index}][hoverImageFile]`, product.hoverImageFile);
      }
  
      // Append product_ids and sizes
      Object.entries(product.product_ids).forEach(([size, id]) => {
        formData.append(`products[${index}][product_ids][${size}]`, id.toString());
      });
      Object.entries(product.sizes).forEach(([size, sizeValue]) => {
        formData.append(`products[${index}][sizes][${size}]`, sizeValue.toString());
      });
    });

    try {
      setLoader(true)
      const response = await fetch('https://abda-e-commerce-backend.onrender.com/api/admin/product/update', {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        setLoader(false)
        onSubmitSuccess();
        onProductsChange();
      } else {
        setLoader(false)
        console.error('Error submitting form');
      }
    } catch (error) {
      setLoader(false)
      console.error('Error:', error);
    }
  };

  if (loader) {
    return <Loader/>;
}

  return (
    <div className='flex items-center justify-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full max-w-4xl p-5 bg-white shadow-md rounded-lg items-center'>

        <h1 className='text-center font-bold text-xl m-3 text-red-900'>
          You are editing the T-Shirt: "{product?.general_product_name}" of color: {variant?.color.color_name}
        </h1>

        <h2 className='text-start font-bold my-3'>
          General Information
        </h2>

        <p className='italic font-light mb-3'>
          Note that changing the Brand will change the brand of all the products asociated with that brand, also if you change
          the T-Shirt Name it will change for all the different colors.
        </p>

        <input type="hidden" {...register("general_product_id")} value={product?.general_product_id.toString()} />

              {(["S", "M", "L", "XL"] as const).map(size => (
        <input
          key={size}
          type="hidden"
          {...register(`products.0.product_ids.${size}`)} // This now aligns with the FormFieldNames type
          value={productIds[size]}
        />
      ))} 


        <FormField
          type="text"
          placeholder="Enter product name"
          label="T-shirt Name"
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
          label="T-shirt Brand"
          name="brand_name"
          register={register}
          error={errors.brand_name}
          inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
          labelStyle=''
          inputIcon=''
        />
        <FormField
          type="textbox"
          placeholder="Enter description"
          label="T-shirt Description"
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

        {variant && (
          <div className='flex flex-col gap-4 my-4 items-center'>
            <h3 className='text-center font-bold my-3'>{`Specific information`} </h3>
            <p className='italic font-light mb-3'>
              This values will only afect to the products asociated with the t-shirt color: {variant.color.color_name}
            </p>
            <FormField
              type="text"
              placeholder={`Value for ${variant.color.color_name}`}
              label="Value"
              name={`products.0.value`}
              register={register}
              defaultValue={variant.value.toString()}
              inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
              labelStyle=''
              inputIcon=''
              error={undefined}
            />
            {(["S", "M", "L", "XL"] as const).map((size) => (
              <FormField
                key={size}
                type="text"
                label={`Size ${size}`}
                name={`products.0.sizes.${size}`}
                register={register}
                defaultValue={getSizeAmount(product!.products, size, colorId!).toString()}
                inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
                labelStyle=''
                inputIcon=''
                error={undefined}
              />
            ))}
            <div className='flex flex-col gap-4'>
            <div
              className='mx-3 mt-3 h-80 rounded-xl overflow-hidden flex justify-center items-center'
              onMouseEnter={() => setHoverImage(prev => ({ ...prev, [product!.general_product_id]: true }))}
              onMouseLeave={() => setHoverImage(prev => ({ ...prev, [product!.general_product_id]: false }))}
            >
              <img
                className="object-contain max-h-full max-w-full"
                src={hoverImage[product!.general_product_id] ? variant.hover_image_url : variant.image_url}
                alt={'Product Images'}
              />
            </div>

              <label className='font-bold' htmlFor="">Change First Image</label>
              <Controller
                name={`products.0.imageFile`}
                control={control}
                render={({ field }) => (
                  <input type="file" onChange={(e) => e.target.files && field.onChange(e.target.files[0])} className="form-input rounded" />
                )}
              />
              <label className='font-bold' htmlFor="">Change Second Image</label>
              <Controller
                name={`products.0.hoverImageFile`}
                control={control}
                render={({ field }) => (
                  <input type="file" onChange={(e) => e.target.files && field.onChange(e.target.files[0])} className="form-input rounded" />
                )}
              />
            </div>
          </div>
        )}
        <div className='flex gap-3 my-3'>
          <button type="submit" className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
          <button onClick={handleCloseEditModal} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Close</button>
        </div>
      </form>
    </div>
  );
};

export default EditAdminForm;