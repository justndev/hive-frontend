import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import img from '../../assets/profile.jpeg'
import iconFilledHeart from '../../assets/heart-filled.svg'
import iconEmptyHeart from '../../assets/heart-empty.svg'
import iconComment from '../../assets/comments.svg'

import { timeAgo } from '../../utils/TimeFormatter';
import { getImageByFilename, getPost } from '../../api/messengerApi';
import { useAuth } from '../../utils/AuthContextProvider';
import { Post } from '../../utils/interfaces';

// Shows post in different page. Currently not done
const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Post>();
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const { token } = useAuth()

    useEffect(() => {
        if (!id) {
            return
        }
        const fetchPost = async () => {
            setPost(await getPost(Number(id), token))
        }
        fetchPost()
        const fetchImage = async () => {
            if (post) {
                setImageSrc(await getImageByFilename(post.filename, token));
            }
        }
        fetchImage()
    }
        , [])

    return (
        <div className=" flex flex-col justify-center items-center text-white 'overflow-auto overborder max-h-[700px]">

            <div className="bg-[#1A1A1B] rounded-3xl shadow-2xl w-[500px] pr-5 pl-5 pt-3 pb-5 flex flex-col">
                <div className='flex m-2 items-end'>
                    <img
                        src={img} width={48}
                        className='rounded-full'
                    />
                    <div className='flex flex-col ml-3'>
                        <a className='text-[20px] font-bold'>{post?.creatorUsername}</a>
                        <a className='text-[15px]'>Post</a>

                    </div>
                </div>
                {imageSrc && <img src={imageSrc} alt="Uploaded File" />}
                <div className='flex m-1 items-center'>
                    {
                        true ?
                            <img
                                src={iconFilledHeart}
                                width={30}
                                height={30}
                                className='mr-2'
                            />
                            :
                            <img
                                src={iconEmptyHeart}
                                width={30}
                                height={30}
                                className='mr-2'
                            />
                    }
                    <img
                        src={iconComment}
                        width={26}
                        height={26}
                    />
                    <a className='text-[#f1c1018f] font-bold text-[13px] ml-2'>{post ? timeAgo(post.time) : ''}</a>

                </div>
                <p>{post?.title}</p>
                <p>{post?.content}</p>
            </div>
        </div>
    )

}
export default PostDetails