import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "../utils/AuthContextProvider";

// Login page. Checks for user input validity then allows to login
const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const USERNAME_REGEX = /^[a-zA-Z0-9._-]{3,24}$/;
  const PASSWORD_REGEX = /^.{8,24}$/;


  useEffect(() => {
    if (user) {
      navigate('/messenger')
    }
  }, [user]);

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PASSWORD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    login(username, pwd).catch(console.error);
  };

  return (
    <div className="flex justify-center">
      <section className="bg-[rgba(32,33,36,0.5)] p-5 rounded-3xl m-[100px] text-white shadow-2xl flex flex-col justify-center items-center">

        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>

        <b className="m-5 text-2xl font-bold">LOGIN</b>

        <form className="flex flex-col" onSubmit={handleSubmit}>

          <div className="relative flex items-center">
            <input
              id="username"
              ref={userRef}
              autoComplete="off"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className="bg-transparent border-b p-2 pr-8 focus:outline-none focus:ring-0" />
            <FontAwesomeIcon
              icon={faCheck}
              className={`absolute right-2 ${validName ? "text-green-500" : "hidden"}`}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={`absolute right-2 ${validName || !username ? "hidden" : "text-red-500"}`}
            />
          </div>

          <p
            id="uidnote"
            className={`text-xs mt-1 ${userFocus && username && !validName ? "text-gray-400" : "hidden"}`}
          >
            <FontAwesomeIcon icon={faInfoCircle} /> 3 to 24 symbols.
          </p>

          <div className="relative flex items-center mt-4">
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className="bg-transparent border-b p-2 pr-8 focus:outline-none focus:ring-0" placeholder="password"
            />
            <FontAwesomeIcon
              icon={faCheck}
              className={`absolute right-2 ${validPwd ? "text-green-500" : "hidden"}`}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={`absolute right-2 ${validPwd || !pwd ? "hidden" : "text-red-500"}`}
            />
          </div>

          <p
            id="pwdnote"
            className={`text-xs mt-1 ${pwdFocus && !validPwd ? "text-gray-400" : "hidden"}`}
          >
            <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters.
          </p>

          <button className="mt-5 btn-try">
            LOG IN
          </button>
          <p className="mt-4">
            Don't have an account?
            <span className="text-[rgba(241,193,1,0.562);] ml-2 font-bold">
              <Link to="/signup"> Create </Link>
            </span>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;