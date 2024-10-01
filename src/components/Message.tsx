import React from 'react'
import { MessageProps } from '../utils/interfaces'


// Message elements which is shown in chat
const Message: React.FC<MessageProps> = ({ time, text, sender_id, reciever_id, isOnLeft }) => {
   
    return (
        <div className={`mt-1 mb-1 p-[8px] w-full ${isOnLeft ? "" : "flex justify-end"}`}>

            <div>
                <section className={`${isOnLeft ? "bg-[#1A1A1B] text-white" : "bg-[#E5AB4F] text-white "} p-2 pl-5 pr-5 rounded-3xl inline-block max-w-[400px] break-words text-[20px]`}>
                    {text}
                </section>

                <section className={`text-[10px] font-bold text-[#f1c1018f] pl-3 pr-3 ${isOnLeft ? "" : "flex justify-end"}`}>
                    {time}
                </section>
            </div>

        </div>
    )
}

export default Message