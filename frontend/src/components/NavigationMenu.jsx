import { FaBars } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { MdForum, MdExplore } from "react-icons/md";
import { TiPlus } from "react-icons/ti";
import { FcInvite } from "react-icons/fc";
import { BiLogOut } from "react-icons/bi";
import { useUser } from "../hooks/useUser";
import ConfirmPopup from "./ConfirmPopup.jsx";
import { useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { useNavigationBar } from "../contexts/NavigationContext";

function NavigationMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const { hideNavBar, toggleSideNavBar } = useNavigationBar();
  const { removeLoginUser, setLoginUser } = useUser();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const isHome = location.pathname === "/home";
  const isPartyBoard = location.pathname === "/party-board";
  const isCreateParty = location.pathname === "/create-party";
  const isParty = location.pathname === "/my-party";
  const isInvitations = location.pathname === "/invitations";
  const isFriends = location.pathname === "/friends";
  const isInbox = location.pathname === "/inbox";

  const handleLogout = () => {
    removeLoginUser();
    setLoginUser(null);
    window.location.href = "/";
  };

  const goTo = (path) => {
    if (window.innerWidth <= 768 && !hideNavBar) {
      toggleSideNavBar();
    }
    navigate(path);
  };

  return (
    <>
      <div className="w-[250px] min-h-screen bg-[#093c1aff] fixed z-15 max-[1025px]:min-h-full max-[1025px]:w-[300px] max-[321px]:w-[320px] max-[426px]:w-[250px]">
        <div className="flex gap-2 px-5">
          <div className="pt-7">
            <button className="cursor-pointer" onClick={() => toggleSideNavBar()}>
              <FaBars size={25} />
            </button>
          </div>
          <p className="font-bold text-[22px] pt-6 max-[321px]:text-[18px] max-[426px]:mt-1">
            Campfire
          </p>
        </div>
        <div>
          <div className="mt-10">
            <button
              onClick={() => goTo("/home")}
              className={`cursor-pointer flex gap-4 hover:bg-[#041c0cff] transition-all w-full px-5 py-3 ${
                isHome ? "bg-[#041c0cff]" : ""
              }`}
            >
              <MdExplore size={25} />
              <h1 className="font-bold text-[22px] -mt-1 text-white">Explore</h1>
            </button>
          </div>
          <div className="mt-5">
            <button
              onClick={() => goTo("/party-board")}
              className={`cursor-pointer flex gap-4 hover:bg-[#041c0cff] transition-all w-full px-5 py-3 ${
                isPartyBoard ? "bg-[#041c0cff]" : ""
              }`}
            >
              <MdForum size={25} />
              <h1 className="font-bold text-[22px] -mt-1 text-white">Board</h1>
            </button>
          </div>
          <div className="mt-5">
            <button
              onClick={() => goTo("/my-party")}
              className={`cursor-pointer flex gap-4 hover:bg-[#041c0cff] transition-all w-full px-5 py-3 ${
                isParty ? "bg-[#041c0cff]" : ""
              }`}
            >
              <RiTeamFill size={25} />
              <h1 className="font-bold text-[22px] -mt-1 text-white">My Party</h1>
            </button>
          </div>
          <div className="mt-5">
            <button
              onClick={() => goTo("/friends")}
              className={`cursor-pointer flex gap-4 hover:bg-[#041c0cff] transition-all w-full px-5 py-3 ${
                isFriends ? "bg-[#041c0cff]" : ""
              }`}
            >
              <FaUserFriends size={25} />
              <h1 className="font-bold text-[22px] -mt-1 text-white">Friends</h1>
            </button>
          </div>
          <div className="mt-5">
            <button
              onClick={() => goTo("/inbox")}
              className={`cursor-pointer flex gap-4 hover:bg-[#041c0cff] transition-all w-full px-5 py-3 ${
                isInbox ? "bg-[#041c0cff]" : ""
              }`}
            >
              <IoChatbubbleEllipses size={25} />
              <h1 className="font-bold text-[22px] -mt-1 text-white">Messages</h1>
            </button>
          </div>
          <div className="mt-5">
            <button
              onClick={() => goTo("/create-party")}
              className={`cursor-pointer flex gap-4 hover:bg-[#041c0cff] transition-all w-full px-5 py-3 ${
                isCreateParty ? "bg-[#041c0cff]" : ""
              }`}
            >
              <TiPlus size={25} />
              <h1 className="font-bold text-[22px] -mt-1 text-white">Create party</h1>
            </button>
          </div>
          <div className="mt-5">
            <button
              onClick={() => goTo("/invitations")}
              className={`cursor-pointer flex gap-4 hover:bg-[#041c0cff] transition-all w-full px-5 py-3 ${
                isInvitations ? "bg-[#041c0cff]" : ""
              }`}
            >
              <FcInvite size={25} />
              <h1 className="font-bold text-[22px] -mt-1 text-white">Invitations</h1>
            </button>
          </div>
          <div className="mt-5">
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="cursor-pointer flex gap-4 hover:bg-[#041c0cff] transition-all w-full px-5 py-3"
            >
              <BiLogOut size={25} />
              <h1 className="font-bold text-[22px] -mt-1 text-white">Logout</h1>
            </button>
          </div>
        </div>
        <ConfirmPopup
          isOpen={showLogoutConfirm}
          title="Confirm Logout"
          message="Are you sure you want to logout?"
          confirmText="Logout"
          cancelText="Cancel"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      </div>
    </>
  );
}

export default NavigationMenu;
