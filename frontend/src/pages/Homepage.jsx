import Header from "../components/Header";
import SideNavContainer from "../components/SideNavContainer";
import ListParty from "../components/ListParty";
import { useParty } from "../hooks/useParty";
import { useNavigationBar } from "../hooks/useNavigationBar";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import PartyDetailsPage from "./PartyDetailsPage";

function Homepage({ openPartyDetails }) {

  const {
    parties,
    fetchParties,
    handleSearchParty,
    searchValue,
    setSearchValue,
    joinParty,
    viewPartyDetails,
  } = useParty();
  const { hideNavBar, toggleSideNavBar } = useNavigationBar();
  const { loginUser, getLoginUser } = useUser();

  useEffect(() => {
    getLoginUser();
  }, []);

  useEffect(() => {
    fetchParties(null, loginUser);
  }, [loginUser]);

  return (
    <>
      <div className={`flex bg-[#fff7f8] min-h-screen w-auto relative`}>
        <SideNavContainer
          hideNavBar={hideNavBar}
          toggleSideNavBar={toggleSideNavBar}
        />

        <div className={`flex flex-col w-full items-center relative z-0`}>
          <Header
            handleSearchParty={handleSearchParty}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            hideNavBar={hideNavBar}
            hideSearchBar={false}
          />
          <div>
            <ListParty
              parties={parties}
              hideNavBar={hideNavBar}
              joinParty={joinParty}
              loginUser={loginUser}
              viewPartyDetails={viewPartyDetails}
              openPartyDetails={openPartyDetails}
            />
          </div>
        </div>

        {openPartyDetails && (
          <>
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-10"
              style={{ pointerEvents: "auto" }}
            ></div>
            <div className="fixed top-0 left-[360px] z-20">
              <PartyDetailsPage />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Homepage;
