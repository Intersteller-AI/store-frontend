import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { IoMdHeartEmpty } from 'react-icons/io'


const ProductCard = ({ data }) => {

  const router = useRouter()

  const [liked, setLiked] = useState(false)



  return (
    <div className="transform rounded-lg relative overflow-hidden flex flex-col bg-white duration-200 hover:scale-105 cursor-pointer">
      <div className="z-50 w-full flex justify-end items-start p-4 absolute top-0 left-0 ">
        <button
          className={`${liked ? "wishlist-remove" : "wishlist-info"
            } absolute top-0 right-0 p-4 m-4 rounded-full ${liked ? "bg-green-400" : "bg-rose-500"
            } text-white text-lg flex items-center justify-center`}
          onClick={() => setLiked(!liked)}
        >
          {liked ? <AiOutlineCheck size={20} /> : <IoMdHeartEmpty size={20} />}
        </button>
      </div>
      <div onClick={() => router.push(`/product/${data?.id}`)}>
        <Image
          width={500}
          height={500}
          src={data?.images[0]}
          alt={data?.title}
          priority
          className="rounded-md"
        />
        <div className="p-4 text-black/[0.9]">
          <h2 className="text-lg font-semibold">{data?.title}</h2>
          <p className='mr-8 text-black/70 font-medium truncate'>{data?.description}</p>
          <div className="flex items-center text-black/[0.5]">
            <p className="mr-2 font-semibold">&#36;{data?.price}</p>
          </div>
        </div>
      </div>
    </div>)
}

export default ProductCard