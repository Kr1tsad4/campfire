import { useState } from "react";
import DateOfBirth from "../components/DateOfBirth";
import InputComponent from "../components/InputComponent";
import { API_URL } from "../libs/api";
import { getTagById, getTags } from "../libs/fetchTagsUtils";
import { useEffect } from "react";

function AuthPage() {

  const [baseTags, setBaseTags] = useState([]);

  const setSelectedTag = (index) => {
    const newTags = [...baseTags];
    newTags[index].selected = !newTags[index].selected;
    setBaseTags(newTags)
    return;
  }

  const signUp = () => {
    // sessionStorage.setItem('user', user);
  }
  
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
        {console.log(baseTags)}
        <div className="text-[32px] font-[700] pl-0 mb-5">Register</div>
        <InputComponent id="username" placeholder="Username" />
        <InputComponent id="password" placeholder="Password" />
        <div className="flex flex-row">
          <InputComponent id="first-name" placeholder="First name" width={40} />
          <InputComponent id="last-name" placeholder="Last name" width={40} />
        </div>
        <InputComponent id="email" placeholder="Email"/>
        <DateOfBirth/>
        <div className="text-[16px] text-gray-700 font-[500] my-2">Interested (optional)</div>
        <div className="flex">
          {baseTags.map((tag, index) => {return <div className={`mr-2 border-1 border-[#f4cdb8ff] rounded-[10px] px-2 py-[2px] text-[16px] cursor-default ${baseTags[index].selected ? 'bg-[#f4cdb8ff]' : ''}`} onClick={() => setSelectedTag(index)}>{tag.name}</div>})}
        </div>
        <div id="register-button" className={`bg-[#f8d6db] rounded-[5px] w-fit mt-2 p-[8px] font-[700] shadow-md cursor-default hover:bg-[#f3bfa3]`} >Sign Up</div>

      </div>
    </div>
  );
}

export default AuthPage;
