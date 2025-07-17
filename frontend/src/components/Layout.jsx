import SideNavContainer from "../components/SideNavContainer";
import Header from "../components/Header";
import { useNavigationBar } from "../hooks/useNavigationBar";
import { useParty } from "../hooks/useParty";

function Layout({ children, loginUser, hideSearchBar }) {
  const { hideNavBar, toggleSideNavBar } = useNavigationBar();
  const { handleSearchParty, searchValue, setSearchValue } = useParty();
  return (
    <>
      <div className="flex bg-[#fcfff7ff] min-h-screen w-auto">
        <SideNavContainer
          hideNavBar={hideNavBar}
          toggleSideNavBar={toggleSideNavBar}
        />
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
