import { useNavigationBar } from "../contexts/NavigationContext";
import { useParty } from "../hooks/useParty";
import ListParty from "../components/ListParty";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PartyDetailsPopup from "../components/PartyDetailsPopup";
function MyPartyPage({ openPartyDetails, loginUser }) {
  const navigator = useNavigate();

  const { hideNavBar } = useNavigationBar();
  const {
    viewPartyDetails,
    userParties,
    getUserParties,
    joinedParties,
    getUserJoinedParties,
    deleteMyParty,
  } = useParty();

  useEffect(() => {
    if (loginUser && loginUser._id) {
      getUserParties(loginUser._id);
      getUserJoinedParties(loginUser._id);
    }
  }, [loginUser]);

  return (
    <>
      <div>
        <Layout loginUser={loginUser} hideSearchBar={true}>
          <div className={``}>
            <p
              className={` text-[32px] text-black mt-25 ${
                hideNavBar ? " lg:ml-160 xl:ml-100" : ""
              }`}
            >
              My parties
            </p>
            <div className={`-mt-[80px] `}>
              {userParties && (
                <ListParty
                  parties={userParties}
                  hideNavBar={hideNavBar}
                  viewPartyDetails={viewPartyDetails}
                  isMyParty={true}
                  deleteMyParty={deleteMyParty}
                  userId={loginUser?._id}
                />
              )}
              {(!userParties || userParties.length === 0) && (
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <p className={`text-gray-600 text-[18px] `}>
                    {" "}
                    You haven’t created any parties yet.{" "}
                    <span
                      onClick={() => navigator("/create-party")}
                      className="text-blue-500 cursor-pointer hover:underline transition-all"
                    >
                      Create now ?
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className={``}>
            <p
              className={`text-[32px] text-black ${
                userParties?.length === 0 ? "mt-40" : "mt-20"
              }  ${hideNavBar ? " lg:ml-160 xl:ml-100" : ""}`}
            >
              Joined Parties
            </p>
            <div className={`-mt-[80px]`}>
              {joinedParties && (
                <ListParty
                  parties={joinedParties}
                  hideNavBar={hideNavBar}
                  viewPartyDetails={viewPartyDetails}
                />
              )}
              {(!joinedParties || joinedParties?.length === 0) && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-5">
                  <p className={`text-gray-600 text-[18px]`}>
                    You haven’t joined any parties yet.{" "}
                    <span
                      onClick={() => navigator("/home")}
                      className="text-blue-500 cursor-pointer hover:underline transition-all"
                    >
                      Explore now
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </Layout>
        {openPartyDetails && (
          <>
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-20"
              style={{ pointerEvents: "auto" }}
            ></div>
            <div
              className={`fixed top-0 left-[360px] z-25 ${
                hideNavBar
                  ? "max-[1441px]:top-15 max-[1441px]:left-80 max-[1025px]:left-40 max-[1025px]:top-5 max-[769px]:left-20 max-[426px]:left-0 max-[321px]:-left-3"
                  : "max-[1441px]:top-15 max-[1025px]:left-60 max-[1025px]:top-5 max-[769px]:left-25 max-[426px]:left-0"
              }`}
            >
              <PartyDetailsPopup />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MyPartyPage;
