import Image from "next/image"

const Item = ({ item, className, style }) => {
  return (
    <div className={`relative max-w-sm h-[50vh] md:h-[70vh] border rounded-md overflow-hidden ${className} shadow-inner transition-all duration-300 hover:drop-shadow-xl drop-shadow-md bg-black`} style={style}>
      <div className="h-full w-full overflow-hidden">
        <Image
          width={300}
          height={300}
          src={item.images[0]}
          alt="images"
          className="w-full h-full object-cover"
        />
      </div>
      <div className={`absolute h-[100%] w-[100%] top-0 left-0 flex items-center flex-col justify-center`}>
        <h1 className={`text-2xl font-bold text-center text-white mb-[20px]`}>
          {item.title}
        </h1>
        <button className={`border-none p-[10px] bg-white text-gray-600 cursor-pointer font-medium`}>
          SHOP NOW
        </button>
      </div>
    </div>
  )
}

export default Item