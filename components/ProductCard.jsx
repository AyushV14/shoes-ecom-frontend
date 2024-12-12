import { getDiscountedPricePercentage } from '@/utlis/helper'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({data}) => {
  
  return (
    <Link href={`/product/${data.slug}`} className='transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer'>
        
        <Image
          src={data?.image?.[0]?.formats?.medium?.url}
          width={500}
          height={500}
          alt={data?.name}
        />
        <div className='p-4 text-black/[0.9] flex flex-col items-start '>
            <h2 className='text-lg font-medium'>{data.name}</h2>
            <div className='flex items-center text-black/[0.5]'>
                <p className='mr-2 text-lg font-semibold'>&#8377; {data.price}</p>
                <p className='mr-2 text-lg font-medium line-through'>&#8377; {data.original_price}</p>
                <p className='ml-auto text-base font-medium text-green-500'>{getDiscountedPricePercentage(data.original_price,data.price)}% off</p>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard