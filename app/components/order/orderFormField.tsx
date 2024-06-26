import { FormFieldProps } from "@/app/lib/order/OrderFieldType";

const OrderFormField: React.FC<FormFieldProps> = ({
    type,
    placeholder,
    label,
    name,
    register,
    error,
    inputStyle,
    labelStyle,
    inputIcon
}) => (
    <>
        <div className="mt-3">
            {/* Etiqueta que almacena el label del input field */}
            {<label htmlFor={name} className={labelStyle}>{label}</label>}

            {/* Contenedor del input field */}
            <div className="flex">
                {/* Contenedor para el ícono */}
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className={inputIcon}></i></div>

                {/* Input field */}
                <input
                    className={inputStyle}
                    type={type}
                    placeholder={placeholder}
                    {...register(name)}
                />
            </div>

            {/* Mostrar el mensaje de error si existe */}
            {error && <span className="text-red-600">{error.message}</span>}
        </div>
    </>
);

export default OrderFormField;
