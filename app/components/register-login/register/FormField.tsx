import { FormFieldProps } from "@/app/lib/register-login/register/RegisterFieldType"
// Componente de campo de formulario
const FormField: React.FC<FormFieldProps> = ({
    // Tipo de campo (ej. "text", "password", etc.)
    type,
    // Placeholder del campo
    placeholder,
    // Etiqueta del campo
    label,
    // Nombre del campo según el tipo de datos definido
    name,
    // Función de registro de react-hook-form
    register,
    // Error del campo
    error,
    // Estilo CSS para el campo de entrada
    inputStyle,
    // Estilo CSS para la etiqueta
    labelStyle,
    // Icono del campo de entrada (si aplica)
    inputIcon
}) => (
    <>
        {/* Etiqueta del campo */}
        {<label htmlFor={name} className={labelStyle}>{label}</label>}
   
        {/* Contenedor del campo */}
        <div className="flex"> 
            {/* Icono del campo */}
            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className={inputIcon}></i></div>

            {/* Campo de entrada */}
            <input className={inputStyle}
                type={type}
                placeholder={placeholder}
                {...register(name)}/>
        </div>
        
        {/* Mostrar mensaje de error si existe */}
        {error && <span className="text-red-600">{error.message}</span>}
    </>
);

export default FormField;