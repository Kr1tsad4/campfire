import NavigationMenu from "./NavigationMenu";
import Header from "../components/Header";
import { useNavigationBar } from "../contexts/NavigationContext";
import { FaBars } from "react-icons/fa";

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
    <div className="flex bg-[#fcfff7ff] min-h-screen w-auto">
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
          } pt-6 pl-6 z-50 fixed max-[1025px]:ml-5 max-[426px]:-ml-3 max-[1441px]:mt-1`}
        >
          <div className="flex gap-4 w-[200px] ">
            <button
              className="cursor-pointer"
              onClick={() => toggleSideNavBar()}
            >
              <FaBars size={25} color="black" />
            </button>
            <p className="font-bold text-[22px] pt-6 max-[426px]:hidden max-[2556px]:hidden">
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
                ? "ml-20 sm:ml-30 md:ml-30 lg:-ml-80 xl:ml-5"
                : "ml-20 sm:ml-30 md:ml-30 lg:-ml-50 xl:ml-5"
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
