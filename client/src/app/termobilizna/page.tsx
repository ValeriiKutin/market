'use client'
import SportProductCard from '@/src/components/sport-product-card/SportProductCard'
import { RootState } from '@/src/components/storeProvider/StoreProviderCustom'
import { refreshProducts } from '@/src/services/refreshProducts'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const Termobilizna = () => {
    const products = useSelector((state: RootState) => state.product.products)
    const pathname = usePathname()
    const editPathName = pathname.slice(1, pathname.length)
    const dispatch = useDispatch()

    const filterProduct = products.filter((product) => product.section === editPathName)

    useEffect(() => {
        refreshProducts(dispatch)
    }, [dispatch])
    return (
        <div className='flex space-x-4 flex-wrap mt-5'>
            {filterProduct.map((product) => (
                <SportProductCard product={product} key={product.article} />
            ))}
        </div>
    )
}

export default Termobilizna;