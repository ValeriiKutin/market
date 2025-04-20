import React from 'react'
import { IoWalletSharp } from "react-icons/io5";
import { RiExchangeBoxFill } from "react-icons/ri";
import { MdLocalShipping } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const BenefitList = () => {
    return (
        <div className='flex justify-between mb-[50px] w-full'>
            <div className='flex items-center'>
                <IoWalletSharp className='text-[60px] mr-[15px]' />
                <p className="text-[18px]">Оплата при отриманні</p>
            </div>
            <div className='flex items-center'>
                <RiExchangeBoxFill className='text-[60px] mr-[15px]' />
                <p className="text-[18px]">Обмін та повернення</p>
            </div>
            <div className='flex items-center'>
                <MdLocalShipping className='text-[60px] mr-[15px]' />
                <p className="text-[18px]">Швидка доставка</p>
            </div>
            <div className='flex items-center'>
                <FaLocationDot className='text-[60px] mr-[15px]' />
                <p className="text-[18px]">Магазин в центрі Києва"</p>
            </div>
        </div>
    )
}

export default BenefitList