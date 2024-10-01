import { useContext, useState } from 'react';
import { sendMessage } from '../api/messengerApi';
import { useAuth } from '../utils/AuthContextProvider';
import { UserContext } from '../utils/MessengerContextProvider';
import { SendedMessageDTO } from '../utils/interfaces';

// Input field for message
const MessageInput = ({ updateMessages }: any) => {
  const [message, setMessage] = useState('');
  const { token, id } = useAuth()
  const { userDetails } = useContext(UserContext)

  const handleSend = () => {
    try {
      let msg: SendedMessageDTO = { text: message, sender: id, receiver: userDetails.currentChatId }
      sendMessage(msg, token)
      setTimeout(() => {
        updateMessages();
      }, 100);
    } catch (error) {

    }
    setMessage('');
  };

  return (
    <div className="flex items-center p-4 h-full">
      <input
        type="text"
        className="flex-grow p-2 border border-[#E5AB4F] rounded mr-2 bg-transparent  text-white focus:outline-none focus:ring-0"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-[#E5AB4F] text-white font-bold rounded hover:bg-[#754d0b] transition"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;