import React from "react";
import { productData } from "@/data";

const ProductItems = () => {
  const first6Products = productData.slice(0, 8); 
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-2 sm:p-8 md:p-10 lg:p-12">
        {first6Products.map((item) => (
          <div key={item.id} className="bg-white  border border-gray-500">
            <img
              src={item.src}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500">{item.color.join(", ")}</p>
              <p className="font-semibold mt-2">${item.price}</p>
              <button className="bg-black  text-white px-4 py-2 mt-2">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductItems;
