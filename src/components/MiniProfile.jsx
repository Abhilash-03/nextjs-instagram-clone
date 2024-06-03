'use client';

import { useSession, signIn, signOut } from "next-auth/react";

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div className='flex flex-col xl:flex-row lg:items-center lg:justify-between mt-14 ml-10 w-full bg-gray-200 px-3 py-4 rounded-2xl shadow-lg border'>
      <img
        src={session?.user?.image || '/800px-Instagram_logo_2016.webp'}
        alt='profile image'
        className='w-16 h-16 rounded-full border p-[2px]'
      />
      <div className='flex-1 ml-4'>
        <h2 className='font-bold'>{session?.user?.username}</h2>
        <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
      </div>
      {session ? (
        <button
          onClick={signOut}
          className='text-blue-500 text-sm font-semibold text-left ml-5'
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={signIn}
          className='text-blue-500 text-sm font-semibold text-left ml-5'
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default MiniProfile;
