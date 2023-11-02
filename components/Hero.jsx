import React from "react";

const Hero = () => {
  return (
    <div className="hero w-full min-h-[50vh] md:min-h-[70vh] rounded-b-[70px] drop-shadow-sm px-4 md:px-16 lg:px-32 py-6">
      <div className="w-full">
        <h1 className="font-semibold text-neutral-500 text-lg">Best Quality Products</h1>
        <div className="max-w-xl text-[4vw] font-medium mt-4">
          Amazing Variety Of Products You Can Only Find Here
        </div>
        <button className="py-3 px-10 mt-4 hover:bg-green-500 transition-all duration-200 bg-pink-600 text-white rounded-full font-semibold uppercase">shop now</button>
      </div>
    </div>
  );
};

export default Hero;
