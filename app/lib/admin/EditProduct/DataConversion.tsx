import { ProductInterface, ProductVariant } from "../../products/ProductInterface";
import { MyFormData, FormProduct } from "../createProduct/adminType";

function groupByColor(variants: ProductVariant[]): Record<string, FormProduct> {
  return variants.reduce((acc, variant) => {
    const colorKey = variant.color.color_name;
    if (!acc[colorKey]) {
      acc[colorKey] = {
        value: variant.value.toString(), 
        color_name: colorKey,
        imageUrl: variant.image_url, 
        hoverImageUrl: variant.hover_image_url,
        sizes: {
          S: getSizeAmount(variants, 'S'),
        M: getSizeAmount(variants, 'M'),
        L: getSizeAmount(variants, 'L'),
        XL: getSizeAmount(variants, 'XL'),
        }
      };
    }
    acc[colorKey].sizes[variant.size.size_name] = variant.size_amount.size_amount.toString();
    return acc;
  }, {} as Record<string, FormProduct>);
}

function convertProductToFormData(product: ProductInterface): MyFormData {
  const groupedByColor = groupByColor(product.products);

  const products: FormProduct[] = Object.values(groupedByColor); // Use values of the grouped object

  return {
    general_product_name: product.general_product_name,
    brand_name: product.brand.brand_name,
    description: product.description,
    section: product.section.section_name,
    products
  };
}


function getSizeAmount(variants: ProductVariant[], sizeName: string): string {
  const variant = variants.find(v => v.size.size_name === sizeName);
  return variant ? variant.size_amount.size_amount.toString() : '';
}

export { convertProductToFormData };
