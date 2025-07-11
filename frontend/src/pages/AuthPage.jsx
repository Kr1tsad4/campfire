import { useState } from "react";
import DateOfBirth from "../components/DateOfBirth";
import InputComponent from "../components/InputComponent";
import { API_URL } from "../libs/api";
import { getTagById, getTags } from "../libs/fetchTagsUtils";
import { useEffect } from "react";
import { createUser } from "../libs/fetchUsersUtils";
function AuthPage() {

  const [baseTags, setBaseTags] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const [isValidSignUp, setIsValidSignUp] = useState(false);
  const [signUpButton, setSignUpButton] = useState(`bg-gray-300 text-gray-900 rounded-[5px] w-fit mt-2 p-[8px] font-[700] shadow-md cursor-default`);

  const signUpButtonChecker = () => {
    // console.log(username, password, firstName, lastName, email, selectedYear, selectedMonth, selectedDay);
    if(!username || !password || !firstName || !lastName || !email || !selectedYear || !selectedMonth || !selectedDay) {
      setIsValidSignUp(false);
      return setSignUpButton(`bg-gray-300 text-gray-900 rounded-[5px] w-fit mt-2 p-[8px] font-[700] shadow-md cursor-default`)
    }
    setIsValidSignUp(true);
    return setSignUpButton(`bg-[#f8d6db] rounded-[5px] w-fit mt-2 p-[8px] font-[700] shadow-md cursor-default hover:bg-[#f3bfa3]`)
  }


  const setSelectedTag = (index) => {
    const newTags = [...baseTags];
    newTags[index].selected = !newTags[index].selected;
    setBaseTags(newTags)
    return;
  }

  const signUp = () => {
    if(!isValidSignUp) {
      console.log(`data incompleted`);
      return;
    }
    const user = {username, penName: username, firstName, lastName, email, password, dob: new Date(Date.UTC(selectedYear, selectedMonth - 1, selectedDay)), interestedTag:[]}
    baseTags.map((tag, index) => {if(tag.selected) user.interestedTag.push(tag._id)} )
    console.log(user)
    console.log(`ok`);
    createUser(API_URL, user);
    return;
    // sessionStorage.setItem('user', user);
  }
  useEffect(() => {
    signUpButtonChecker();
  }, [username, password, firstName, lastName, email, selectedYear, selectedMonth, selectedDay])
  useEffect(() => {
    async function fetchBaseTags() {
      const tags = await getTags(API_URL);
      for(let i = 0; i < tags.length; ++i) tags[i].selected = false;
      setBaseTags(tags);
      return;
    }
    fetchBaseTags();
    
  }, []); // [] ทำให้รันแค่ครั้งเดียวเมื่อ component mount


  return (
    
    <div className="bg-[#F8D6DB] min-h-screen text-[#482820] flex items-center justify-center">
      <div
        id="auth-container"
        className="bg-white p-6 rounded-lg shadow-md w-120"
      >
        {/* {console.log(baseTags)} */}
        <div className="text-[32px] font-[700] pl-0 mb-5">Register</div>
        <InputComponent id="username" placeholder="Username" value={username} handleInput={(e) => setUsername(e)}/>
        <InputComponent id="password" placeholder="Password" value={password} handleInput={(e) => setPassword(e)}/>
        <div className="flex flex-row">
          <InputComponent id="first-name" placeholder="First name" value={firstName} handleInput={(e) => setFirstName(e)} width={40} />
          <InputComponent id="last-name" placeholder="Last name" value={lastName} handleInput={(e) => setLastName(e)} width={40} />
        </div>
        <InputComponent id="email" placeholder="Email" value={email} handleInput={(e) => setEmail(e)} />
        <DateOfBirth selectedYear={selectedYear} setSelectedYear={setSelectedYear} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
        <div className="text-[16px] text-gray-700 font-[500] my-2">Interested (optional)</div>
        <div className="flex">
          {baseTags.map((tag, index) => {return <div key={index} className={`mr-2 border-1 border-[#f4cdb8ff] rounded-[10px] px-2 py-[2px] text-[16px] cursor-default ${baseTags[index].selected ? 'bg-[#f4cdb8ff]' : ''}`} onClick={() => setSelectedTag(index)}>{tag.name}</div>})}
        </div>
        <div id="register-button" className={signUpButton} onClick={signUp}>Sign Up</div>

      </div>
    </div>
  );
}

export default AuthPage;
