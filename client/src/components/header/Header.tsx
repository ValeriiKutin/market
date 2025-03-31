'use client'
import { Antonio } from 'next/font/google'
import React from 'react'
import { handleSignIn, handleSignOut } from '../../utils/authFuncs'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/src/config/firebase';
import Link from 'next/link';
import SearchBar from '../search-bar/Search';

const antonio = Antonio({
    subsets: ['latin'],
    weight: ['400'],
})

const Header = () => {
    const [user] = useAuthState(auth);

    return (
        <div className='flex justify-between items-center shadow-lg p-2'>
            <Link href='/' className={`${antonio.className} text-3xl cursor-pointer`}>
                market
            </Link>
            <SearchBar />
            <Link href='/admin-stuff' className='cursor-pointer border-2 border-black p-1 bg-gray-600 text-amber-50'>
                Admin panel
            </Link>
            <div>
                {user ? (
                    <button className='cursor-pointer' onClick={handleSignOut}>Sign Out</button>
                ) : (
                    <button className='cursor-pointer' onClick={handleSignIn}>Sign In</button>
                )}
            </div>
        </div>
    )
}

export default Header;