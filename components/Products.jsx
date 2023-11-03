"use client";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "./ProductCard";
import FilterModal from "./FilterModal";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const getData = async (page = 0, perPage = 10) => {
  try {
    const { data } = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${page > 0 ? page * perPage : page}&limit=${perPage}`)

    const { data: categories } = await axios.get(`https://api.escuelajs.co/api/v1/categories`)


    return {
      data,
      categories
    }
  } catch (error) {
    throw new error
  }
}

const Products = () => {

  const [allProducts, setAllProducts] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [filteredCategory, setFilteredCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [seletedTitle, setSeletedTitle] = useState("")
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(5000)
  const [modalOpen, setModalOpen] = useState(false)
  const [sortSelect, setSortSelect] = useState("")
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getData(page, rowsPerPage),
    queryKey: ['products', page, rowsPerPage],
  })

  useEffect(() => {
    if (data) {
      setAllCategories(data.categories)
      setAllProducts(data.data)
      setFilteredCategory(data.data)
    }
  }, [data])

  useEffect(() => {
    if (selectedCategory !== "all") {
      const filteredData = async () => {
        const { data } = await axios.get(`https://api.escuelajs.co/api/v1/products?title=${seletedTitle}&price_min=${minPrice}&price_max=${maxPrice}&categoryId=${selectedCategory}&offset=${page > 0 ? page * perPage : page}&limit=${rowsPerPage}`)

        setFilteredCategory(data)
      }
      filteredData()
    } else {
      refetch()
      setFilteredCategory(allProducts)
    }
    setSortSelect("")
  }, [selectedCategory, minPrice, maxPrice])


  useEffect(() => {
    if (sortSelect === "New to Old") {
      const sortedData = [...filteredCategory];
      sortedData.sort((a, b) => {
        const dateA = new Date(a.creationAt)
        const dateB = new Date(b.creationAt)
        return dateA - dateB;
      });
      setFilteredCategory(sortedData);
    } else if (sortSelect === "Old to New") {
      const sortedData = [...filteredCategory];
      sortedData.sort((a, b) => {
        const dateA = new Date(a.creationAt);
        const dateB = new Date(b.creationAt);
        return dateB - dateA;
      });
      setFilteredCategory(sortedData);
    } else if (sortSelect === "Price Low to High") {
      const sortedData = [...filteredCategory];
      sortedData.sort((a, b) => a.price - b.price)
      setFilteredCategory(sortedData);
    } else if (sortSelect === "Price High to Low") {
      const sortedData = [...filteredCategory];
      sortedData.sort((a, b) => b.price - a.price)
      setFilteredCategory(sortedData);
    }
  }, [sortSelect]);

  return (
    <>
      <div className="w-full px-4 md:px-16 lg:px-32 py-16">
        <h1 className={`font-bold text-2xl md:text-3xl`}>
          Products
        </h1>
        {/* belt */}
        <div className="w-full flex justify-between mt-6 items-start">
          <div className="flex flex-col sm:items-center sm:flex-row  gap-3">
            <span className="text-xl font-semibold">Select Category </span>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-2 py-2 border border-gray-300 rounded">
              <option value="">
                All
              </option>
              {allCategories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 md:gap-4 hover:cursor-pointer hover:bg-blue-400/5 px-4 py-2 rounded-lg transition-all duration-200" onClick={() => setModalOpen(true)}>
            <h1 className="font-semibold text-blue-500 text-base md:text-lg">More Filters</h1>
            <FilterAltIcon fontSize="large" />
          </div>
        </div>
        {/* products */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 my-14">
          {filteredCategory?.map((item, index) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </div>
      </div>
      <Pagination page={page} rowsPerPage={rowsPerPage} setPage={setPage} setRowsPerPage={setRowsPerPage} />
      <FilterModal
        maxPrice={maxPrice}
        minPrice={minPrice}
        title={seletedTitle}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        sortSelect={sortSelect}
        setSortSelect={setSortSelect}
        setMaxPrice={setMaxPrice}
        setMinPrice={setMinPrice}
      />
    </>
  );
};

export default Products;
