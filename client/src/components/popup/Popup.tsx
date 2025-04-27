'use client'
import { Products } from '@/src/store/productSlice'
import Image from 'next/image';
import React, { useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi';
import { IoMdClose } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import Link from 'next/link';

interface PopupProps {
    id: string,
    product: Products[]
}

const Popup = ({ }) => {
    const [counter, setCounter] = useState<number>(1)
    const increaseButton = (e: any) => {
        e.preventDefault()
        if (counter > 1) {
            setCounter(counter - 1)
        }
    }
    return (
        <div className='bg-black/70 w-full h-full fixed top-0 left-0'>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-h-[660px] w-[730px] shadow-2xl bg-white z-60 p-[30px] rounded-[4px]'>
                <p className='text-[32px] font-[400]'>Кошик</p>
                <button className='text-[25px] cursor-pointer absolute top-[5px] right-[5px]'><IoMdClose /></button>

                <div className='flex w-full justify-end'>
                    <div className='flex items-center text-[13px] space-x-[80px]'>
                        <p>Кількість</p>
                        <p className='mr-[20px]'>Вартість</p>
                    </div>
                </div>
                <div className='border-[1px] border-gray-200 p-[10px] mt-[20px]'>
                    <div className='flex items-center justify-between'>
                        <Image src='/temporary.webp' width={100} height={100} alt='cart-item' />
                        <p>Шапка Shelter Hat 2.0, Чорний, S/M</p>
                        <div className="flex">
                            <div className="w-[92px] h-[38px] border-[1px] border-gray-300 rounded-[5px] flex items-center justify-between">
                                <button className="w-[33%] flex items-center justify-center cursor-pointer" onClick={increaseButton}><FiMinus className={`${counter === 1 && 'text-gray-300'}`} /></button>
                                <span className="w-[33%] flex items-center justify-center text-[14px]">{counter}</span>
                                <button className="w-[33%] flex items-center justify-center cursor-pointer" onClick={(e: any) => {
                                    e.preventDefault();
                                    // if (counter >= 'totalInStock') return;
                                    setCounter(counter + 1);
                                }}><FiPlus /></button>
                            </div>
                        </div>
                        <span className='text-[15px]'><b>1400 грн</b></span>
                    </div>
                </div>
                <div className='border-[1px] border-gray-200 mt-[30px] p-[20px]'>
                    <div className='flex items-center justify-end mb-3.5 space-x-2.5'>
                        <p>Всього</p>
                        <b>38 640 грн</b>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <GoArrowLeft className='text-[20px] mr-1.5 cursor-pointer' />
                            <button className='cursor-pointer'>Повернутись до покупок</button>
                        </div>
                        <Link href='#' className='flex items-center justify-center text-[18px] bg-black text-white pl-[20px] pr-[20px] rounded-[5px] h-[40px] cursor-pointer '>Оформити замовлення</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup