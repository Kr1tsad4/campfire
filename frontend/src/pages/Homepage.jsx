import ListParty from "../components/ListParty";
import { useParty } from "../hooks/useParty";
import { useNavigationBar } from "../contexts/NavigationContext";
import { useEffect, useState } from "react";
import PartyDetailsPopup from "../components/PartyDetailsPopup";
import Layout from "../components/Layout";
import { useTags } from "../hooks/useTags";
function Homepage({ openPartyDetails, loginUser }) {
  const {
    parties,
    fetchParties,
    joinParty,
    viewPartyDetails,
    handleSearchParty,
    searchValue,
    setSearchValue,
    selectedTags,
    setSelectedTags,
  } = useParty();
  const { fetchBaseTags, baseTags } = useTags();
  const { hideNavBar } = useNavigationBar();
  
  useEffect(() => {
    fetchParties(loginUser, searchValue, selectedTags);
    fetchBaseTags();
  }, [loginUser, searchValue, selectedTags]);

  const handleClickTagFilter = (tagName) => {
    setSelectedTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((tag) => tag !== tagName)
        : [...prev, tagName]
    );
  };

  return (
    <>
      <div>
        <Layout
          loginUser={loginUser}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearchParty={handleSearchParty}
        >
          <div className="flex flex-row mt-25 -mb-20 gap-2">
            {baseTags.map((tag, index) => (
              <div key={index}>
                <button
                  className={`border-1 px-3 py-1 rounded-2xl cursor-pointer ${
                    selectedTags.includes(tag.name)
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handleClickTagFilter(tag.name)}
                >
                  {tag.name}
                </button>
              </div>
            ))}
          </div>
          <ListParty
            parties={parties}
            hideNavBar={hideNavBar}
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
