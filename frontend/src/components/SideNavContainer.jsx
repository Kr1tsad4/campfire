import { FaBars } from "react-icons/fa";
import NavigationMenu from "./NavigationMenu";

function SideNavContainer({ hideNavBar, toggleSideNavBar, children }) {
  return (
    <>
      {!hideNavBar && (
        <div>
          <NavigationMenu
            toggleSideNavBar={toggleSideNavBar}
            hideNavBar={hideNavBar}
          />
        </div>
      )}
      {hideNavBar && (
        <div className={`${hideNavBar ? "block" : ""} pt-6  pl-6  z-50 fixed`}>
          <div className="flex gap-4 w-[200px]">
            <button
              className="cursor-pointer"
              onClick={() => toggleSideNavBar(hideNavBar)}
            >
              <FaBars size={25} color="black" />
            </button>
            <p className="font-bold text-[22px] text-black">MAAM PARTY</p>
          </div>
        </div>
      )}
    </>
  );
}

export default SideNavContainer;
