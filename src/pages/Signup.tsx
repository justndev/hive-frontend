import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContextProvider";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USERNAME_REGEX: RegExp = /^[a-zA-Z0-9._-]{3,24}$/;
const PASSWORD_REGEX: RegExp = /^.{8,24}$/;

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const { signup, login, user: currentUser } = useAuth();

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState<string>("");
  const [validName, setValidName] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState<string>("");
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState<string>("");
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      navigate('/messenger')
    }
  }, [currentUser]);

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USERNAME_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PASSWORD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const [error, setError] = useState('');


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signup(user, pwd);

      setTimeout(async () => {
        await login(user, pwd);
      }, 100)

    } catch (e) {
      setError('Signup failed');
    }
  };

  return (
    <div className="flex justify-center">

      {success ? (
        <section className="bg-[rgba(32,33,36,0.5)] p-5 rounded-3xl m-[100px] text-white shadow-2xl flex flex-col justify-center items-center">
          <h1>Success!</h1>
          <Link to="/login">
            <p>Log In</p>
          </Link>
        </section>
      ) : (
        <section className="bg-[rgba(32,33,36,0.5)] p-5 rounded-3xl m-[100px] text-white shadow-2xl flex flex-col justify-center items-center">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <b className="m-5 text-2xl font-bold">REGISTER</b>
          <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>

            <div>
              <input
                type="text"
                id="username"
                placeholder="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                className="bg-transparent border-b p-2 pr-8 focus:outline-none focus:ring-0"

              />
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "text-green-500" : "hidden"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? "hidden" : "text-red-500"}
              />
            </div>

            <p
              id="uidnote"
              className={`text-xs mt-1 ${userFocus && user && !validName ? "text-gray-400" : "hidden"}`}


            >
              <FontAwesomeIcon icon={faInfoCircle} />
              3 to 26 symbols.
              <br />
            </p>

            <div>
              <input
                type="password"
                id="password"
                placeholder="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                className="bg-transparent border-b p-2 pr-8 focus:outline-none focus:ring-0"

              />

              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "text-green-500" : "hidden"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? "hidden" : "text-red-500"}
              />
            </div>

            <p
              id="pwdnote"
              className={`text-xs mt-1 ${pwdFocus && !validPwd ? "text-gray-400" : "hidden"}`}

            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.

            </p>
            <div>
              <input
                type="password"
                placeholder="confirm"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                className="bg-transparent border-b p-2 pr-8 focus:outline-none focus:ring-0"

              />

              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? "text-green-500" : "hidden"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? "hidden" : "text-red-500"}
              />
            </div>


            <p
              id="confirmnote"
              className={`text-xs mt-1 ${matchFocus && !validMatch ? "text-gray-400" : "hidden"}`}


            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
              className="btn-try m-5"
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <span className="text-[rgba(241,193,1,0.562);] ml-2 font-bold">
              <Link to="/login"> Log In </Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Signup;

