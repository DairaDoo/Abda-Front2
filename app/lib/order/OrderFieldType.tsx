import { FieldError, UseFormRegister } from "react-hook-form"; // Importación de librerías necesarias para el formulario

// Definición del tipo de datos del formulario
export type FormData = {
    address: string; // Campos para el Billing Info de la direccion o Po Box
    city: string;   
    state: string;  
    zip_code: string;
};

// Definición de los props para el componente FormField
export type FormFieldProps = {
    type: string; // Tipo de campo 
    placeholder: string; // Placeholder del campo
    label: string; // Etiqueta del campo
    name: ValidFieldNames; // Nombre del campo según el tipo de datos definido
    register: UseFormRegister<FormData>; // Función de registro de react-hook-form
    error: FieldError | undefined; // Error del campo

    // Propiedades para los estilos del componente FormField
    labelStyle: string; // Estilo CSS para la etiqueta
    inputStyle: string; // Estilo CSS para el campo de entrada
    inputIcon: string; // Icono del campo de entrada
};

// Tipos válidos para los nombres de campo
export type ValidFieldNames =
  | "address"
  | "city"
  | "state"
  | "zip_code"
