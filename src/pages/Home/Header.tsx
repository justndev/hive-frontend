import img2 from "../../assets/hive-simple.png"
import text from "../../assets/hive-name.png"
import { useContext } from "react"
import { UserContext } from "../../utils/MessengerContextProvider"
import { Link } from "react-router-dom"

// Header of welcome page
const Header = () => {
    const { userDetails, setUserDetails } = useContext(UserContext)

    function handleClick(section: string) {
        setUserDetails((prevUser) => ({
            ...prevUser,
            currentPageSection: section,
        }));
    }

    return (
        <header className="w-full h-[140px] flex items-center justify-between pr-10">
            <section className="flex w-auto h-[160px]">
                <img className="m-[20px]"
                    src={img2}
                    width={140}
                />
                <img className="m-[20px]"
                    src={text}
                    height={10}
                    width={400}
                />
            </section>

            <section className="flex ml-[600px]">
                <button
                    className={`transition-colors duration-300 text-${userDetails.currentPageSection === 'explore' ? 'white' : 'gray-400'} w-[100px] h-[50px] p-4 flex justify-center items-center`}
                    onClick={() => handleClick('explore')}
                >
                    Explore
                </button>
                <button
                    className={`transition-colors duration-300 text-${userDetails.currentPageSection === 'features' ? 'white' : 'gray-400'} w-[140px] h-[50px] p-4 flex justify-center items-center`}
                    onClick={() => handleClick('features')}
                >
                    Features
                </button>
                <button
                    className={`transition-colors duration-300 text-${userDetails.currentPageSection === 'stack' ? 'white' : 'gray-400'} w-[140px] h-[50px] p-4 flex justify-center items-center`}
                    onClick={() => handleClick('stack')}
                >
                    Stack
                </button>
            </section>

            <Link to='/login'>
                <button className="btn-try">
                    Messenger
                </button>
            </Link>
        </header>
    )
}

export default Header