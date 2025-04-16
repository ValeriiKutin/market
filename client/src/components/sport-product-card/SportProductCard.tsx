import { Product } from '@/src/store/productSlice'
import Link from 'next/link'
import { IoMdInformationCircleOutline } from 'react-icons/io'

const SportProductCard = ({ product }: any) => {

    return (
        <div
            className='relative w-[250px] border border-gray-100 p-[15px] group h-[310px] transition-all duration-300 hover:shadow-lg mb-3.5'
        >
            <Link href={`item/${product.id}`} key={product.id}> <img src={product?.image} alt="" className="w-[200px] h-[200px] object-cover rounded-lg max-w-full" />
                <p className='font-light'>{product.title}</p>
            </Link>
            <span className='font-bold text-[15px]'>{product?.price} грн</span>
            <div className='absolute bottom-[-90px] left-0 w-full p-[15px] bg-white z-10 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg'>
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
    )
}

export default SportProductCard
// import { Product } from '@/src/store/productSlice'
// import Link from 'next/link'
// import { IoMdInformationCircleOutline } from 'react-icons/io'

// const SportProductCard = ({ product }: any) => {

//     return (
//          <div
//             className='w-[250px] border border-gray-100 p-[15px] group h-[310px] hover:h-[450px] transition-all duration-300 overflow-hidden hover:shadow-lg'
//         >
//             <Link href={`item/${product.id}`} key={product.id}> <img src={product?.image} alt="" className="w-[200px] h-[200px] object-cover rounded-lg max-w-full" />
//                 <p className='font-light'>{product.title}</p>
//             </Link>
//             <span className='font-bold text-[15px]'>{product?.price} грн</span>
//             <div className='mt-[41px]'>
//                 <p className='flex items-center'>Розмір<IoMdInformationCircleOutline className='text-[15px] ml-1' /></p>
//                 <form className=''>
//                     <div className='flex items-center justify-start space-x-1.5 mt-1.5'>
//                         {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
//                             <div key={size} className={`${Number(product[`size${size}` as keyof Product]) <= 0 && "opacity-5 pointer-events-none"}`}>
//                                 <input type="radio" id={`${product.article}-${size}`} name="size" value={size} className="sr-only peer" />
//                                 <label className="border px-2 py-1 rounded-md cursor-pointer transition-all duration-200
//            hover:bg-gray-200 peer-checked:bg-black peer-checked:text-white peer-checked:hover:bg-amber-700" htmlFor={`${product.article}-${size}`}>{size}</label>
//                             </div>
//                         ))}
//                     </div>
//                     <input type="submit" className='cursor-pointer w-[85px] h-[38px] bg-black text-white rounded-[3px] mt-3' value='Купити' />
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default SportProductCard