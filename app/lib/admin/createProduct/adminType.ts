import { FieldError, UseFormRegister } from "react-hook-form";

export type MyFormData = {
  general_product_name: string;
  brand_name: string;
  description: string;
  section: string;
  products: FormProduct[];
};

export type FormProduct = {
  value: string;
  color_name: string; // Add color_name property
  imageFile?: File | null;
  hoverImageFile?: File | null;
  imageUrl?: string;         
  hoverImageUrl?: string;    
  sizes: {
    S: string;
    M: string;
    L: string;
    XL: string;
    [key: string]: string;
  };
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
//Tipado para los props(Atributos que se utilizaran en el FormField component)

export type FormFieldNames = keyof MyFormData | `products.${number}.${keyof FormProduct}` | `products.${number}.sizes.${keyof FormProduct['sizes']}`;
