import { z, ZodType } from "zod"; // Importación de las librerías necesarias para la validación de datos mediante zod
import { FormData } from "./RegisterFieldType"; // Importación del FormData para utilizar sus valores como referencia a las propiedades del z.Object

// Definición del esquema de validación para el formulario de registro
const RegisterSchema: ZodType<FormData> = z.object({
    // Validación para el nombre (debe ser una cadena)
    name: z.string(),

    // Validación para el apellido (debe ser una cadena)
    last_name: z.string(),

    // Validación para el correo electrónico (debe ser una cadena y tener formato de correo electrónico)
    email: z.string().email(),

    // Validación para la contraseña
    password: z.string()
        .min(5, 'Password must be at least 5 characters long') // Mínimo de 5 caracteres
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter') // Al menos una letra mayúscula
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter') // Al menos una letra minúscula
        .regex(/[0-9]/, 'Password must contain at least one number'), // Al menos un número

    // Confirmación de la contraseña (debe ser una cadena)
    confirmPassword: z.string(),
})
// Se define la validación referente a los datos del FormData

// Refinamiento adicional del esquema para verificar si las contraseñas coinciden
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match", // Mensaje de error si las contraseñas no coinciden
    path: ["confirmPassword"], // Ruta del campo que se está validando
});
// Se exporta este UserSchema para su uso en el formulario de registro
export default RegisterSchema;
