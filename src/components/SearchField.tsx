import { useContext } from "react"
import { UserContext } from "../utils/MessengerContextProvider";


// Located above contacts and acts only for searching users who are not in contacts
const SearchField = () => {
    const { setUserDetails } = useContext(UserContext);

    function handleChange(event: { target: { value: any; }; }) {
        setUserDetails((prevUser) => ({
            ...prevUser,
            searchInput: event.target.value,
        }));
    }

    return (
        <div className="relative w-full text-white">
            <input onChange={handleChange} type="text" placeholder="Find contact" className="w-full pl-10 p-2  focus:outline-none bg-transparent border-b-2 placeholder-gray-400" />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-white mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.293 3.707l4 4a1 1 0 01-1.414 1.414l-4-4A6 6 0 012 8z" clip-rule="evenodd"></path>
                </svg>
            </div>
        </div>
    )
}

export default SearchField