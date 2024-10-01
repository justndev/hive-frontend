import { useContext, useEffect } from "react";

import profileImg from '../assets/profile.jpeg'
import yesIcon from '../assets/yes.svg'
import noIcon from '../assets/cross.svg'
import logoutImg from '../assets/logout.svg'

import { Contact } from "./Contacts";

import { useAuth } from "../utils/AuthContextProvider"
import { acceptRequest, declineRequest } from "../api/messengerApi";
import { UserContext } from '../utils/MessengerContextProvider';


// User profile. Here user may see incoming friend requests and may accept/decline them
const Profile = ({ updateRequests, trigger }: any) => {
    const { user, token, logout } = useAuth()
    const { userDetails } = useContext(UserContext)

    useEffect(() => {
        updateRequests()
    }, [userDetails.isProfileOpen, trigger]);

    const accept = (id: number) => {
        acceptRequest(id, token)
        setTimeout(() => {
            updateRequests();
        }, 100);
    }

    const decline = (id: number) => {
        declineRequest(id, token)
        setTimeout(() => {
            updateRequests();
        }, 100);
    }

    return (
        <div className="w-[75%] flex flex-col justify-center items-center text-white">
            <div className="bg-[#1A1A1B] rounded-3xl shadow-2xl w-[400px]">
                <div >
                    <section className="flex items-center border-white border-b-2 p-4 justify-between relative">
                        <img className='rounded m-5' src={profileImg} width={100} height={100} />
                        <div className="flex flex-col">
                            <button onClick={logout} className=" self-end">
                                <img src={logoutImg} width={30} height={60} />
                            </button>
                            <div className="flex-grow min-w-0">
                                <h1 className="ml-5 text-[30px] font-bold break-all">{user}</h1>
                                <a className="ml-5 text-[20px] font-bold">user</a>
                            </div>
                        </div>
                    </section>

                    <section className="pl-5 pt-5 ">
                        <div className="pl-5 pb-5">
                            <a>Incoming request: </a>
                        </div>
                        <div className="m-5">
                            {userDetails.requests && <ul>
                                {userDetails.requests.map((contact) => {
                                    return (
                                        <div className="flex">
                                            <Contact username={contact.username} friend={true} id={contact.id} />

                                            <button onClick={() => accept(contact.id)}>
                                                <img src={yesIcon} width={26} />
                                            </button>
                                            <button onClick={() => decline(contact.id)}>
                                                <img src={noIcon} width={30} />
                                            </button>
                                        </div>
                                    )
                                })}
                            </ul>
                            }
                        </div>
                    </section>

                </div>
            </div>



        </div>
    )
}

export default Profile;
