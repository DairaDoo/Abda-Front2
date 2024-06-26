import { FieldError, UseFormRegister } from "react-hook-form";
/**
 * Tipo de datos que representa la estructura de los datos del formulario.
 */
export type FormData = {
  name: string; // Nombre del usuario
  last_name: string; // Apellido del usuario
  email: string; // Correo electrónico del usuario
  password: string; // Contraseña del usuario
  confirmPassword: string; // Confirmación de la contraseña del usuario
};

/**
* Propiedades de un campo de formulario.
*/
export type FormFieldProps = {
  type: string; // Tipo de campo (ej. "text", "password", etc.)
  placeholder: string; // Placeholder del campo
  label: string; // Etiqueta del campo
  name: ValidFieldNames; // Nombre del campo según el tipo de datos definido
  register: UseFormRegister<FormData>; // Función de registro de react-hook-form
  error: FieldError | undefined; // Error del campo
  labelStyle: string; // Estilo CSS para la etiqueta
  inputStyle: string; // Estilo CSS para el campo de entrada
  inputIcon: string; // Icono del campo de entrada (si aplica)
};

/**
* Nombres válidos para los campos del formulario.
*/
export type ValidFieldNames =
| "name" // Nombre
| "last_name" // Apellido
| "email" // Correo electrónico
| "password" // Contraseña
| "confirmPassword"; // Confirmación de contraseña
