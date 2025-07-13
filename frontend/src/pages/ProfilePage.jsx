import { useEffect, useState } from "react";
import SideNavContainer from "../components/SideNavContainer";
import { useNavigationBar } from "../hooks/useNavigationBar";
import { useTags } from "../hooks/useTags";
import colorTheme from "../libs/colorTheme";
import EditableText from "../components/editableText";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { id } = useParams();
  const { userTags, fetchUserTags } = useTags();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const isMyAccount = user._id === id;
  let dob = null;
  if (user.dob) dob = new Date(user.dob);
  const now = new Date();

  const setAge = () => {
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth() + 1; // เพิ่ม 1 เพราะเริ่มที่ 0
    const day = now.getUTCDate();

    const yearUser = dob.getUTCFullYear();
    const monthUser = dob.getUTCMonth() + 1;
    const dayUser = dob.getUTCDate();

    let age = year - yearUser;
    if (month >= monthUser && day >= dayUser) age + 1;
    return age;
  };

  useEffect(() => {
  }, []);

  const { hideNavBar, toggleSideNavBar } = useNavigationBar();
  return (
    <>
      <div className="flex bg-[#fcfff7ff] min-h-screen w-auto">
        <SideNavContainer
          hideNavBar={hideNavBar}
          toggleSideNavBar={toggleSideNavBar}
        />

        <div className={`${hideNavBar ? "" : "ml-[250px]"} text-[#3B3B1A]`}>
          <div
            className={`h-[200px] bg-gray-500 ${
              hideNavBar ? "min-w-[calc(100vw)]" : "min-w-[calc(100vw-250px)]"
            }`}
          >
            ProfilePicture
          </div>
          <EditableText
            data={user.penName}
            textSize={40}
            hoverMode={true}
            isMyAccount={isMyAccount}
            id={id}
            fieldName="penName"
            editWidth={"400px"}
          />
          <div className="text-[16px] text-[#808077ff] ml-4">
            @{user.username} {dob && `, ${setAge()} years`}
          </div>
          <div className="text-[24px] ml-4 mt-4">About me</div>
          <div>
            <EditableText
              data={user.aboutMe}
              type={"textarea"}
              textSize={16}
              hoverMode={false}
              isMyAccount={isMyAccount}
              id={id}
              fieldName="aboutMe"
              editWidth={"60vw"}
              editHeight={"400px"}
            />
          </div>
          <div className="text-[24px] ml-4 mt-4">Interested</div>
          <div className="flex ml-4 cursor-default">
            {userTags.map((tag, index) => (
              <div
                key={index}
                className={`mr-2 border-[1.5px] border-[] rounded-[10px] px-2 py-[2px] text-[16px] }`}
                style={{
                  borderColor: colorTheme.style1,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
