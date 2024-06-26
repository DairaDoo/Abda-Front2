// adminType.ts
import { FieldError, UseFormRegister } from "react-hook-form";

export interface FormProduct {
  product_ids: {
    S: number;
    M: number;
    L: number;
    XL: number;
  };
  value: string;
  color_name: string;
  imageUrl: string;
  hoverImageUrl: string;
  sizes: {
    S: string;
    M: string;
    L: string;
    XL: string;
  };
  imageFile: File | null;
  hoverImageFile: File | null;
}

export interface MyFormData {
  general_product_id: string;
  general_product_name: string;
  brand_name: string;
  description: string;
  section: string;
  products: FormProduct[];
}

export type FormFieldProps = {
  type: string;
  placeholder?: string;
  label: string;
  name: FormFieldNames;
  register: UseFormRegister<MyFormData>;
  error: FieldError | undefined;
  defaultValue?: string;
  labelStyle: string;
  inputStyle: string;
  inputIcon: string;
};

export type FormFieldNames = keyof MyFormData | `products.${number}.${keyof FormProduct}` | `products.${number}.sizes.${keyof FormProduct['sizes']}` | `products.${number}.product_ids.${'S' | 'M' | 'L' | 'XL'}`; ;