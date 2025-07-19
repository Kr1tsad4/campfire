import { useNavigationBar } from "../contexts/NavigationContext";
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
            className={`min-w-full ml-1 max-[769px]:ml-0${
              hideNavBar ? "ml-[0px]" : ""
            }`}
          >
            <p
              className={`text-[32px] text-black  mt-25 ${
                hideNavBar ? "ml-[380px]" : ""
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
                <p
                  className={`text-black text-[18px] ${
                    hideNavBar
                      ? "min-[1024px]:ml-[900px]"
                      : "min-[1024px]:ml-[400px]"
                  }  `}
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
          <div className={`min-w-full mb-28 mt-25 ml-1  max-[769px]:ml-0 `}>
            <p
              className={`text-[32px] text-black  mt-10   ${
                hideNavBar ? "ml-[380px]" : ""
              }`}
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
              {(!joinedParties || joinedParties.length === 0) && (
                <p
                  className={`text-black text-[18px] ${
                    hideNavBar
                      ? "min-[1024px]:ml-[900px]"
                      : "min-[1024px]:ml-[400px]"
                  }  `}
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
