import { HiOutlineDotsVertical } from 'react-icons/hi'
import LikeSection from './LikeSection'
import CommentSection from './CommentSection'

const Post = ({post}) => {
  return (
    <div className='bg-white my-7 border rounded-md'>
      <div className='flex items-center p-5 border-b border-gray-100'>
        <img
          src={post.profileImg}
          alt={post.username}
          className='h-12 rounded-full object-cover border p-1 mr-3'
        />
        <p className='flex-1 font-bold'>{post.username}</p>
        <HiOutlineDotsVertical className='h-5 cursor-pointer' />
      </div>
      <img
        src={post.image}
        alt={post.caption}
        className='object-cover w-full'
      />
      <LikeSection id={post.id} uid={post.uid} />
      <p className='p-5 truncate'>
        <span className='font-bold mr-2 text-gray-700'>@{post.username}</span>
        <span className='font-serif font-semibold'>{post.caption}</span>
      </p>
      <CommentSection id={post.id} />
    </div>
  )
}

export default Post
