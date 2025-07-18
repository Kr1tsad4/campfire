import NavigationMenu from "./NavigationMenu"; 
import Header from "../components/Header";
import { useNavigationBar } from "../hooks/useNavigationBar";
import { useParty } from "../hooks/useParty";

function Layout({ children, loginUser, hideSearchBar }) {
  const { hideNavBar, toggleSideNavBar } = useNavigationBar();
  const { handleSearchParty, searchValue, setSearchValue } = useParty();
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
                  ? "max-[376px]:ml-20 max-[426px]:ml-22 max-[769px]:ml-28 max-[1025px]:-ml-50  max-[1441px]:-ml-30  max-[2561px]:-ml-25"
                  : "max-[426px]:ml-22 max-[769px]:ml-28 max-[1025px]:-ml-50 max-[1441px]:-ml-0"
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
