'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './slider-styles.css'
import { Navigation } from 'swiper/modules';
import SportProductCard from '../sport-product-card/SportProductCard';
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import { Products } from '@/src/store/productSlice';

interface SliderProps {
    sliderTitle: string;
    products: Products[];
}



const ProductsSlider = ({ sliderTitle, products }: SliderProps) => {
    // const products = useSelector((state: RootState) => state.product.products)
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     refreshProducts(dispatch)
    // }, [dispatch])
    return (

        <div className='h-[417px] w-[97%] relative mb-[40px] z-0'>
            <p className='text-[21px] text-red-500 text-center mb-[20px] font-bold'>{sliderTitle}</p>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                navigation={{
                    prevEl: '.custom-swiper-prev',
                    nextEl: '.custom-swiper-next',
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
                modules={[Navigation]}
                className="mySwiper"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <SportProductCard product={product} />
                    </SwiperSlide>
                ))}
                <div className="custom-swiper-prev absolute top-[38%] left-[-30px] transform -translate-y-1/2 z-50 cursor-pointer w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center text-black">
                    <FiArrowLeft className='text-4xl' />
                </div>
                <div className="custom-swiper-next absolute top-[38%] right-[-30px] transform -translate-y-1/2 z-50 cursor-pointer w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center text-black">
                    <FiArrowRight className='text-4xl' />
                </div>
            </Swiper>
        </div>
    )
}

export default ProductsSlider
