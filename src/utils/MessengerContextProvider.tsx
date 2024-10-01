import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { UserDTO, MessageDTO, IncomeDTO } from "./interfaces";


export type UserDetails = {
  areContactsOpened: boolean
  isProfileOpen: boolean
  currentChatId: number
  currentChatName: string
  requests: UserDTO[]
  userId: number
  searchInput: string
  displayedContacts: UserDTO[]
  displayedMessages: MessageDTO[]
  displayedChats: IncomeDTO[]
  currentPageSection: string
}


export interface UserContextInterface {
  userDetails: UserDetails,
  setUserDetails: Dispatch<SetStateAction<UserDetails>>
}

const defaultState = {
  userDetails: {
    areContactsOpened: true,
    isProfileOpen: false,
    requests: [],
    currentChatId: 0,
    currentChatName: '',
    userId: 0,
    searchInput: '',
    displayedContacts: [],
    displayedMessages: [],
    displayedChats: [],
    currentPageSection: 'Explore'
  },
  setUserDetails: (userDetails:UserDetails) => {}
} as UserContextInterface


export const UserContext = createContext(defaultState)

type UserProviderProps = {
  children: ReactNode
}


export default function UserProvider({children} : UserProviderProps) {

  const[userDetails, setUserDetails] = useState<UserDetails>({
    areContactsOpened: true,
    requests: [],
    isProfileOpen: false,
    currentChatId: 0,
    currentChatName: '',
    userId: 0,
    searchInput: '',
    displayedContacts: [],
    displayedMessages: [],
    displayedChats: [],
    currentPageSection: 'explore'
  });


  return (
    <UserContext.Provider value={{userDetails, setUserDetails}}>
      {children}
    </UserContext.Provider>
  )
}
