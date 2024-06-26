//Componente inputField. Para entender vea este orden(1- FieldType, 2- FormField , 3- UserSchema, 4-RegisterForm)

import { FormFieldProps } from "@/app/lib/admin/createProduct/adminType"
//Se trae todos props ya especificados con su tipado(Type)


const FormField: React.FC<FormFieldProps> = ({
    type,
    placeholder,
    label,
    name,
    register,
    error,
    inputStyle,
    labelStyle,
    inputIcon
    //Se asignan los props que se utilizaran en este React Function Component llamado Form Field que contiene un tipado ya definido.

}) => (
    <>
        <div className="flex flex-col">
            {<label htmlFor={name} className={labelStyle}>{label}</label>}
            {/* Etiqueta que va almacenar el Label referente a un input field, ademas se le pasa un prop para definir su estilo al momento de la inicializacion de este compponente*/}


            <div className="flex"> {/*Div como contenedor para el inputfield, se expecifica flex(Un tipo de display Box [CSS]), para manejar las relacion entre los hijos de este contenedor*/}

                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className={inputIcon}></i></div>
                {/* Contenedor del incono referenta al input field, */}

                <input className={inputStyle}
                    type={type}
                    placeholder={placeholder}
                    {...register(name)} />
                {/* input tag, Se asigna los diferentes props a los atributos del input*/}
            </div>

            {error && <span className="text-red-600">{error.message}</span>}
            {/* De haber un error se muestra en la etiqueta span(Se utiliza como una etiqueta p) */}
        </div>
    </>
)

export default FormField