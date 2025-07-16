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

            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
