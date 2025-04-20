import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SmallBanners = () => {
    return (
        <div className='flex items-center gap-4 mb-[60px]'>
            <div className='relative w-[697px] aspect-[697/216]'>
                <Link href={''}>
                    <Image src='/other-banners/other-banner1.webp' alt='other-banners' fill className='object-contain' />
                </Link>
            </div>
            <div className='relative w-[697px] aspect-[697/216]'>
                <Link href={''}>
                    <Image src='/other-banners/other-banner2.webp' alt='other-banners' fill className='object-contain' />
                </Link>
            </div>
        </div>
    )
}

export default SmallBanners