import { useEffect, useState } from 'react';
import screens from '../../assets/hive-screens.png';
import { Link } from 'react-router-dom';


// Body of welcome page
const Main = () => {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="flex justify-center w-full h-full">
      <div className="w-full h-[700px] flex justify-end">
        <div className="m-10">
          <h1 className={`text-white text-[80px] font-bold ${animate ? 'slide-in-left delay-1' : ''}`}>FAST</h1>
          <h1 className={`text-white text-[80px] font-bold ${animate ? 'slide-in-left delay-2' : ''}`}>SECURE</h1>
          <h1 className={`text-white text-[80px] font-bold ${animate ? 'slide-in-left delay-3' : ''}`}>ANONYMOUS</h1>

          <p className="text-white mb-10 font-bold  p-4 rounded-xl ">
            Experience lightning-fast messaging with top-notch security. <br />
            Stay anonymous while connecting with friends and family. <br />
            Your privacy is our priority, ensuring all your conversations <br />
            are encrypted and safe from prying eyes.
          </p>
          <Link to="/login">
            <button className="glow border p-2 pr-4 pl-4 rounded-full flex">
              Start messaging
            </button>
          </Link>
        </div>
        <img className="m-[20px] h-[700px]" src={screens} alt="App screens" />
      </div>
    </div>
  );
}

export default Main;