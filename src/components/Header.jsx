'use client';
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import Modal from 'react-modal';
import { useEffect, useRef, useState } from 'react';
import {IoMdAddCircleOutline} from 'react-icons/io';
import { HiCamera } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { app } from '@/firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, getFirestore, serverTimestamp} from 'firebase/firestore';

const Header = () => {
  const {data: session} = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [postUploading, setPostUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const filePickerRef = useRef(null);
  const db = getFirestore(app);

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if(file){
      setImageFileUrl(URL.createObjectURL(file)); //converting image into url.
      setSelectedFile(file);
      console.log(imageFileUrl);
    }
  }
  // console.log(session);
  const uplaodImageToStorage = async() => {
    setImageFileUploading(true);
   const storage = getStorage(app);
   const filename = new Date().getTime() + '-' + selectedFile.name;
   const storageRef = ref(storage, filename);
   const uploadTask = uploadBytesResumable(storageRef, selectedFile);
   uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress =
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
    (error) => {
      console.error(error);
      setImageFileUploading(false);
      setImageFileUrl(null);
      setSelectedFile(null);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageFileUrl(downloadURL);
        setImageFileUploading(false);
      });
  })

  }

  useEffect(() => {
    if(selectedFile) {
      uplaodImageToStorage();
    }
  }, [selectedFile]);

  const handleSubmit = async() => {
      setPostUploading(true);
      const docRef = await addDoc(collection(db, 'posts'), {
        uid: session.user.uid,
        username: session.user.username,
        caption,
        profileImg: session.user.image,
        image: imageFileUrl,
        timeStamp: serverTimestamp()
      });
      setPostUploading(false);
      setIsOpen(false);
      location.reload();
  }

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
            <div className='flex gap-2 items-center'>
                 <IoMdAddCircleOutline
              className='text-2xl cursor-pointer tranform hover:scale-125 transition duration-300 hover:text-red-600'
              onClick={() => setIsOpen(true)}
            />
            <Link href={'/account-details'}>
             <img src={session.user.image} alt={session.user.name} width={40} height={40} className='h-10 w-10 rounded-full cursor-pointer' />
             </Link>
             </div>
          ) : (
            <button
            onClick={signIn}
               className='text-sm font-semibold text-blue-500'
             >
               Signin
             </button>
          )
         }
      
      </div>
      {
        isOpen && (
          <Modal isOpen={isOpen} className='max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md'  onRequestClose={() => setIsOpen(false)} ariaHideApp={false}>
             <div className='flex flex-col justify-center items-center h-[100%]'>
              {
                selectedFile ? (
                <img src={imageFileUrl} alt={selectedFile.name} className={`w-full max-h-[250px] object-contain cursor-pointer ${imageFileUploading ? 'animate-pulse' : null}`} onClick={() => setSelectedFile(null)} />
                ) : (
                  <HiCamera className='text-5xl text-gray-400 cursor-pointer' onClick={() => filePickerRef.current.click()} />
                )
              }
               <input hidden ref={filePickerRef} type="file" accept='image/*' onChange={addImageToPost} />

               <input type="text" placeholder='Please enter your caption...' maxLength='150' className='m-4 border-none text-center 
               w-full focus:ring-0 outline-none' onChange={(e) => setCaption(e.target.value)} />
                <button
                   disabled={
                    !selectedFile ||
                    caption.trim() === '' ||
                    postUploading ||
                    imageFileUploading
                  }
                onClick={handleSubmit}
            className='w-full bg-red-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:text-black'
          >
            Upload Post
          </button>
          <AiOutlineClose
            className='cursor-pointer absolute top-2 right-2 hover:text-red-600 transition duration-300'
            onClick={() => setIsOpen(false)}
          />
             </div>
          </Modal>
        )
      }
     </div>
  )
}

export default Header
