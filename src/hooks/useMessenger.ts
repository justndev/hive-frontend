import { useState, useCallback, useEffect } from 'react';
import { UserDTO, MessageDTO, IncomeDTO } from '../utils/interfaces';
import { getContacts, findContactByUsername, getMessages, getChats, getRequests } from '../api/messengerApi';
import { UserDetails } from '../utils/MessengerContextProvider';

export const useMessenger = (token: string, id: number, userDetails: any, setUserDetails: any) => {
  const [updateMsgs, setUpdateMsgs] = useState("");
  const [updateCntcts, setUpdateContacts] = useState("");
  const [updateRqsts, setUpdateRequests] = useState("");
  const [updateChts, setUpdateChats] = useState("");

  const updateRequests = useCallback(async (objects?: UserDTO[]) => {
    if (objects) {
      setUserDetails((prevUser: UserDetails) => ({
        ...prevUser,
        requests: objects,
      }));
    } else {
      const requests = await getRequests(token);
      setUserDetails((prevUser: UserDetails) => ({
        ...prevUser,
        requests: requests,
      }));
    }
  }, [token, setUserDetails]);

  const updateMessages = useCallback(async (objects?: MessageDTO[]) => {
    if (objects) {
      objects.sort((a: MessageDTO, b: MessageDTO) => a.id - b.id);
      setUserDetails((prevUser: UserDetails) => ({
        ...prevUser,
        displayedMessages: objects,
      }));
    } else if (token && userDetails.currentChatId) {
      const messages = await getMessages(userDetails.currentChatId, token);
      messages.sort((a: MessageDTO, b: MessageDTO) => a.id - b.id);
      setUserDetails((prevUser: UserDetails) => ({
        ...prevUser,
        displayedMessages: messages,
      }));
    }
  }, [token, userDetails.currentChatId, setUserDetails]);

  const switchToContacts = useCallback(() => {
    setUserDetails((prevUser: UserDetails) => ({
      ...prevUser,
      areContactsOpened: true,
      isProfileOpen: false
    }));
  }, [setUserDetails]);

  const switchToChats = useCallback(() => {
    setUserDetails((prevUser: UserDetails) => ({
      ...prevUser,
      areContactsOpened: false,
      isProfileOpen: false
    }));
  }, [setUserDetails]);

  const changeToProfile = useCallback(() => {
    setUserDetails((prevUser: UserDetails) => ({
      ...prevUser,
      isProfileOpen: !prevUser.isProfileOpen,
    }));
  }, [setUserDetails]);

  const searchContacts = useCallback(async () => {
    if (userDetails.searchInput === '') {
      const contacts = await getContacts(token);
      setUserDetails((prevUser: UserDetails) => ({
        ...prevUser,
        displayedContacts: contacts,
      }));
    } else {
      let contact: UserDTO[] = [];
      if (token !== null) {
        try {
          const user = await findContactByUsername(userDetails.searchInput, token);
          contact.push(user);
        } catch (error) {
        }
      }
      setUserDetails((prevUser: UserDetails) => ({
        ...prevUser,
        displayedContacts: contact,
      }));
    }
  }, [token, userDetails.searchInput, setUserDetails]);

  const fetchData = useCallback(async () => {
    let contacts: UserDTO[] = [];
    let incomes: IncomeDTO[] = [];
    if (token !== null) {
      try {
        contacts = await getContacts(token);
        incomes = await getChats(token);
      } catch (error) {
      }
    }
    setUserDetails((prevUser: UserDetails) => ({
      ...prevUser,
      displayedContacts: contacts,
      displayedChats: incomes,
    }));
  }, [token, setUserDetails]);

  useEffect(() => {
    searchContacts();
  }, [userDetails.searchInput]);

  useEffect(() => {
    fetchData();
  }, [userDetails.areContactsOpened, updateCntcts, updateRqsts, updateChts]);

  useEffect(() => {
    updateMessages();
  }, [userDetails.currentChatId, userDetails.areContactsOpened, updateMsgs]);

  const handleSocketUpdate = useCallback((update: string) => {
    const updateTime = String(new Date());
    switch (update) {
      case 'messages':
        setUpdateMsgs(updateTime);
        break;
      case 'requests':
        setUpdateRequests(updateTime);
        break;
      case 'contacts':
        setUpdateContacts(updateTime);
        break;
      case 'chats':
        setUpdateChats(updateTime);
        break;
    }
  }, []);

  return {
    updateRequests,
    updateMessages,
    switchToContacts,
    switchToChats,
    changeToProfile,
    searchContacts,
    fetchData,
    handleSocketUpdate,
    updateMsgs,
    updateRqsts,
    updateCntcts,
    updateChts,
  };
};