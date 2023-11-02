"use client";
import { productData } from "@/data";
import React, { useEffect, useState } from "react";
import ProductItems from "./ProductItems";
import { Pagination } from "@mui/material";

const Products = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    
    setTimeout(() => {
      setDataLoaded(true);
    }, 2000);
  }, []);

  return (
    <div className="">
      <div>
        <h1 className={`py-[3vw] px-[4vw] font-bold text-2xl md:text-3xl`}>
          Products
        </h1>
        <div className="w-full flex flex-col sm:flex-row  justify-between px-[4vw]">
          <div className="flex flex-col sm:flex-row  gap-3">
            <span className="text-xl font-semibold">Filter Product: </span>
            <select className="p-2 border border-gray-300 rounded">
              <option disabled selected>
                Color
              </option>
              <option>White</option>
              <option>Black</option>
              <option>Red</option>
              <option>Blue</option>
              <option>Yellow</option>
              <option>Green</option>
            </select>
            <select className="p-2 border border-gray-300 rounded mt-2 sm:mt-0">
              <option disabled selected>
                Size
              </option>
              <option>Xs</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row  gap-3 mt-2 sm:mt-0">
            <span className="text-xl font-bold">Sort Products:</span>
            <select className="p-2 border border-gray-300 rounded">
              <option disabled selected>
                Newest
              </option>
              <option>Price (asc)</option>
              <option>Price (desc)</option>
            </select>
          </div>
        </div>

        {/* <Products />*/}
        <ProductItems/>


      </div>
    </div>
  );
};

export default Products;
