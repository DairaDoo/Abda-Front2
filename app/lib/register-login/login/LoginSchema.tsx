//Este archivo contiene la logica para la validacion de los valores del formulario. Para entender vea este orden(1- FieldType, 2- FormField , 3- UserSchema, 4-RegisterForm)

import { z, ZodType } from "zod";
//Lirberias necesarias para utilizar la validacion de datos mediante zod 

import { FormData } from "./LoginFieldType";
//Se trae el FormData para utilizar sus valores como referencia a las propiedades del z.Object


const UserSchema: ZodType<FormData> = z.object({
    email: z.string().email(),

    password: z.string()
    .min(5, 'Password must be at least 5 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),


})

export default UserSchema
//Se exporta este UserSchema para su uso en el Form