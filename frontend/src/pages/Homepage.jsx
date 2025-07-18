import ListParty from "../components/ListParty";
import { useParty } from "../hooks/useParty";
import { useNavigationBar } from "../hooks/useNavigationBar";
import { useEffect, useState } from "react";
import PartyDetailsPopup from "../components/PartyDetailsPopup";
import Layout from "../components/Layout";

function Homepage({ openPartyDetails, loginUser }) {
  const {
    parties,
    fetchParties,
    joinParty,
    viewPartyDetails,
    handleSearchParty,
    searchValue,
    setSearchValue,
  } = useParty();

  const { hideNavBar } = useNavigationBar();


  useEffect(() => {
    setTmpHideNavBar(hideNavBar);
    console.log(hideNavBar, tmpHideNavBar);
  }, [tmpHideNavBar]);
  useEffect(() => {
    fetchParties(loginUser, searchValue);
  }, [loginUser]);
  
  return (
    <>
      <div>
        <Layout
          loginUser={loginUser}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearchParty={handleSearchParty}
        >
          <ListParty
            parties={parties}
            hideNavBar={tmpHideNavBar}
            joinParty={joinParty}
            loginUser={loginUser}
            viewPartyDetails={viewPartyDetails}
            openPartyDetails={openPartyDetails}
          />
        </Layout>
      </div>

      {openPartyDetails && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-10"
            style={{ pointerEvents: "auto" }}
          ></div>
          <div
            className={`fixed top-0 left-[360px] z-20 ${
              hideNavBar
                ? "max-[1441px]:top-15 max-[1441px]:left-80 max-[1025px]:left-40 max-[1025px]:top-5 max-[769px]:left-20 max-[426px]:left-0 max-[321px]:-left-3"
                : "max-[1441px]:top-15 max-[1025px]:left-60 max-[1025px]:top-5 max-[769px]:left-25 max-[426px]:left-0"
            }`}
          >
            <PartyDetailsPopup />
          </div>
        </>
      )}
    </>
  );
}

export default Homepage;
