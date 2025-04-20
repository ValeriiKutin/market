import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const MainPageBanners = () => {
    return (
        <div className='mt-[35px] mb-[65px]'>
            {/* main banner */}
            <div>
                <Link href='/catalog'>
                    <Image
                        src="/banners/1-banner.webp"
                        alt="main-banner"
                        width={1920}
                        height={600}
                        sizes="100vw"
                        className='w-full h-auto'
                    />
                </Link>
            </div>

            {/* other banners */}
            <div className='mt-4 flex gap-4'>
                <div className='relative w-[459px] aspect-[459/229]'>
                    <Link href=''>
                        <Image
                            src='/banners/4-banner.webp'
                            alt='main-banner'
                            fill
                            className='object-contain'
                        />
                    </Link>
                </div>
                <div className='relative w-[459px] aspect-[459/229]'>
                    <Link href=''>
                        <Image
                            src='/banners/2-banner.webp'
                            alt='main-banner'
                            fill
                            className='object-contain'
                        />
                    </Link>
                </div>
                <div className='relative w-[459px] aspect-[459/229]'>
                    <Link href=''>
                        <Image
                            src='/banners/3-banner.webp'
                            alt='main-banner'
                            fill
                            className='object-contain'
                        />
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default MainPageBanners