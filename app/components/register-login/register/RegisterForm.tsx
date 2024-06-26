import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link"; // Importación de la librería Link de Next.js
import { FormData } from "@/app/lib/register-login/register/RegisterFieldType"; // Importación del tipo de datos FormData
import RegisterSchema from "@/app/lib/register-login/register/RegisterSchema"; // Importación del esquema de usuario
import FormField from "./FormField"; // Importación del componente FormField
import { zodResolver } from "@hookform/resolvers/zod"; // Importación del resolver de zod
import "@mdi/font/css/materialdesignicons.min.css"; // Importación del archivo de estilos de los iconos mdi
import { useRouter } from "next/navigation"; // Importación del hook useRouter de Next.js
import Loader from "@/app/lib/loader";
import { useState } from "react";

function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Inicialización del hook useRouter
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(RegisterSchema), // Uso del resolver zod para el esquema de usuario
  });

  // Función para manejar la lógica cuando se envía el formulario
  const onSubmit: SubmitHandler<FormData> = async (data, event) => {
    setLoading(true)
    event?.preventDefault(); // Prevenir el comportamiento por defecto del evento
    const { confirmPassword, ...FormData } = data; // Extracción de la confirmación de la contraseña de los datos
    try {
      const response = await fetch("https://abda-e-commerce-backend.onrender.com/api/user/register", {
        // Envío de la data mediante una solicitud HTTP
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData), // Conversión de la data a JSON para el cuerpo de la solicitud
      });
      if (response.ok) {
        setLoading(false)
        console.log("Formulario enviado correctamente");
        router.push("/login"); // Redirección a la página de inicio de sesión en caso de éxito
      } else {
        setLoading(false)
        console.error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error:", error); // Manejo de errores
      setLoading(false)
    }
  };

  if (loading) {
    return <Loader/>;
}


  return (
    // Contenedor principal del formulario
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      {/* Subcontenedor del formulario */}
      <div className="bg-gray-100 text-gray-600 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: "1000px" }}>
        {/* Contenedor de la imagen de fondo (solo visible en pantallas grandes) */}
        <div className="md:flex w-full">
          {/* Imagen de fondo (oculta en pantallas pequeñas) */}
          <div className="hidden md:block w-1/2">
            <img
              src="/registerBackground.jpg"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="Register Background Image"
            />
          </div>
          {/* Formulario de registro */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">Register</h1>
              <p>Please enter your information to register</p>
            </div>
            {/* Campos del formulario */}
            <div className="">
              <div className="flex -mx-3">
                {/* Campo de nombre */}
                <div className="w-1/2 px-3 mb-5">
                  <FormField
                    label="First Name"
                    type="name"
                    placeholder="Name"
                    name="name"
                    register={register}
                    error={errors.name}
                    labelStyle="text-xs font-semibold px-1"
                    inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                    inputIcon="mdi mdi-account-outline text-gray-400 text-lg"
                  />
                </div>
                {/* Campo de apellido */}
                <div className="w-1/2 px-3 mb-5">
                  <FormField
                    label="Last Name"
                    type="last_name"
                    placeholder="Last name"
                    name="last_name"
                    register={register}
                    error={errors.last_name}
                    labelStyle="text-xs font-semibold px-1"
                    inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                    inputIcon="mdi mdi-account-outline text-gray-400 text-lg"
                  />
                </div>
              </div>
              {/* Campo de correo electrónico */}
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
              {/* Campo de contraseña */}
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
              {/* Confirmación de contraseña */}
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <FormField
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    register={register}
                    error={errors.confirmPassword}
                    labelStyle="text-xs font-semibold px-1"
                    inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                    inputIcon="mdi mdi-lock-outline text-gray-400 text-lg"
                  />
                </div>
              </div>
              {/* Enlace a la página de inicio de sesión */}
              <div className="flex -mx-3 my-6 justify-center">
                <p>
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-500 hover:underline">
                    Log In
                  </Link>
                </p>
              </div>
              {/* Botón de envío del formulario */}
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

export default RegisterForm;
