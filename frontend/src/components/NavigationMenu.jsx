import { FaBars, FaHome } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { MdForum } from "react-icons/md";
import { TiPlus } from "react-icons/ti";
import { FcInvite } from "react-icons/fc";
import { BiLogOut } from "react-icons/bi";
import { useUser } from "../hooks/useUser";
import { MdExplore } from "react-icons/md";

function NavigationMenu({ toggleSideNavBar, hideNavBar }) {
  const navigator = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/home";
  const isPartyBoard = location.pathname === "/party-board";
  const isCreateParty = location.pathname === "/create-party";
  const isParty = location.pathname === "/my-party";
  const isInvitations = location.pathname === "/invitations";

  const { removeLoginUser } = useUser();
  return (
    <>
      <div
        className="w-[250px] min-h-screen bg-[#8A784E] fixed z-20 
          max-[1025px]:min-h-full max-[1025px]:w-[300px] max-[321px]:w-[320px] max-[426px]:w-[250px]"
      >
        <div className="flex gap-4 px-5">
          <div className="pt-7 ">
            <button
              className="cursor-pointer"
              onClick={() => toggleSideNavBar(hideNavBar)}
            >
              <FaBars size={25} />
            </button>
          </div>
          <p
            className={`font-bold text-[22px] pt-6 max-[321px]:text-[18px] max-[426px]:mt-1`}
          >
            MAAM PARTY
          </p>
        </div>
        <div>
          <div className="mt-10">
            <button
              onClick={() => navigator("/home")}
              className={`cursor-pointer flex gap-4 hover:bg-[#3B3B1A] transition-all w-full px-5 py-3 ${
                isHome ? "bg-[#3B3B1A]" : ""
              }`}
            >
              <MdExplore size={25} />
              <h1 className="font-bold text-[22px] -mt-1">Explore</h1>
            </button>
          </div>
          <div className="mt-5">
            <button
              onClick={() => navigator("/party-board")}
              className={`cursor-pointer flex gap-4 hover:bg-[#3B3B1A] transition-all w-full px-5 py-3 ${
                isPartyBoard ? "bg-[#3B3B1A]" : ""
              }`}
            >
              <MdForum size={25} />
              <h1 className="font-bold text-[22px] -mt-1">Party Board</h1>
            </button>
          </div>
          <div className="mt-5">
            <button
              onClick={() => navigator("/my-party")}
              className={`cursor-pointer flex gap-4 hover:bg-[#3B3B1A] transition-all w-full px-5 py-3 ${
                isParty ? "bg-[#3B3B1A]" : ""
              }`}
            >
              <RiTeamFill size={25} />
              <h1 className="font-bold text-[22px] -mt-1">My Party</h1>
            </button>
          </div>

          <div className="mt-5">
            <button
              onClick={() => navigator("/create-party")}
              className={`cursor-pointer flex gap-4 hover:bg-[#3B3B1A] transition-all w-full px-5 py-3 ${
                isCreateParty ? "bg-[#3B3B1A]" : ""
              }`}
            >
              <TiPlus size={25} />
              <h1 className="font-bold text-[22px] -mt-1">Create party</h1>
            </button>
          </div>
          <div className="mt-5">
            <button
              onClick={() => navigator("/invitations")}
              className={`cursor-pointer flex gap-4 hover:bg-[#3B3B1A] transition-all w-full px-5 py-3 ${
                isInvitations ? "bg-[#3B3B1A]" : ""
              }`}
            >
              <FcInvite size={25} />
              <h1 className="font-bold text-[22px] -mt-1">Invitations</h1>
            </button>
          </div>
  
          <div className="mt-5">
            <button
              onClick={() => {
                removeLoginUser();
                navigator("/");
              }}
              className={`cursor-pointer flex gap-4 hover:bg-[#3B3B1A] transition-all w-full px-5 py-3 `}
            >
              <BiLogOut size={25} />
              <h1 className="font-bold text-[22px] -mt-1">Logout</h1>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavigationMenu;
