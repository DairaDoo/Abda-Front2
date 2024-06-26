import { z, ZodType } from "zod";
import { MyFormData } from "./adminType";

const AdminFormSchema: ZodType<MyFormData> = z.object({
    general_product_name: z.string().nonempty(),
    brand_name: z.string().nonempty(),
    description: z.string().nonempty(),
    section: z.string().nonempty(),
    products: z.array(
      z.object({
        value: z.string().nonempty(),
        color_name: z.string().nonempty(),
        imageFile: z.any(),
        hoverImageFile: z.any(),
        sizes: z.object({
          S: z.string().nonempty(),
          M: z.string().nonempty(),
          L: z.string().nonempty(),
          XL: z.string().nonempty(),
        }),
      })
    ).min(1),
  });
export default AdminFormSchema;
