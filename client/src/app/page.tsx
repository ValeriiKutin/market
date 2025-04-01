'use client'
import axios from 'axios'
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '@/src/store/productSlice'
import { RootState } from '../components/storeProvider/StoreProviderCustom'

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
  console.log(products);
  return (
    <div className='flex space-x-4 flex-wrap mt-5'>
      {products.map((product) => (
        <div
          key={product.price}
          className='w-[250px] border border-gray-100 p-[15px] group h-[350px] hover:h-[600px] transition-all duration-300 overflow-hidden hover:shadow-lg'
        >
          <img src={product?.image} alt="" className="w-[200px] h-[200px] object-cover rounded-lg max-w-full" />
          <p>{product.title}</p>
          <span>{product?.price} грн</span>
        </div>
      ))}
    </div>
  );
}
