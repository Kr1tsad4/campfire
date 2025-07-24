import ListParty from "../components/ListParty";
import { useParty } from "../hooks/useParty";
import { useNavigationBar } from "../contexts/NavigationContext";
import { useEffect, useState } from "react";
import PartyDetailsPopup from "../components/PartyDetailsPopup";
import Layout from "../components/Layout";
import { useTags } from "../hooks/useTags";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

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
  const [startIndex, setStartIndex] = useState(0);
  const [tagsPerPage, setTagsPerPage] = useState(6); 

  const updateTagsPerPage = () => {
    const width = window.innerWidth;

    if (width >= 1280) {
      setTagsPerPage(8);
    } else if (width >= 1024) {
      setTagsPerPage(6);
    } else if (width >= 768) {
      setTagsPerPage(4);
    } else {
      setTagsPerPage(2);
    }
    setStartIndex(0);
  };

  useEffect(() => {
    updateTagsPerPage();

    window.addEventListener("resize", updateTagsPerPage);
    return () => window.removeEventListener("resize", updateTagsPerPage);
  }, []);
  const handleNext = () => {
    if (startIndex + tagsPerPage < baseTags.length) {
      setStartIndex(startIndex + tagsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - tagsPerPage >= 0) {
      setStartIndex(startIndex - tagsPerPage);
    }
  };

  const visibleTags = baseTags.slice(startIndex, startIndex + tagsPerPage);

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
          <div
            className={`flex flex-row flex-wrap mt-20 gap-2 mb-20 fixed top-0 left-0 right-0 z-10 justify-center overflow-scroll h-auto`}
          >
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className={`px-2 py-1 rounded text-black ${
                startIndex === 0 ? "opacity-50 hidden" : ""
              }`}
            >
              <FaArrowLeft size={20} />
            </button>
            <div className="flex gap-2 overflow-hidden">
              {visibleTags.map((tag, index) => (
                <button
                  key={index}
                  className={`border px-3 py-1 rounded-2xl cursor-pointer ${
                    selectedTags.includes(tag.name)
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handleClickTagFilter(tag.name)}
                >
                  {tag.name}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={startIndex + tagsPerPage >= baseTags.length}
              className={`px-2 py-1 rounded text-black cursor-pointer ${
                startIndex + tagsPerPage >= baseTags.length
                  ? "opacity-50 hidden "
                  : ""
              }`}
            >
              <FaArrowRight size={20} />
            </button>
          </div>
          <div className="mt-20">
            <ListParty
              parties={parties}
              hideNavBar={hideNavBar}
              joinParty={joinParty}
              loginUser={loginUser}
              viewPartyDetails={viewPartyDetails}
              openPartyDetails={openPartyDetails}
            />
          </div>
        </Layout>
      </div>

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
    </>
  );
}

export default Homepage;
