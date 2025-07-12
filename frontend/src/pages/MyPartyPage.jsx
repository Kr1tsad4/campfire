import Header from "../components/Header";
import { useNavigationBar } from "../hooks/useNavigationBar";
import { useParty } from "../hooks/useParty";
import SideNavContainer from "../components/SideNavContainer";
import ListParty from "../components/ListParty";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

function MyPartyPage() {
  const navigator = useNavigate();
  const { loginUser, getLoginUser } = useUser();

  const { hideNavBar, toggleSideNavBar } = useNavigationBar();
  const {
    viewPartyDetails,
    userParties,
    getUserParties,
    joinedParties,
    getUserJoinedParties,
  } = useParty();

  useEffect(() => {
    getLoginUser();
  }, []);

  useEffect(() => {
    if (loginUser && loginUser._id) {
      getUserParties(loginUser._id);
      getUserJoinedParties(loginUser._id);
    }
  }, [loginUser]);

  return (
    <>
      <div className="flex bg-[#fff7f8] min-h-screen w-auto ">
        <SideNavContainer
          hideNavBar={hideNavBar}
          toggleSideNavBar={toggleSideNavBar}
        />
        <div>
          <div className="-ml-[75px] ">
            <Header hideSearchBar={true} hideNavBar={hideNavBar} />
          </div>
          <div className="ml-12 min-w-full">
            <p
              className={`text-[32px] text-black  mt-20 ${
                hideNavBar ? "ml-[220px]" : "ml-[260px]"
              }`}
            >
              My parties
            </p>
            <div className={`-mt-[100px] ${hideNavBar ? "ml-[190px]" : ""}`}>
              {userParties && (
                <ListParty
                  parties={userParties}
                  hideNavBar={hideNavBar}
                  viewPartyDetails={viewPartyDetails}
                />
              )}
              {!userParties ||
                (userParties.length === 0 && (
                  <p
                    className={`text-black  mt-12 text-[18px]  ${
                      hideNavBar ? "ml-[350px]" : "ml-[600px]"
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
                ))}
            </div>
          </div>

          <div className="ml-12 min-w-full">
            <p
              className={`text-[32px] text-black  mt-20 ${
                hideNavBar ? "ml-[220px]" : "ml-[260px]"
              }`}
            >
              Joined Parties
            </p>
            <div className={`-mt-[100px] ${hideNavBar ? "ml-[190px]" : ""}`}>
              {joinedParties && (
                <ListParty
                  parties={joinedParties}
                  hideNavBar={hideNavBar}
                  viewPartyDetails={viewPartyDetails}
                />
              )}
              {!joinedParties ||
                (joinedParties.length === 0 && (
                  <p
                    className={`text-black  mt-12 text-[18px]  ${
                      hideNavBar ? "ml-[350px]" : "ml-[600px]"
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
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPartyPage;
