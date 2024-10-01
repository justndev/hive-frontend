import { useRef, useEffect } from 'react';

import Message from './Message';
import { MessageDTO } from '../utils/interfaces';
import { timeAgo } from '../utils/TimeFormatter';


// Avoid props
const Chat = (props: { user_id: number; messages: MessageDTO[] }) => {
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [props.messages]);

  return (
    <ul ref={listRef} className="h-full overflow-auto">
      {props.messages.map((message, index) => (
        <Message
          key={index}
          time={timeAgo(message.time)}
          text={message.text}
          sender_id={message.sender}
          reciever_id={message.receiver}
          isOnLeft={props.user_id === message.receiver}
        />
      ))}
    </ul>
  );
};

export default Chat;