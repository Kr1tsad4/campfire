import Header from "../components/Header";
import SideNavContainer from "../components/SideNavContainer";
import ListParty from "../components/ListParty";
import { useParty } from "../hooks/useParty";
import { useNavigationBar } from "../hooks/useNavigationBar";
import { useEffect, useState } from "react";

function Homepage() {
  const {
    parties,
    fetchParties,
    handleSearchParty,
    searchValue,
    setSearchValue,
    viewPartyDetails,
  } = useParty();
  const { hideNavBar, toggleSideNavBar } = useNavigationBar();

  useEffect(() => {
    fetchParties();
  }, []);
  return (
    <>
      <div className="flex bg-[#fff7f8] min-h-screen w-auto">
        <SideNavContainer
          hideNavBar={hideNavBar}
          toggleSideNavBar={toggleSideNavBar}
        />


        <div className={`flex flex-col w-full items-center`}>
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
              viewPartyDetails={viewPartyDetails}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
