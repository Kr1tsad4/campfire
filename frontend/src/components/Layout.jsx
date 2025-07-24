import NavigationMenu from "./NavigationMenu.jsx";
import Header from "../components/Header.jsx";
import { useNavigationBar } from "../contexts/NavigationContext.jsx";
import { FaBars } from "react-icons/fa";
import { useEffect } from "react";

function Layout({
  children,
  loginUser,
  hideSearchBar,
  searchValue,
  setSearchValue,
  handleSearchParty,
}) {
  const { hideNavBar, toggleSideNavBar } = useNavigationBar();

  return (
    <div className="flex bg-[#f9fffbff] min-h-screen w-auto ">
      {!hideNavBar && (
        <NavigationMenu
          toggleSideNavBar={toggleSideNavBar}
          hideNavBar={hideNavBar}
        />
      )}
      {hideNavBar && (
        <div
          className={`${
            hideNavBar ? "block" : ""
          } pt-7 pl-5 z-15 fixed `}
        >
          <div className="flex gap-4 w-[200px] ">
            <button
              className="cursor-pointer"
              onClick={() => toggleSideNavBar()}
            >
              <FaBars size={25} color="black" />
            </button>

            <p className="font-bold text-[22px] pt-6 max-[426px]:hidden max-[2556px]:hidden text-black ">
              MAAM PARTY
            </p>
          </div>
        </div>
      )}
      <div>
        <div className="-ml-[75px]">
          <Header
            handleSearchParty={handleSearchParty}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            hideNavBar={hideNavBar}
            hideSearchBar={hideSearchBar}
            loginUser={loginUser}
          />

          <div
            className={`${
              hideNavBar
                ? "ml-21 md:ml-24 lg:-ml-130 xl:-ml-70"
                : "ml-21 md:ml-24 lg:ml-100 xl:ml-90"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
