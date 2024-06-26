import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { FormData } from "@/app/lib/order/OrderFieldType";
import OrderFormSchema from "@/app/lib/order/OrderFormSchema";
import OrderFormField from "./orderFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import "@mdi/font/css/materialdesignicons.min.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/app/lib/loader";

function OrderForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(OrderFormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data, event) => {
    setLoading(true)
    event?.preventDefault();
    try {
      const response = await fetch("https://abda-e-commerce-backend.onrender.com/api/order/orderConfirmation", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setLoading(false)
        console.log("Formulario enviado correctamente");
        router.push("/");
      } else {
        console.error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetch('https://abda-e-commerce-backend.onrender.com/api/cart/getCartInfo', {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Optionally, you can update the cart state here
      })
      .catch(error => console.error('Error al obtener los elementos del carrito:', error));
  }, []);

  if (loading) {
    return <Loader/>;
}
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-100 text-gray-600 rounded-3xl shadow-xl px-4 py-10">
        <h1 className="font-bold text-3xl text-gray-900 mb-6">Processing Order</h1>
        <p className="mb-2">Please enter your information to confirm your order</p>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <OrderFormField
            label="Address"
            type="address"
            placeholder="Street #001, KM-062"
            name="address"
            register={register}
            error={errors.address}
            labelStyle="text-xs font-semibold px-1"
            inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
            inputIcon="mdi mdi-map-marker-outline text-gray-400 text-lg"
          />
          <OrderFormField
            label="City"
            type="city"
            placeholder="Arecibo"
            name="city"
            register={register}
            error={errors.city}
            labelStyle="text-xs font-semibold px-1"
            inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
            inputIcon="mdi mdi-home-city text-gray-400 text-lg"
          />
          <OrderFormField
            label="State"
            type="state"
            placeholder="Puerto Rico"
            name="state"
            register={register}
            error={errors.state}
            labelStyle="text-xs font-semibold px-1"
            inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
            inputIcon="mdi mdi-city-variant-outline text-gray-400 text-lg"
          />
          <OrderFormField
            label="Zip Code"
            type="zip_code"
            placeholder="00372"
            name="zip_code"
            register={register}
            error={errors.zip_code}
            labelStyle="text-xs font-semibold px-1"
            inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
            inputIcon="mdi mdi-map-marker text-gray-400 text-lg"
          />
          {/* <div className="flex justify-center mt-6">
            <p>Do you want to edit your cart? <Link href="/cart" className="text-blue-500 hover:underline">Cart</Link></p>
          </div> */}
          <button type="submit" className=" mt-6 flex items-center justify-center w-full bg-green-500 hover:bg-green-600 focus:bg-green-700 text-white rounded-lg py-3 font-semibold">
            <img src="https://res.cloudinary.com/dcldzjq9s/image/upload/v1714370326/eccomerce_shirt_images/final_cart_icon_yq2qqq.webp" alt="Cart Icon" className="w-6 h-6 mr-2" />
            CONFIRM PURCHASE
          </button>



        </form>
      </div>
    </div>
  );
}

export default OrderForm;
