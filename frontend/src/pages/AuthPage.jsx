import { useState } from "react";
import DateOfBirth from "../components/Form/DateOfBirth.jsx";
import InputComponent from "../components/Form/InputComponent.jsx";
import { API_URL } from "../libs/api.js";
import { useEffect } from "react";
import { createUser } from "../libs/fetchUsersUtils.js";
import { userLogin } from "../libs/authUtils.js";
import { useTags } from "../hooks/useTags.js";
import colorTheme from "../libs/colorTheme.js";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser.js";

function AuthPage() {
  const { saveLoginUserSession } = useUser();
  const { baseTags, handleSelectedTag, fetchBaseTags } = useTags();
  const navigator = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const usernameRegex = /^.{6,}$/;
  const passwordRegex = /^.{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const validateForm = (input) => {
    if (input === "username")
      setIsUsernameValid(usernameRegex.test(username) || username === "");
    if (input === "password")
      setIsPasswordValid(passwordRegex.test(password) || password === "");
    if (input === "email")
      setIsEmailValid(emailRegex.test(email) || email === "");
    if (input === "all"){
      setIsUsernameValid(usernameRegex.test(username) || username === "");
      setIsPasswordValid(passwordRegex.test(password) || password === "");
      setIsEmailValid(emailRegex.test(email) || email === "");
    }
    return;
  };
  const clearInput = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedDay("");
    setIsUsernameValid(true);
    setIsPasswordValid(true);
    setIsEmailValid(true);
    setIsConfirmPasswordValid(true);
  };
  const signUpButtonChecker = () => {
    // console.log(username, password, firstName, lastName, email, selectedYear, selectedMonth, selectedDay);
    if (
      !username ||
      !isUsernameValid ||
      !password ||
      !isPasswordValid ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !email ||
      !isEmailValid ||
      !selectedYear ||
      !selectedMonth ||
      !selectedDay
    ) {
      setIsValidSignUp(false);
      setSignUpButton(
        `bg-gray-300 text-gray-900 rounded-[5px] w-fit mt-2 p-[8px] font-[700] shadow-md cursor-default`
      );
      return false;
    }
    setIsValidSignUp(true);
    setSignUpButton(
      `bg-[#7ad89aff] rounded-[5px] w-fit mt-2 p-[8px] font-[700] shadow-md cursor-default hover:bg-[#63b77fff]`
    );
    return true;
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
      `bg-[#7ad89aff] rounded-[5px] w-fit mt-2 p-[8px] font-[700] shadow-md cursor-default hover:bg-[#63b77fff]`
    );
  };
  const notificationCheck = () => {
    if (username === "") setIsUsernameValid(true);
    if (password === "") setIsPasswordValid(true);
    if (confirmPassword === "") setIsConfirmPasswordValid(true);
    if (email === "") setIsEmailValid(true);
  };
  const signUp = async () => {
    validateForm("all");
    notificationCheck();
    if (!signUpButtonChecker()) {
      return;
    }
    if (password !== confirmPassword) {
      setIsConfirmPasswordValid(false);
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
      // console.log(createdUser);
      // console.log(username);
      // console.log(password);
      const data = {
        username,
        password,
      };
      await userLogin(API_URL, data);
      saveLoginUserSession(createdUser);
      navigator('/home')
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
      navigator('/home')
    } else {
      setInvalidUserNameOrPassword(true);
    }
    return;
  };

  useEffect(() => {
    if (isLogin) signInButtonChecker();
    else {
      console.log(1);
      notificationCheck();
      signUpButtonChecker();
    }
  }, [
    username,
    password,
    confirmPassword,
    firstName,
    lastName,
    email,
    selectedYear,
    selectedMonth,
    selectedDay,
    isUsernameValid,
    isPasswordValid,
    isEmailValid,
  ]);
  useEffect(() => {
    fetchBaseTags();
  }, []); // [] ทำให้รันแค่ครั้งเดียวเมื่อ component mount

  useEffect(() => {
    if (!isLogin) {
      setInvalidUserNameOrPassword(false);
    }
  }, [isLogin]);
  return (
    <div
      className={` min-h-screen text-[#041c0cff] bg-[#e3ffecff] flex items-center justify-center`}
    >
      <div
        id="auth-container"
        className="bg-white p-6 rounded-lg shadow-md w-120"
      >
        {/* {console.log(baseTags)} */}
        <div className="text-[32px] pl-0 mb-5">
          {isLogin ? "Login" : "Register"}
        </div>
        <InputComponent
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          handleInput={(e) => setUsername(e)}
          handleBlur={() => validateForm("username")}
        />
        {!isUsernameValid && !isLogin && (
          <div className="text-red-500 -mt-3 mb-1">
            Please enter a username with at least 6 characters.
          </div>
        )}
        <InputComponent
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          handleInput={(e) => setPassword(e)}
          handleBlur={() => validateForm("password")}
        />
        {!isPasswordValid && !isLogin && (
          <div className="text-red-500 -mt-3 mb-1">
            Please enter a password with at least 8 characters.
          </div>
        )}
        {!isLogin && (
          <InputComponent
            type="password"
            id="confirm-password"
            placeholder="Confirm password"
            value={confirmPassword}
            handleInput={(e) => setConfirmPassword(e)}
          />
        )}
        {!isConfirmPasswordValid && !isLogin && (
          <div className="text-red-500 -mt-3 mb-1">
            Password and confirm password must be the same.
          </div>
        )}
        {invalidUserNameOrPassword && (
          <p className="text-red-500">Invalid username or password</p>
        )}
        <div className="flex flex-row max-[426px]:flex-col">
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
            handleBlur={() => validateForm("email")}
          />
        )}
        {!isEmailValid && (
          <div className="text-red-500 -mt-3 mb-1">
            Please enter a valid email address.
          </div>
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
          <div className="flex flex-wrap gap-2">
            {baseTags.map((tag, index) => {
              return (
                <div
                  key={index}
                  className={`cursor-pointer border-[1.5px] border-[#041c0cff] rounded-[10px] px-2 py-[2px] text-[16px]}`}
                  style={{
                    backgroundColor: baseTags[index].selected
                      ? colorTheme.new2
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
