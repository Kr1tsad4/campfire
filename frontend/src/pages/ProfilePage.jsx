import { useEffect } from "react";
import SideNavContainer from "../components/SideNavContainer";
import { useNavigationBar } from "../hooks/useNavigationBar";

function ProfilePage() {

  const user = JSON.parse(sessionStorage.getItem('user'));
  let dob = null;
  if(user.dob)  dob = new Date(user.dob);
  const now = new Date();

  const setAge = () => {
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth() + 1; // เพิ่ม 1 เพราะเริ่มที่ 0
    const day = now.getUTCDate();

    const yearUser = dob.getUTCFullYear();
    const monthUser = dob.getUTCMonth() + 1;
    const dayUser = dob.getUTCDate();

    let age = year - yearUser;
    if(month >= monthUser && day >= dayUser) age + 1;
    return age;
  }
  
  useEffect(() => {
    console.log(user);
  }, [])

  const { hideNavBar, toggleSideNavBar } = useNavigationBar();
  return (
    <>
      <div className="flex bg-[#fcfff7ff] min-h-screen w-auto">
        <SideNavContainer
          hideNavBar={hideNavBar}
          toggleSideNavBar={toggleSideNavBar}
        />

      <div className={`${hideNavBar ? '' : 'ml-[250px]'} text-[#3B3B1A]`}>
        <div className={`h-[200px] bg-gray-500 ${hideNavBar ? 'min-w-[calc(100vw)]' : 'min-w-[calc(100vw-250px)]' }`}>ProfilePicture</div>
        <div className="text-[40px] ml-4 m-0">{user.penName}</div>
        <div className="text-[16px] text-[#808077ff] ml-4">@{user.username} {dob && `, ${setAge()} years`}</div>
        <div className="text-[24px] ml-4 mt-4">About me</div>
        <div className="text-[16px] text-[#808077ff] mx-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque deserunt nostrum qui eos, ea quidem provident commodi eius sunt nobis omnis esse, minus consequuntur blanditiis laudantium voluptatum nihil soluta ad.</div>
        <div className="text-[24px] ml-4 mt-4">Interested</div>
      </div>
      </div>

    </>
  );
}

export default ProfilePage;