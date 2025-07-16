import { useNavigationBar } from "../hooks/useNavigationBar";
import { useParty } from "../hooks/useParty";
import ListParty from "../components/ListParty";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function MyPartyPage({ loginUser }) {
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
          <div
            className={`min-w-full ${
              hideNavBar
                ? "max-[1441px]:-ml-18  max-[769px]:-ml-40 max-[426px]:-ml-45"
                : "max-[1025px]:-ml-5 "
            } `}
          >
            <p
              className={`text-[32px] text-black  mt-20 ml-[380px] ${
                hideNavBar ? "ml-[220px]" : "max-[1025px]:ml-[200px]"
              }`}
            >
              My parties
            </p>
            <div
              className={`-mt-[80px] ${
                hideNavBar ? "ml-[190px] max-[321px]:ml-47" : ""
              }`}
            >
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
                <p
                  className={`text-black  mt-12 text-[18px]  ${
                    hideNavBar ? "ml-[350px]" : "ml-[720px]"
                  }`}
                >
                  {" "}
                  You haven’t created any parties yet.{" "}
                  <span
                    onClick={() => navigator("/create-party")}
                    className="text-blue-500 cursor-pointer hover:underline transition-all"
                  >
                    Create now ?
                  </span>
                </p>
              )}
            </div>
          </div>
          <div
            className={`min-w-full mb-28  ${
              hideNavBar
                ? "max-[769px]:-ml-40 max-[1441px]:-ml-17 max-[426px]:-ml-45"
                : "max-[1025px]:-ml-5 "
            } `}
          >
            <p
              className={`text-[32px] text-black  mt-10 ml-[380px] ${
                hideNavBar ? "ml-[220px]" : "max-[1025px]:ml-[200px]"
              }`}
            >
              Joined Parties
            </p>
            <div className={`-mt-[80px] ${hideNavBar ? "ml-[190px]" : ""}`}>
              {joinedParties && (
                <ListParty
                  parties={joinedParties}
                  hideNavBar={hideNavBar}
                  viewPartyDetails={viewPartyDetails}
                />
              )}
              {(!joinedParties || joinedParties.length === 0) && (
                <p
                  className={`text-black  mt-18 text-[18px]  ${
                    hideNavBar ? "ml-[350px]" : "ml-[680px]"
                  }`}
                >
                  You haven’t joined any parties yet.{" "}
                  <span
                    onClick={() => navigator("/home")}
                    className="text-blue-500 cursor-pointer hover:underline transition-all"
                  >
                    Explore now
                  </span>
                </p>
              )}
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}

export default MyPartyPage;
