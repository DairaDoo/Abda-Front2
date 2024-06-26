import { z } from 'zod';


const ProductIdsSchema = z.object({
  S: z.number(),
  M: z.number(),
  L: z.number(),
  XL: z.number(),
});


const FormProductSchema = z.object({
  product_ids: ProductIdsSchema,
  value: z.string().nonempty("Value is required"),
  color_name: z.string().nonempty("Color name is required"),
  imageUrl: z.string().url("Invalid URL"),
  hoverImageUrl: z.string().url("Invalid URL"),
  sizes: z.object({
    S: z.string().nonempty("Size S is required"),
    M: z.string().nonempty("Size M is required"),
    L: z.string().nonempty("Size L is required"),
    XL: z.string().nonempty("Size XL is required"),
  }),
  imageFile: typeof File !== 'undefined' ? z.instanceof(File).nullable() : z.any().nullable(),
  hoverImageFile: typeof File !== 'undefined' ? z.instanceof(File).nullable() : z.any().nullable(),
});

const EditAdminFormSchema = z.object({
  general_product_id: z.string(),
  general_product_name: z.string().nonempty("Product name is required"),
  brand_name: z.string().nonempty("Brand name is required"),
  description: z.string().nonempty("Description is required"),
  section: z.string().nonempty("Section is required"),
  products: z.array(FormProductSchema),
});

export default EditAdminFormSchema;
