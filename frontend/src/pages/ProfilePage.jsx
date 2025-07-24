import { useEffect } from "react";
import NavigationMenu from "../components/NavigationMenu.jsx";
import { useNavigationBar } from "../contexts/NavigationContext.jsx";
import colorTheme from "../libs/colorTheme.js";

import EditableText from "../components/EditableText.jsx";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser.js";
import { FaBars, FaHome } from "react-icons/fa";

function ProfilePage() {
  const { id } = useParams();
  const { fetchUser, user, getLoginUser, loginUser } = useUser();

  const isMyAccount = loginUser?._id === id;
  let dob = null;
  if (user?.dob) dob = new Date(user?.dob);
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
    getLoginUser();
    fetchUser(id);
  }, []);

  const { hideNavBar, toggleSideNavBar } = useNavigationBar();
  return (
    <>
      <div className="flex bg-[#fcfff7ff] min-h-screen w-auto">
        {!hideNavBar && (
          <div>
            <NavigationMenu
              toggleSideNavBar={toggleSideNavBar}
              hideNavBar={hideNavBar}
            />
          </div>
        )}
        {hideNavBar && (
          <div
            className={`${
              hideNavBar ? "block" : ""
            } pt-6  pl-6  z-50 fixed max-[1025px]:ml-5 max-[426px]:-ml-3 max-[1441px]:mt-1`}
          >
            <div className="flex gap-4 w-[200px]">
              <button
                className="cursor-pointer "
                onClick={() => toggleSideNavBar(hideNavBar)}
              >
                <FaBars size={25} color="black" />
              </button>
              <p
                className={`font-bold text-[22px] pt-6 max-[426px]:hidden max-[2556px]:hidden `}
              >
                MAAM PARTY
              </p>
            </div>
          </div>
        )}

        <div className={`${hideNavBar ? "" : "ml-[250px]"} text-[#3B3B1A]`}>
          <div
            className={`h-[200px] bg-gray-500 ${
              hideNavBar ? "min-w-[calc(100vw)]" : "min-w-[calc(100vw-250px)]"
            }`}
          >
            ProfilePicture
          </div>
          <EditableText
            data={user?.penName}
            textSize={40}
            hoverMode={true}
            isMyAccount={isMyAccount}
            id={id}
            fieldName="penName"
            editWidth={"400px"}
          />
          <div className="text-[16px] text-[#808077ff] ml-4">
            @{user?.username} {dob && `, ${setAge()} years`}
          </div>
          <div className="text-[24px] ml-4 mt-4">About me</div>
          <div>
            <EditableText
              data={user?.aboutMe}
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
            {user?.interestedTag.map((tag, index) => (
              <div
                key={index}
                className={`mr-2 border-[1.5px] border-[] rounded-[10px] px-2 py-[2px] text-[16px] }`}
                style={{
                  borderColor: colorTheme.style1,
                }}
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
