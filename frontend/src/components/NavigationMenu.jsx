import { FaBars, FaHome } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCalendarDays } from "react-icons/fa6";
import { TiPlus } from "react-icons/ti";
import { FcInvite } from "react-icons/fc";
import { IoIosSettings } from "react-icons/io";

function NavigationMenu({ toggleSideNavBar, hideNavBar }) {
  const navigator = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/home";
  const isSchedule = location.pathname === "/schedule";
  const isCreateParty = location.pathname === "/create-party";
  const isParty = location.pathname === "/my-party";
  const isInvitations = location.pathname === "/invitations";
  const isSettings = location.pathname === "/settings";
  return (
    <>
      <div
        className="w-[250px] min-h-screen bg-[#c86e5a] fixed z-20 
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
              className={`cursor-pointer flex gap-4 hover:bg-[#e0907e] transition-all w-full px-5 py-3 ${
                isHome ? "bg-[#e0907e]" : ""
              }`}
            >
              <FaHome size={25} />
              <h1 className="font-bold text-[22px] -mt-1">Home</h1>
            </button>
          </div>
          <div className="mt-5">
            <button
              onClick={() => navigator("/my-party")}
              className={`cursor-pointer flex gap-4 hover:bg-[#e0907e] transition-all w-full px-5 py-3 ${
                isParty ? "bg-[#e0907e]" : ""
              }`}
            >
              <RiTeamFill size={25} />
              <h1 className="font-bold text-[22px] -mt-1">My Party</h1>
            </button>
          </div>
          <div className="mt-5">
            <button
              onClick={() => navigator("/schedule")}
              className={`cursor-pointer flex gap-4 hover:bg-[#e0907e] transition-all w-full px-5 py-3 ${
                isSchedule ? "bg-[#e0907e]" : ""
              }`}
            >
              <FaCalendarDays size={25} />
              <h1 className="font-bold text-[22px] -mt-1">My Schedule</h1>
            </button>
          </div>
          <div className="mt-5">
            <button
              onClick={() => navigator("/create-party")}
              className={`cursor-pointer flex gap-4 hover:bg-[#e0907e] transition-all w-full px-5 py-3 ${
                isCreateParty ? "bg-[#e0907e]" : ""
              }`}
            >
              <TiPlus size={25} />
              <h1 className="font-bold text-[22px] -mt-1">Create party</h1>
            </button>
          </div>
          <div className="mt-5">
            <button
              onClick={() => navigator("/invitations")}
              className={`cursor-pointer flex gap-4 hover:bg-[#e0907e] transition-all w-full px-5 py-3 ${
                isInvitations ? "bg-[#e0907e]" : ""
              }`}
            >
              <FcInvite size={25} />
              <h1 className="font-bold text-[22px] -mt-1">Invitations</h1>
            </button>
          </div>
          <div className="mt-5">
            <button
              onClick={() => navigator("/settings")}
              className={`cursor-pointer flex gap-4 hover:bg-[#e0907e] transition-all w-full px-5 py-3 ${
                isSettings ? "bg-[#e0907e]" : ""
              }`}
            >
              <IoIosSettings size={25} />
              <h1 className="font-bold text-[22px] -mt-1">Settings</h1>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavigationMenu;
