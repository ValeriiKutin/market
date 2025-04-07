'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { getSportItemById } from "@/src/api/api";

interface CurrentItem {
    article: string
    category: string
    characteristics: string
    description: string
    id: number
    image: string
    price: string
    sizeS: string
    sizeM: string
    sizeL: string
    sizeXL: string
    sizeXXL: string
    title: string
}

const SportProductDetails = ({ id }: any) => {
    const [currentItem, setCurrentItem] = useState<CurrentItem[]>([])
    const [counter, setCounter] = useState<number>(1)
    useEffect(() => {
        const fetchItem = async () => {
            try {
                if (!id) return;
                const res = await getSportItemById(id);
                setCurrentItem(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchItem();
    }, [id]);

    const increaseButton = (e: any) => {
        e.preventDefault()
        if (counter > 1) {
            setCounter(counter - 1)
        }
    }

    return (
        <div className="mt-[35px]">
            {currentItem && currentItem?.map((item) => {
                const sizes = [item.sizeS, item.sizeM, item.sizeL, item.sizeXL, item.sizeXXL];
                const totalInStock = sizes.reduce((acc, size) => acc + Number(size), 0)

                return (<div className="flex items-center justify-between" key={item?.id}>
                    <div className="w-[49%] min-h-[460px] border-[1px] border-gray-200 flex items-center justify-center">
                        <img src={item?.image} alt="item-img" className="max-w-[400px]" />
                    </div>
                    <div className="w-[49%] min-h-[460px] border-[1px] border-gray-200 p-[25px]">
                        <div className="flex items-center space-x-1.5 mb-[5px]">
                            <Link href='/' className="text-[12px] text-gray-400 hover:text-red-500">Головна</Link>
                            <IoIosArrowForward className="text-[12px]" />
                            <Link href='/katalog' className="text-[12px] text-gray-400 hover:text-red-500">КАТАЛОГ</Link>
                            <IoIosArrowForward className="text-[12px]" />
                            <Link href='/termobilizna' className="text-[12px] text-gray-400 hover:text-red-500">Термобілизна Craft</Link>
                            <IoIosArrowForward className="text-[12px]" />
                            <Link href='/cholovicha-termobilizna' className="text-[12px] text-gray-400 hover:text-red-500">Чоловіча термобілизна</Link>
                        </div>
                        <p className="text-[24px]">{item?.title}</p>
                        <div className="flex items-center mb-[10px]">
                            {totalInStock > 0 ? (
                                <span className="text-green-500 text-[12px]">В наявності</span>
                            ) : (
                                <span className="text-red-500 text-[12px]">Немає в наявності</span>
                            )}
                            <p className="ml-3.5 text-[12px]">Артикул: {item?.article}</p>
                        </div>
                        <div className="">
                            <div className="flex justify-between">
                                <div className="text-[27px]">
                                    {item?.price} грн
                                </div>
                                <div className="flex items-center space-x-7">
                                    <Link href='' className="flex items-center text-[14px]"><IoCheckmarkCircleOutline className="mr-1 text-[25px]" />Порівняти</Link>
                                    <Link href='' className="flex items-center text-[14px]"><FaRegHeart className="mr-1 text-[20px]" />В бажання</Link>
                                </div>
                            </div>
                            <form>
                                <div className='flex items-center justify-start space-x-1.5 mt-[20px]'>
                                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                        <div key={size} className={`${Number(item[`size${size}` as keyof CurrentItem]) <= 0 && "opacity-5 pointer-events-none"}`}>
                                            <input
                                                type="radio"
                                                id={`${item.article}-${size}`}
                                                name={`size-${item.article}`}
                                                value={size}
                                                className="sr-only peer"
                                            />
                                            <label
                                                htmlFor={`${item.article}-${size}`}
                                                className="px-2 py-1 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-200 peer-checked:bg-black peer-checked:text-white peer-checked:hover:bg-amber-700 border-[1px]"
                                            >
                                                {size}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex space-x-6 mt-5">
                                    <div className="w-[92px] h-[38px] border-[1px] border-gray-300 rounded-[5px] flex items-center justify-between">
                                        <button className="w-[33%] flex items-center justify-center cursor-pointer" onClick={increaseButton}><FiMinus className={`${counter === 1 && 'text-gray-300'}`} /></button>
                                        <span className="w-[33%] flex items-center justify-center text-[14px]">{counter}</span>
                                        <button className="w-[33%] flex items-center justify-center cursor-pointer" onClick={(e: any) => {
                                            e.preventDefault();
                                            if (counter >= totalInStock) return;
                                            setCounter(counter + 1);
                                        }}><FiPlus /></button>
                                    </div>
                                    <input type="submit" className='cursor-pointer w-[85px] h-[38px] bg-black text-white rounded-[3px]' value='Купити' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
    )
}

export default SportProductDetails