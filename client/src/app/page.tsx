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
    <div>
      {products.map((product) => (
        <div key={product.price}><img src={product?.image} alt="" /></div>
      ))}
    </div>
  );
}
