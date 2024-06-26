export interface ProductInterface {
    general_product_id: number;
    general_product_name: string;
    description: string;
    wanted_count?: number;
    section: SectionInterface;
    brand: BrandInterface;
    products: ProductVariant[];
  }
  
  export interface BrandInterface {
    brand_id: number;
    brand_name: string;
  }
  
  export interface ProductVariant {
    product_id: number;
    value: number;
    color: ColorInterface;
    image_url: string;
    hover_image_url: string; 
    size_amount: SizeAmountInterface;
    size: SizeInterface;
  }
  
  export interface ColorInterface {
    image_url: string | undefined;
    hover_image_url: string | undefined;
    color_id: number;
    color_name: string;
  }
  
  export interface SectionInterface {
    section_id: number;
    section_name: string;
  }
  
  export interface SizeAmountInterface {
    size_amount_id: number;
    size_amount: number;
  }
  
  export interface SizeInterface {
    size_id: number;
    size_name: string;
  }
  