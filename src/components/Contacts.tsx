import React, { useContext } from 'react';
import SearchField from './SearchField';

import addIcon from '../assets/addIcon.svg'
import profileImg from '../assets/profile.jpeg'

import { sendFriendRequest } from '../api/messengerApi'
import { UserContext } from '../utils/MessengerContextProvider';
import { useAuth } from '../utils/AuthContextProvider';

import { UserDTO } from '../utils/interfaces';


// Contact element is used both for friends contact and search result
export const Contact: React.FC<UserDTO> = ({ img, username, id, friend }) => {
    const { setUserDetails } = useContext(UserContext);
    const { token } = useAuth();

    // When contact (left bar) is clicked, then this function updates state of active chat to this
    function handleClick() {
        setUserDetails((prevUser) => ({
            ...prevUser,
            currentChatId: id,
            currentChatName: username,
            isProfileOpen: false
        }));
    }

    return (
        <button className='flex text-[10px] cursor-pointer justify-between w-full text-white items-center text-[20x]' onClick={handleClick}>
            <section className='flex justify-center items-center'>
                {img ? (
                    <img src={img} width={48} height={48} />
                ) : (
                    <img className='rounded-full' src={profileImg} width={48} height={48} />
                )}
            </section>

            <section className='w-full pl-2 flex justify-between text-[17px] font-bold'>
                <a>{username}</a>
                {!friend &&
                    <button onClick={() => sendFriendRequest(id, token)} className=''>
                        <img width={24} src={addIcon} />
                    </button>
                }
            </section>
        </button>
    );
};

interface ContactsProps {
    contacts: UserDTO[],
}

const Contacts: React.FC<ContactsProps> = ({ contacts }) => {
    return (
        <>
            <SearchField />
            <ul className='mt-2 overflow-auto overborder max-h-[700px]'>
                {contacts.map((user, index) => (
                    <Contact key={index} username={user.username} id={user.id} friend={user.friend} />
                ))}
            </ul>
        </>

    );
};

export default Contacts;
