'use client';
import { app } from '@/firebase';
import { collection, deleteDoc, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { HiHeart, HiOutlineHeart, HiOutlineTrash } from 'react-icons/hi';

const LikeSection = ({ id, uid }) => {
    const {data: session} = useSession();
    const [hasLiked, setHasLiked] = useState(false);
    const [likes, setLikes] = useState([]);
    const db = getFirestore(app);

    useEffect(() => {
        onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
            setLikes(snapshot.docs)
        })
    }, [db]);

    useEffect(() => {
        if(likes.findIndex((like) => like.id === session?.user?.uid) !== -1) {
            setHasLiked(true);
        } else {
            setHasLiked(false);
        }
    }, [likes]);

    const likePost = async() => {
      if(session){
        if(hasLiked) {
          await deleteDoc(doc(db, 'posts', id, 'likes', session?.user?.uid));
      } else {
          await setDoc(doc(db, 'posts', id, 'likes', session?.user?.uid), {
              username: session?.user?.username
          })
      }
      } else {
        signIn();
      }
       
    } 

    const deletePost = async() => {
      if(confirm('Are you sure you want to delete this post?')) {
        if(session?.user?.uid === uid){
          await deleteDoc(doc(db, 'posts', id))
          .then(() => {
            alert("Post has been deleted successfully!");
            location.reload();
          })
          .catch((error) => {
            alert("Error occured: ", error)
          })

        } else {
          alert("You're not authorized to delete this post.")
        }
      }
    }

  return (
    <div>
      <div className='flex border-t border-gray-100 px-4 pt-4'>
        <div className='flex items-center gap-2'>
          {hasLiked ? (
            <HiHeart
              onClick={likePost}
              className='text-red-500 cursor-pointer text-3xl  hover:scale-125 transition-transform duration-200 ease-out'
            />
          ) : (
            <HiOutlineHeart
              onClick={likePost}
              className='cursor-pointer text-3xl  hover:scale-125 transition-transform duration-200 ease-out'
            />
          )}
          {likes.length > 0 && (
            <p className='text-gray-500'>
              {likes.length} {likes.length === 1 ? 'like' : 'likes'}
            </p>
          )}
          {
            session?.user?.uid === uid && (
              <HiOutlineTrash
              className='h-10 w-10 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100'
              onClick={deletePost}
            />
            )
          }
        
        </div>
      </div>
   
  </div>
  )
}

export default LikeSection
