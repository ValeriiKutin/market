'use client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '@/src/store/productSlice'
import { getSportStuff } from "@/src/api/api"
import SportProductCard from "@/src/components/sport-product-card/SportProductCard"
import { RootState } from "@/src/components/storeProvider/StoreProviderCustom"
import FilterBar from "@/src/components/filter-bar/FIlterBar"


const Catalog = () => {
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
        <div>
            <FilterBar catalogUI={true} />
            <div className='flex space-x-4 flex-wrap mt-5 ml-[300px]'>
                {products.map((product) => (
                    <SportProductCard product={product} key={product.article} />
                ))}
            </div>
        </div>
    )
}

export default Catalog
