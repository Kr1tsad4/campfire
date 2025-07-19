import { useState } from "react";
import DateOfBirth from "../components/Form/DateOfBirth";
import InputComponent from "../components/Form/InputComponent";
import { API_URL } from "../libs/api";
import { useEffect } from "react";
import { createUser } from "../libs/fetchUsersUtils";
import { userLogin } from "../libs/authUtils.js";
import { useTags } from "../hooks/useTags";
import colorTheme from "../libs/colorTheme.js";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

function AuthPage() {
  const { saveLoginUserSession } = useUser();
  const { baseTags, handleSelectedTag, fetchBaseTags } = useTags();
  const navigator = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const [isValidSignUp, setIsValidSignUp] = useState(false);
  const [isValidSignIn, setIsValidSignIn] = useState(false);
  const [signUpButton, setSignUpButton] = useState(
    `bg-gray-300 text-gray-900 rounded-[5px] w-fit mt-2 p-[8px] font-[700] shadow-md cursor-default`
  );
  const [signInButton, setSignInButton] = useState(
    `bg-gray-300 text-gray-900 rounded-[5px] w-fit mt-2 p-[8px] font-[700] shadow-md cursor-default`
  );

  const [invalidUserNameOrPassword, setInvalidUserNameOrPassword] =
    useState(false);
  const clearInput = () => {
    setUsername("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedDay("");
    console.log("clear");
  };
  const signUpButtonChecker = () => {
    // console.log(username, password, firstName, lastName, email, selectedYear, selectedMonth, selectedDay);
    if (
      !username ||
      !password ||
      !firstName ||
      !lastName ||
      !email ||
      !selectedYear ||
      !selectedMonth ||
      !selectedDay
    ) {
      setIsValidSignUp(false);
      return setSignUpButton(
        `bg-gray-300 text-gray-900 rounded-[5px] w-fit mt-2 p-[8px] font-[700] shadow-md cursor-default`
      );
    }
    setIsValidSignUp(true);
    return setSignUpButton(
      `bg-[#f8d6db] rounded-[5px] w-fit mt-2 p-[8px] font-[700] shadow-md cursor-default hover:bg-[#f3bfa3]`
    );
  };
  const signInButtonChecker = () => {
    // console.log(username, password, firstName, lastName, email, selectedYear, selectedMonth, selectedDay);
    if (!username || !password) {
      setIsValidSignIn(false);
      return setSignInButton(
        `bg-gray-300 text-gray-900 rounded-[5px] w-fit mt-2 p-[8px] font-[700] shadow-md cursor-default`
      );
    }
    setIsValidSignIn(true);
    return setSignInButton(
      `bg-[#f8d6db] rounded-[5px] w-fit mt-2 p-[8px] font-[700] shadow-md cursor-default hover:bg-[#f3bfa3]`
    );
  };

  const signUp = async () => {
    if (!isValidSignUp) {
      console.log(`data incompleted`);
      return;
    }
    const user = {
      username,
      penName: username,
      firstName,
      lastName,
      email,
      password,
      dob: new Date(Date.UTC(selectedYear, selectedMonth - 1, selectedDay)),
      interestedTag: [],
    };
    baseTags.map((tag, index) => {
      if (tag.selected) user.interestedTag.push(tag._id);
    });
    const createdUser = await createUser(API_URL, user);
    if (createdUser && createdUser._id) {
      console.log(createdUser);
      console.log(username);
      console.log(password);
      const data = {
        username,
        password,
      };
      await userLogin(API_URL, data);
      saveLoginUserSession(createdUser);
      window.location.href = "/home";
    }
    return;
  };

  const signIn = async () => {
    if (!isValidSignIn) {
      return;
    }
    const data = {
      username,
      password,
    };
    const user = await userLogin(API_URL, data);
    if (user && user._id) {
      saveLoginUserSession(user);
      window.location.href = "/home";
    }else{
      setInvalidUserNameOrPassword(true)
    }
    return;
  };

  useEffect(() => {
    if (isLogin) signInButtonChecker();
    else signUpButtonChecker();
  }, [
    username,
    password,
    firstName,
    lastName,
    email,
    selectedYear,
    selectedMonth,
    selectedDay,
  ]);
  useEffect(() => {
    fetchBaseTags();
  }, []); // [] ทำให้รันแค่ครั้งเดียวเมื่อ component mount

  useEffect(() =>{
    if(!isLogin){
      setInvalidUserNameOrPassword(false)
    }
  },[isLogin])
  return (
    <div
      className={` min-h-screen text-[] flex items-center justify-center`}
      style={{
        backgroundColor: colorTheme.background,
        color: colorTheme.text,
      }}
    >
      <div
        id="auth-container"
        className="bg-white p-6 rounded-lg shadow-md w-120"
      >
        {/* {console.log(baseTags)} */}
        <div className="text-[32px] font-[700] pl-0 mb-5">
          {isLogin ? "Login" : "Register"}
        </div>
        <InputComponent
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          handleInput={(e) => setUsername(e)}
        />
        <InputComponent
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          handleInput={(e) => setPassword(e)}
        />
        {invalidUserNameOrPassword && (
          <p className="text-red-500">Invalid username or password</p>
        )}
        <div className="flex flex-row">
          {!isLogin && (
            <InputComponent
              type="text"
              id="first-name"
              placeholder="First name"
              value={firstName}
              handleInput={(e) => setFirstName(e)}
              width={40}
            />
          )}
          {!isLogin && (
            <InputComponent
              type="text"
              id="last-name"
              placeholder="Last name"
              value={lastName}
              handleInput={(e) => setLastName(e)}
              width={40}
            />
          )}
        </div>
        {!isLogin && (
          <InputComponent
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            handleInput={(e) => setEmail(e)}
          />
        )}
        {!isLogin && (
          <DateOfBirth
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        )}
        {!isLogin && (
          <div className="text-[16px] text-gray-700 font-[500] my-2">
            Interested (optional)
          </div>
        )}
        {!isLogin && (
          <div className="flex">
            {baseTags.map((tag, index) => {
              return (
                <div
                  key={index}
                  className={`mr-2 border-[1.5px] border-[] rounded-[10px] px-2 py-[2px] text-[16px] cursor-default}`}
                  style={{
                    borderColor: colorTheme.style1,
                    backgroundColor: baseTags[index].selected
                      ? colorTheme.style1
                      : "",
                  }}
                  onClick={() => handleSelectedTag(index)}
                >
                  {tag.name}
                </div>
              );
            })}
          </div>
        )}
        {!isLogin && (
          <div id="register-button" className={signUpButton} onClick={signUp}>
            Sign up
          </div>
        )}
        {isLogin && (
          <div id="Login-button" className={signInButton} onClick={signIn}>
            Sign in
          </div>
        )}
        <div
          id="switch-button"
          className="underline underline-offset-1 my-2 cursor-default hover:text-[#AEC8A4]"
          onClick={() => {
            clearInput();
            setIsLogin(!isLogin);
          }}
        >
          {isLogin ? "Does not have an account?" : "Already have an account?"}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
