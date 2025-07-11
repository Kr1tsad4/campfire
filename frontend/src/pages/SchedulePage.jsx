import { useNavigationBar } from "../hooks/useNavigationBar";
import SideNavContainer from "../components/SideNavContainer";
import Header from "../components/Header";
function SchedulePage() {
  const { hideNavBar, toggleSideNavBar } = useNavigationBar();

  return (
    <>
      <div className="flex bg-[#fff7f8] min-h-screen w-auto">
        <SideNavContainer
          hideNavBar={hideNavBar}
          toggleSideNavBar={toggleSideNavBar}
        />
        <div>
          <div className="-ml-[75px]">
            <Header hideSearchBar={true} hideNavBar={hideNavBar} />
          </div>

          {/* comp */}
        </div>
      </div>
    </>
  );
}

export default SchedulePage;
