import { categories } from '@/src/data/catalog';
import Link from 'next/link'
import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoCart } from "react-icons/io5";


const BottomHeader = () => {
    return (
        <div className='flex h-[40px] bg-[#e0e0e0] mt-3 justify-between'>
            <div className='flex items-center justify-center'>
                <button className='group flex justify-center items-center bg-black text-amber-50 h-[100%] w-[120px] font-bold cursor-pointer mr-5 relative pl-[15px] pr-[15px]'>Каталог<IoIosArrowDown className='ml-[10px]' />
                    <div className='absolute top-[40px] left-0 h-[500px] w-[1210px] bg-white hidden group-hover:block shadow-lg p-[15px] z-[5]'>
                        <div className='flex space-x-3'>
                            <Link href='/catalog' className='text-black font-medium hover:text-red-500 mr-[25px]'>Каталог</Link>
                            {categories?.map((category) => (
                                <div key={category.id} className='flex justify-start items-start'>
                                    <img src={category?.image} alt="" />
                                    <div className='text-black'>
                                        {category.title?.map((title) => (
                                            <Link key={title.link} href={title.link}><p className='text-left hover:text-red-500'>{title.name}</p></Link>
                                        ))}
                                        {category.subcategories?.map((subcategor) => (
                                            <ul key={subcategor?.id} className='flex flex-col items-start font-normal text-[15px] hover:text-red-500'>
                                                <Link href={`${category.title[0].link}${subcategor.link}`}>{subcategor?.name}</Link>
                                            </ul>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </button>

                <div className='text-[15px] space-x-3'>
                    <Link href='/aboutus'>Про нас</Link>
                    <Link href='/aboutus'>Оплата і доставка</Link>
                    <Link href='/aboutus'>Обмін та повернення</Link>
                    <Link href='/aboutus'>Контактна інформація</Link>
                    <Link href='/aboutus'>Угода користувача</Link>
                    <Link href='/aboutus'>Політика конфідеційності</Link>
                    <Link href='/aboutus'>Блог</Link>
                </div>
            </div>
            <div className='flex justify-center items-center text-[17px] mr-[20px]'>
                <select className='cursor-pointer'>
                    <option value="ua">Укр</option>
                    <option value="eng">Eng</option>
                </select>
                <div className='flex items-center justify-center ml-2'>
                    <IoCart className='mr-1 text-2xl' />
                    Мій кошик
                </div>
            </div>
        </div>
    )
}

export default BottomHeader;