import { categories } from '@/src/data/catalog'
import Link from 'next/link'
import React from 'react'

interface FilterProps {
  catalogUI: boolean
}

const FIlterBar: React.FC<FilterProps> = ({ catalogUI }) => {
  return (
    <div className='fixed'>
      {catalogUI && (
        <div className='border-[1px] p-[15px]'>
          {categories?.map((category) => (
            <div key={category?.id} className=''>
              {category?.title?.map((title) => (
                <Link href={title?.link} key={title.link} className='font-light hover:text-red-500 transition-all text-[14px]'>{title?.name}</Link>
              ))}
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default FIlterBar