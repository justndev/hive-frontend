import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import profileImg from '../assets/profile.jpeg';

import Incomes from '../components/Incomes';
import Chat from '../components/Chat';
import MessageInput from '../components/TextField';
import Contacts from '../components/Contacts';
import Profile from '../components/Profile';

import { UserContext } from '../utils/MessengerContextProvider';
import { useAuth } from "../utils/AuthContextProvider";
import { SocketResponse } from '../utils/interfaces';
import { useMessenger } from '../hooks/useMessenger';

const Messenger: React.FC = () => {
    const { user, token, id } = useAuth();
    const { userDetails, setUserDetails } = useContext(UserContext);

    const {
        updateRequests,
        updateMessages,
        switchToContacts,
        switchToChats,
        changeToProfile,
        handleSocketUpdate,
        updateRqsts
    } = useMessenger(token, id, userDetails, setUserDetails);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            var url = client.ws._transport.url;
            const sessionId =
                url.replace("ws://localhost:8080/ws/", "")
                    .replace("/websocket", "")
                    .replace(/^[0-9]+\//, "")
                    .replace(/^[0-9]+\//, "");


            client.subscribe("/queue/specific-user-" + sessionId, (msg) => {
                const message: SocketResponse = JSON.parse(msg.body);
                handleSocketUpdate(message.update);
            });
            client.send("/app/chat.addUser", {}, String(id));
        });

        return () => {
            if (client) {
                client.disconnect();
            }
        };
    }, [user, id, handleSocketUpdate]);

    return (
        <div className='flex justify-center'>
            <div className='w-[1200px] h-[750px] shadow-2xl m-10'>
                <header className='h-[50px] shadow-xl rounded-t-3xl bg-[#1A1A1B] flex'>
                    <section className='w-1/5 h-full flex items-center justify-center'>
                        <button onClick={changeToProfile} className='button-simple'>
                            Profile
                        </button>
                        <Link to='/posts'>
                            <button className='button-simple'>
                                Go to posts
                            </button>
                        </Link>
                    </section>
                    <section className='w-4/5 h-full flex justify-around items-center'>
                        <div className='flex items-center'>
                            {userDetails.currentChatName && !userDetails.isProfileOpen && (
                                <>
                                    <img
                                        src={profileImg}
                                        width={39}
                                        className='rounded-full'
                                        alt="Profile"
                                    />
                                    <h1 className='bold text-2xl ml-5 text-white'>
                                        {userDetails.currentChatName}
                                    </h1>
                                </>
                            )}
                        </div>
                    </section>
                </header>

                <main className='w-full h-[700px] flex bg-[rgba(32,33,36,0.5)] rounded-b-3xl'>
                    <section className='w-[25%] h-full'>
                        <div className='flex justify-around'>
                            <button
                                className={`button-switch ${!userDetails.areContactsOpened ? 'button-switch-active' : 'button-switch-inactive'}`}
                                onClick={switchToChats}
                            >
                                Chats
                            </button>
                            <button
                                className={`button-switch ${userDetails.areContactsOpened ? 'button-switch-active' : 'button-switch-inactive'}`}
                                onClick={switchToContacts}
                            >
                                Contacts
                            </button>
                        </div>
                        <div className='overflow-auto h-[650px] p-2'>
                            {userDetails.areContactsOpened ? (
                                <Contacts contacts={userDetails.displayedContacts} />
                            ) : (
                                <Incomes incomes={userDetails.displayedChats} />
                            )}
                        </div>
                    </section>

                    {userDetails.isProfileOpen ? (
                        <Profile updateRequests={updateRequests} trigger={updateRqsts} />
                    ) : (
                        <section className='w-[75%] h-full flex-col'>
                            <div className='h-5/6'>
                                <Chat user_id={id} messages={userDetails.displayedMessages} />
                            </div>
                            <div className='h-1/6'>
                                <MessageInput updateMessages={updateMessages} />
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Messenger;