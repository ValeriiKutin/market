'use client'
import { Antonio } from 'next/font/google'
import React, { useEffect } from 'react'
import { RootState } from '@/src/components/storeProvider/StoreProviderCustom'
import { handleSignIn, handleSignOut } from '../../utils/authFuncs'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/src/config/firebase';
import Link from 'next/link';
import SearchBar from '../search-bar/Search';
import { checkIfItsAdmin } from "../../utils/checkIfAdmin"
import { useDispatch, useSelector } from 'react-redux';
import { setIsAdmin } from '@/src/store/productSlice'
import { PiSignInBold } from "react-icons/pi";
import { PiSignOutBold } from "react-icons/pi";
import axios from 'axios'
import { setCurrentUser } from '@/src/store/productSlice'

const antonio = Antonio({
    subsets: ['latin'],
    weight: ['400'],
})

const Header = () => {
    const [user] = useAuthState(auth);
    const dispath = useDispatch()
    const isAdmin = useSelector((state: RootState) => state.product.isAdmin)
    const currentUser = useSelector((state: RootState) => state.product.currentUser)


    useEffect(() => {
        const getUserByUid = async (uid: any) => {
            try {
                const res = await axios.get(`http://localhost:8800/users?uid=${uid}`);
                dispath(setCurrentUser(res.data))
            } catch (error) {
                console.error(error);
            }
        };
        if (user?.uid) {
            getUserByUid(user.uid);
        }
    }, [user])

    useEffect(() => {
        if (currentUser) {
            checkIfItsAdmin(currentUser, setIsAdmin, dispath);
        }
    }, [currentUser])


    return (
        // shadow-lg 
        <header className='flex justify-between items-center p-2'>
            <Link href='/' className={`${antonio.className} text-3xl cursor-pointer`}>
                market
            </Link>
            <SearchBar />
            {isAdmin && (
                <Link href='/admin-stuff' className='cursor-pointer border-2 border-black p-1 bg-indigo-300 text-amber-50'>
                    Admin panel
                </Link>
            )}

            <div>
                {user ? (
                    <div className='flex items-center'>
                        <div className='group relative'>
                            <img src={user?.photoURL || ''} alt="userimg" className='rounded-full h-[40px] w-[40px] mr-[15px] relative z-10' />
                            <div className='relative z-[5] top-[-12px]'>
                                <div className="absolute right-0 top-full mt-4 w-32 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 before:content-[''] before:absolute before:bg-white before:w-[50px] before:h-[20px] before:top-[-20px] before:right-[10px]">
                                    <ul className="text-sm text-gray-700">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Профіль</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Налаштування</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" onClick={() => handleSignOut(dispath, setIsAdmin)}> Вийти<PiSignOutBold className='ml-1.5' /></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                ) : (
                    <button className='cursor-pointer flex items-center justify-center h-[40px] w-[90px] bg-stone-700 text-white text-[16px] font-medium border-[2px] border-stone-700 hover:bg-amber-50 hover:text-black transition-all duration-300 ease-in-out' onClick={handleSignIn}>Log in<PiSignInBold className='ml-1.5' /></button>
                )}
            </div>
        </header>
    )
}

export default Header;