'use client';
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AccountDetails = () => {
    const {data: session} = useSession();
    const router = useRouter();

    const handleSignout = async () => {
        await signOut()
    };

   useEffect(() => {
    if(!session){
        router.push('/', {scroll: false})
    }
   }, [session])

  return (
    <div className='flex flex-col justify-center items-center bg-gray-800  max-w-3xl mx-auto my-5 rounded-lg py-5 px-6 shadow-2xl shadow-black'>
        <div className='flex justify-center items-center flex-col space-y-5'>
            <h1 className='text-3xl font-bold font-sans text-gray-400'>User Details</h1>
            <img src={session?.user?.image} alt="profile" className='w-18 h-18 rounded-full shadow-lg bg-gray-300' />
        </div>
        <div className='w-full'>
            <div className='flex space-x-4 my-4 items-center justify-between bg-gray-200 px-4 py-5 rounded-lg'>
                <p className='text-lg font-semibold font-serif'>UserID: </p>
                <p className='text-lg font-semibold font-serif text-gray-600'>{session?.user?.uid}</p>
            </div>
            <div className='flex space-x-4 my-4 items-center justify-between bg-gray-200 px-4 py-5 rounded-lg'>
                <p className='text-lg font-semibold font-serif'>Username: </p>
                <p className='text-lg font-semibold font-serif text-gray-600'>{session?.user?.username}</p>
            </div>
            <div className='flex space-x-4 my-4 items-center justify-between bg-gray-200 px-4 py-5 rounded-lg'>
                <p className='text-lg font-semibold font-serif'>Name: </p>
                <p className='text-lg font-semibold font-serif text-gray-600'>{session?.user?.name}</p>
            </div>
            <div className='flex space-x-4 my-4 items-center justify-between bg-gray-200 px-4 py-5 rounded-lg'>
                <p className='text-lg font-semibold font-serif'>Email: </p>
                <p className='text-lg font-semibold font-serif text-gray-600'>{session?.user?.email}</p>
            </div>
           
        </div>
        <button type='button' onClick={handleSignout} className='bg-gray-700 shadow-xl text-gray-200 hover:bg-gray-500 px-4 py-3 rounded-xl text-lg font-bold w-32'>Signout</button>
    </div>
  )
}

export default AccountDetails
