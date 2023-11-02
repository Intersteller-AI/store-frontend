"use client"
import React, { useEffect, useState } from 'react'
import Item from './Item'
import { categories, } from '@/data'
import { HiTemplate } from 'react-icons/hi'
import { GrPowerCycle } from 'react-icons/gr'
import { BsBox2Fill } from 'react-icons/bs'
import axios from 'axios'


const Featuring = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("https://api.escuelajs.co/api/v1/products?offset=0&limit=5")

        const uniarray = []

        data?.forEach(element => {
          if (element.category.name !== "Books and Media") {
            uniarray.push(element)
          }
        });

        setData(uniarray)
      } catch (error) {
        console.log(error);
        return error
      }
    }
    getData()
  }, [])

  console.log(data);

  return (
    <div className='w-full py-16 px-4 md:px-16 lg:px-32 min-h-screen'>
      <div className='flex items-center md:flex-row flex-col gap-4 md:gap-0 justify-center md:justify-evenly py-6'>
        <div className='flex items-center gap-4'>
          <HiTemplate className='text-[30px] text-blue-500' />
          <div className='flex flex-col'>
            <h1 className='font-semibold text-neutral-500 text-lg'>
              Products Collection
            </h1>
            <h2 className='font-medium text-neutral-800'>Any products for your collections</h2>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <BsBox2Fill className='text-[24px] text-rose-500' />
          <div className='flex flex-col'>
            <h1 className='font-semibold text-neutral-500 text-lg'>
              Free Shipping
            </h1>
            <h2 className='font-medium text-neutral-800'>Free shipping on order</h2>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <GrPowerCycle className='text-[30px] text-green-500' />
          <div className='flex flex-col'>
            <h1 className='font-semibold text-neutral-500 text-lg'>
              100% Money Back
            </h1>
            <h2 className='font-medium text-neutral-800'>f the item didn't suit you</h2>
          </div>
        </div>
      </div>
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-12">
        {data?.map((item, index) => (
          <Item item={item} key={index} style={{ marginTop: `${index}00px` }} />
        ))}
      </div>
    </div>
  )
}

export default Featuring