import Image from 'next/image'
import React from 'react'

const Avatar = ({ src }) => {
  return (
    <div>
      <Image
        className="rounded-full"
        width={40}
        height={40}
        alt="Avatar"
        src={src}
      />
    </div>)
}

export default Avatar