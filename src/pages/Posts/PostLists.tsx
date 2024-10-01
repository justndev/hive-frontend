import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import iconProfile from '../../assets/profile.jpeg'
import iconFilledHeart from '../../assets/heart-filled.svg'
import iconEmptyHeart from '../../assets/heart-empty.svg'
import iconComment from '../../assets/comments.svg'

import { timeAgo } from '../../utils/TimeFormatter';
import { getImageByFilename, getPosts } from "../../api/messengerApi"
import { useAuth } from "../../utils/AuthContextProvider"
import { Post } from '../../utils/interfaces';


// Posts feed. Shows all uploaded posts
const PostItem: React.FC<Post> = ({ id, creatorUsername, time: creationDate, content, title, filename: img }) => {
    const { token } = useAuth()
    const [imageSrc, setImageSrc] = useState<string | null>(null);


    useEffect(() => {
        const fetchImage = async () => {
            setImageSrc(await getImageByFilename(img, token));
        }
        fetchImage()
    }, [])

    return (

        <Link to={`/post/${id}`}>
            <div className="flex flex-col justify-center items-center text-white mb-10 h-full">


                <div className="bg-[#1A1A1B] rounded-3xl shadow-2xl w-[500px] pr-5 pl-5 pt-3 pb-5 flex flex-col">
                    <div className='flex m-2 items-end'>
                        <img
                            src={iconProfile} width={48}
                            className='rounded-full'
                        />
                        <div className='flex flex-col ml-3'>
                            <a className='text-[20px] font-bold'>{creatorUsername}</a>
                            <a className='text-[15px]'>Post</a>

                        </div>
                    </div>
                    <img
                        src={imageSrc ? imageSrc : ''}
                    />
                    <div className='flex m-1 items-center'>
                        {
                            false ?
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
                        <a className='text-[#f1c1018f] font-bold text-[13px] ml-2'>{timeAgo(creationDate)}</a>

                    </div>
                    <p>{title}</p>
                </div>
            </div>
        </Link>
    )

}

const PostList = ({ props }: any) => {
    const { token } = useAuth()
    const [posts, setPosts] = useState<Post[]>([])


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPosts(token)
                setPosts(response);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [token]);

    return (
        <ul className='overflow-auto overborder max-h-screen w-full '>
            <div className="flex w-full justify-center mt-10 mb-5">
                <Link to='/messenger'>
                    <button className='button-simple'>
                        Go back
                    </button>
                </Link>
                <Link to='/add-post'>
                    <button className='button-simple'>
                        Add post
                    </button>
                </Link>
            </div>

            {posts.map((post) => {
                return (
                    <PostItem id={post.id} creatorId={post.creatorId} creatorUsername={post.creatorUsername} time={post.time} title={post.title} content={post.content} filename={post.filename} />
                )
            })}
        </ul>
    )
}

export default PostList