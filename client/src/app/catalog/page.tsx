'use client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { setFilteredProductsByActivity, setProducts } from '@/src/store/productSlice'
import { getSportStuff } from "@/src/api/api"
import SportProductCard from "@/src/components/sport-product-card/SportProductCard"
import { RootState } from "@/src/components/storeProvider/StoreProviderCustom"
import FilterBar from "@/src/components/filter-bar/FIlterBar"
import { setHighActivityCount, setLowActivityCount, setMidActivityCount } from "@/src/store/activityAmountFilterSlise"


const Catalog = () => {
    /*   const highActivityCount = useSelector((state: RootState) => state.activityFilter.highActivityCount)
      const midActivityCount = useSelector((state: RootState) => state.activityFilter.midActivityCount)
      const lowActivityCount = useSelector((state: RootState) => state.activityFilter.lowActivityCount) */
    const highSelected = useSelector((state: RootState) => state.activityFilter.highSelected)
    const midSelected = useSelector((state: RootState) => state.activityFilter.midSelected)
    const lowSelected = useSelector((state: RootState) => state.activityFilter.lowSelected)
    const filteredProductsByActivity = useSelector((state: RootState) => state.product.filteredProductsByActivity)
    const products = useSelector((state: RootState) => state.product.products)
    const dispatch = useDispatch()

    const filterProductsByActivityValue = () => {
        const filtered = products.filter((product) => {
            return (
                (lowSelected && product.activityLevel === 'low-activity') ||
                (midSelected && product.activityLevel === 'mid-activity') ||
                (highSelected && product.activityLevel === 'high-activity')
            )
        })

        dispatch(setFilteredProductsByActivity(filtered))
    }

    useEffect(() => {
        const low = products.filter((product: any) => product.activityLevel === 'low-activity').length
        const mid = products.filter((product: any) => product.activityLevel === 'mid-activity').length
        const high = products.filter((product: any) => product.activityLevel === 'high-activity').length

        dispatch(setLowActivityCount(low))
        dispatch(setMidActivityCount(mid))
        dispatch(setHighActivityCount(high))
    }, [products])

    useEffect(() => {
        filterProductsByActivityValue()
    }, [lowSelected, midSelected, highSelected, products])

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
            <FilterBar isCatalogUI={true} />
            <div className='flex space-x-4 flex-wrap mt-5 ml-[300px]'>
                {highSelected === true || midSelected === true || lowSelected === true ? (
                    filteredProductsByActivity?.map((product) => (
                        <SportProductCard product={product} key={product.article} />
                    ))
                ) : (
                    products?.map((product) => (
                        <SportProductCard product={product} key={product.article} />
                    ))
                )}
            </div>
        </div>
    )
}

export default Catalog
