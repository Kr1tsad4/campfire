import { useNavigationBar } from "../hooks/useNavigationBar";
import SideNavContainer from "../components/SideNavContainer";
import Header from "../components/Header";
import socket from "../socket";
import { useEffect } from "react";
function InvitationsPage() {
  const { hideNavBar, toggleSideNavBar } = useNavigationBar();
  useEffect(() => {
    socket.emit("invitation");
  }, []);
  return (
    <>
      <div className="flex bg-[#fcfff7ff] min-h-screen w-auto">
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

export default InvitationsPage;
