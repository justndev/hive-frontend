import React, { useContext } from 'react';

import profileImg from '../assets/profile.jpeg'

import { getTimeDescription } from '../utils/TimeFormatter'
import { UserContext } from '../utils/MessengerContextProvider';
import { IncomeDTO } from '../utils/interfaces';


// Same as contacts, but is shows opened chats and last message
const Income: React.FC<IncomeDTO> = ({ time, img, text, username, id }) => {
  const { userDetails, setUserDetails } = useContext(UserContext)

  function handleClick() {
    setUserDetails((prevUser) => ({
      ...prevUser,
      currentChatId: id,
      currentChatName: username,
      isProfileOpen: false
    }));
  }

  return (
    <li className='flex text-[10px] m-2 cursor-pointer' onClick={() => handleClick()}>

      <section className='flex justify-center items-center'>
        {
          img ?
            <img
              src={img}
              width={48}
              height={48}
            />
            :
            <img className='rounded-full'
              src={profileImg}
              width={48}
              height={48}
            />
        }
      </section>

      <section className='w-full pl-2'>

        <div className='flex justify-between w-full'>
          <a className='text-white text-[15px] font-bold'>{username}</a>
          <a className='m-1 text-[#f1c1018f] font-bold'>{getTimeDescription(time)}</a>
        </div>

        <p className='text-gray-100 text-[13px]'>{text}</p>

      </section>

    </li>
  );
};

interface IncomesProps {
  incomes: IncomeDTO[],
}

const Incomes: React.FC<IncomesProps> = ({ incomes }) => {
  return (
    <ul className='overflow-auto overborder max-h-Income[700px]'>
      {incomes.map((income, index) => (
        <Income
          key={index}
          username={income.username}
          text={income.text}
          time={income.time}
          id={income.id}
        />
      ))}
    </ul>
  );
};

export default Incomes;