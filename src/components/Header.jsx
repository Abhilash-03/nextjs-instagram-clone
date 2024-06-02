'use client';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

const Header = () => {
  const {data: session} = useSession();
  return (
     <div className='shadow-sm border-b sticky top-0 bg-white z-30 p-3'>
      <div className='flex justify-between items-center max-w-6xl mx-auto'>
         {/* logo */}
           <Link href='/' className='hidden lg:inline-flex' > 
            <Image
             src='/Instagram_logo_black.webp'
             width={96}
             height={96}
             alt='instagram logo'
            />
           </Link>

           <Link href='/' className='lg:hidden'>
            <Image
              src='/800px-Instagram_logo_2016.webp'
              width={40}
              height={40}
              alt='instagram logo'
            />
        </Link>
         {/* search input */}
         
        <input
          type='text'
          placeholder='Search'
          className='bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]'
        />
         {/* menu items */}

         {
          session ? (
             // eslint-disable-next-line @next/next/no-img-element
             <img src={session.user.image} alt={session.user.name} width={40} height={40} className='h-10 w-10 rounded-full cursor-pointer'  onClick={signOut}/>
          ) : (
            <button
            onClick={signIn}
               className='text-sm font-semibold text-blue-500'
             >
               Log In
             </button>
          )
         }
      
      </div>
     </div>
  )
}

export default Header
