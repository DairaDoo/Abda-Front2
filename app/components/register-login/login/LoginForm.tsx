import { useForm } from "react-hook-form"; // Importación de useForm para manejar el formulario
import { FormData } from "@/app/lib/register-login/login/LoginFieldType"; // Importación del tipo de datos del formulario
import LoginSchema from "@/app/lib/register-login/login/LoginSchema"; // Importación del esquema de validación
import FormField from "./LoginFormField"; // Importación del componente FormField para los campos de entrada
import { zodResolver } from "@hookform/resolvers/zod"; // Importación del resolver de zod para el formulario
import '@mdi/font/css/materialdesignicons.min.css'; // Importación de los estilos de material design icons
import Link from "next/link"; // Importación de Link de Next.js
import Cookies from "js-cookie"; // Importación de Cookies para manejar las cookies en el cliente
import { useRouter } from "next/navigation"; // Importación de useRouter de Next.js para manejar la navegación
import { useState } from "react";
import Loader from "@/app/lib/loader";


function LoginForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Inicialización del hook useRouter para la navegación
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ // Configuración del useForm con el tipo de datos FormData y el resolver zodResolver(LoginSchema)
    resolver: zodResolver(LoginSchema),
  });

  // Función para manejar la lógica cuando se envía el formulario
  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const response = await fetch('https://abda-e-commerce-backend.onrender.com/api/user/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include", // Incluir las cookies en la solicitud
        body: JSON.stringify(data), // Convertir la data a formato JSON
      });
      if (response.ok) {
        setLoading(false)
        console.log('Formulario enviado correctamente');
        router.push('/');
        // Después del inicio de sesión exitoso, se establece la cookie de isLoggedIn en true
        Cookies.set('isLoggedIn', 'true');
      } else {
        setLoading(false)
        console.error('Error al enviar el formulario');
      }
    } catch (error) {
      setLoading(false)
      console.error('');
    } 
  };

  if (loading) {
    return <Loader/>;
}

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-600 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: "1000px" }}>
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2">
            <img
              src="/registerBackground.jpg"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="Register Background Image"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">
                ABDA Login
              </h1>
              <p>Please enter your information to login</p>
            </div>
            <div className="">
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <FormField
                    label="Email"
                    type="email"
                    placeholder="Email"
                    name="email"
                    register={register}
                    error={errors.email}
                    labelStyle="text-xs font-semibold px-1"
                    inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                    inputIcon="mdi mdi-email-outline text-gray-400 text-lg"
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <FormField
                    label="Password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    register={register}
                    error={errors.password}
                    labelStyle="text-xs font-semibold px-1"
                    inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                    inputIcon="mdi mdi-lock-outline text-gray-400 text-lg"
                  />
                </div>
              </div>
              <div className="flex -mx-3 my-6 justify-center">
                <p>Don't have an account?   <Link href="/register" className="text-blue-500 hover:underline">Sign In</Link></p>
              </div>
              <div className="flex -mx-3">
                <button type="submit" className="block w-full max-w-xs mx-auto bg-gray-500 hover:bg-zinc-800 focus:bg-gray-900 text-white rounded-lg px-3 py-3 font-semibold">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
