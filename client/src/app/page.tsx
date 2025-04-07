'use client'
import axios from 'axios'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '@/src/store/productSlice'
import { RootState } from '../components/storeProvider/StoreProviderCustom'
import SportProductCard from '../components/sport-product-card/SportProductCard'
import { getSportStuff } from '../api/api'

export default function Home() {
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.product.products)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getSportStuff()
        dispatch(setProducts(res.data))
      } catch (error) {
        console.error(error)
      }
    }
    fetchProducts()

  }, [dispatch])

  return (
    <div className='flex space-x-4 flex-wrap mt-5'>
      {products.map((product) => (
        <SportProductCard product={product} key={product.article} />
      ))}
    </div>
  );
}