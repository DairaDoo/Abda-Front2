import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Banner = () => {
  const [text] = useTypewriter({
    words: [
      "Your Favorite Online Store",
      "Providing the best T-Shirts for Everyone",
      "Shop Anywhere, Anytime",
    ],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 10,
    delaySpeed: 3000,
  });

  // Set the background image URL
  const backgroundImage = "url('/banner_image.jpeg')";

  return (
    <div
      className="h-80 md:h-96 mx-auto flex flex-col justify-center items-center relative mb-8 border border-gray-300 rounded-md"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Heading */}
      <h1 className="text-3xl md:text-5xl uppercase font-bold text-white relative z-10 text-center">
        ABDA T-Shirts
      </h1>

      {/* Typewriter text */}
      <p className="text-lg md:text-xl font-semibold mt-4 text-white relative z-10 text-center">
        <span>{text}</span>{" "}
        <Cursor cursorBlinking cursorStyle="|" cursorColor="#ffaa17" />
      </p>
    </div>
  );
};

export default Banner;
