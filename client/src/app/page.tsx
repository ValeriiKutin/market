'use client'
import axios from 'axios'
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Product, setProducts } from '@/src/store/productSlice'
import { RootState } from '../components/storeProvider/StoreProviderCustom'
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function Home() {
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.product.products)

  useEffect(() => {
    const getSportStaff = async () => {
      try {
        const res = await axios.get('http://localhost:8800/sportstuff')
        dispatch(setProducts(res.data))
      } catch (error) {
        console.error(error)
      }
    }
    getSportStaff()

  }, [dispatch])
  return (
    <div className='flex space-x-4 flex-wrap mt-5'>
      {products.map((product) => (
        <div
          key={product.article}
          className='w-[250px] border border-gray-100 p-[15px] group h-[310px] hover:h-[450px] transition-all duration-300 overflow-hidden hover:shadow-lg'
        >
          <img src={product?.image} alt="" className="w-[200px] h-[200px] object-cover rounded-lg max-w-full" />
          <p className='font-light'>{product.title}</p>
          <span className='font-bold text-[15px]'>{product?.price} грн</span>
          <div className='mt-[17px]'>
            <p className='flex items-center'>Розмір<IoMdInformationCircleOutline className='text-[15px] ml-1' /></p>
            <form className=''>
              <div className='flex items-center justify-start space-x-1.5 mt-1.5'>
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <div key={size} className={`${Number(product[`size${size}` as keyof Product]) <= 0 && "opacity-5 pointer-events-none"}`}>
                    <input type="radio" id={`${product.article}-${size}`} name="size" value={size} className="sr-only peer" />
                    <label className="border px-2 py-1 rounded-md cursor-pointer transition-all duration-200 
hover:bg-gray-200 peer-checked:bg-black peer-checked:text-white peer-checked:hover:bg-amber-700" htmlFor={`${product.article}-${size}`}>{size}</label>
                  </div>
                ))}
              </div>
              <input type="submit" className='cursor-pointer w-[85px] h-[38px] bg-black text-white rounded-[3px] mt-3' value='Купити' />
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
