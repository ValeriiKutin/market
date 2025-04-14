import { categories } from '@/src/data/catalog'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../storeProvider/StoreProviderCustom'

interface FilterProps {
  isCatalogUI: boolean
}

const FIlterBar: React.FC<FilterProps> = ({ isCatalogUI }) => {
  const [lowActivityCount, setLowActivityCount] = useState<number>(0)
  const [midActivityCount, setMidActivityCount] = useState<number>(0)
  const [highActivityCount, setHighActivityCount] = useState<number>(0)

  const products = useSelector((state: RootState) => state.product.products)


  useEffect(() => {
    const low = products.filter((product: any) => product.activityLevel === 'low-activity').length
    const mid = products.filter((product: any) => product.activityLevel === 'mid-activity').length
    const high = products.filter((product: any) => product.activityLevel === 'high-activity').length

    setLowActivityCount(low)
    setMidActivityCount(mid)
    setHighActivityCount(high)
  }, [products])

  return (
    <div className='fixed'>
      {isCatalogUI && (
        <div className='border-[1px] p-[15px] border-gray-200 rounded-[3px]'>
          {categories?.map((category) => (
            <div key={category?.id}>
              {category?.title?.map((title) => (
                <Link href={title?.link} key={title.link} className='font-light hover:text-red-500 transition-all text-[14px]'>{title?.name}</Link>
              ))}
            </div>
          ))}
          <div className='flex flex-col'>
            <p>Призначення</p>
            <label>
              <input type="checkbox" className="mr-[7px]" />
              Низька активність <span>{lowActivityCount}</span>
            </label>
            <label>
              <input type="checkbox" className="mr-[7px]" />
              Середня активність <span>{midActivityCount}</span>
            </label>
            <label>
              <input type="checkbox" className="mr-[7px]" />
              Висока активність <span>{highActivityCount}</span>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

export default FIlterBar