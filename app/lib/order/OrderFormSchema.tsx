import { ZodType, z } from 'zod';
import { FormData } from './OrderFieldType';


// Definición del esquema de validación para los datos del formulario
const AddressSchema: ZodType<FormData>= z.object({
  address: z.string().min(1, 'Address is required'), // Asumimos que la dirección no puede estar vacía
  city: z.string().min(1, 'City is required'), // Asumimos que la ciudad no puede estar vacía
  state: z.string().min(1, 'State is required'), // Asumimos que el estado no puede estar vacío
  zip_code: z.string().length(5, 'ZIP Code must be exactly 5 digits') // Asumimos que el código postal debe tener exactamente 5 dígitos
});

export default AddressSchema;
