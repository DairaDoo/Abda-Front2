//Componente inputField. Para entender vea este orden(1- FieldType, 2- FormField , 3- UserSchema, 4-RegisterForm)

import { FormFieldProps } from "@/app/lib/admin/createProduct/editAdminType"
//Se trae todos props ya especificados con su tipado(Type)

const FormField: React.FC<FormFieldProps> = ({ type, placeholder, label, name, register, error, defaultValue, labelStyle, inputStyle, inputIcon }) => {
    return (
      <div className='flex flex-col gap-2 mb-4'>
        <label className={labelStyle}>{label}</label>
        <div className="flex items-center">
          <input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            defaultValue={defaultValue}
            className={inputStyle}
          />
          {inputIcon && <span className="ml-2">{inputIcon}</span>}
        </div>
        {error && <span className='text-red-500'>{error.message}</span>}
      </div>
    );
  };
  
  export default FormField;