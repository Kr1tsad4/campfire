import Header from "../components/Header";
import NavigationMenu from "../components/NavigationMenu";
import ListParty from "../components/ListParty";
import { useParty } from "../hooks/useParty";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

function Homepage() {
  const {
    parties,
    fetchParties,
    handleSearchParty,
    searchValue,
    setSearchValue,
  } = useParty();
  const [hideNavBar, setHideNavBar] = useState(false);

  const toggleSideNavBar = (hideNavBar) => {
    setHideNavBar(!hideNavBar);
  };
  useEffect(() => {
    fetchParties();
  }, []);
  return (
    <>
      <div className="flex bg-white min-h-screen w-auto">
        {!hideNavBar && (
          <div>
            <NavigationMenu
              toggleSideNavBar={toggleSideNavBar}
              hideNavBar={hideNavBar}
            />
          </div>
        )}
        {hideNavBar && (
          <div
            className={`${hideNavBar ? "block" : ""} pt-6  pl-6  z-50 fixed`}
          >
            <div className="flex gap-4 w-[200px]">
              <button
                className="cursor-pointer"
                onClick={() => toggleSideNavBar(hideNavBar)}
              >
                <FaBars size={25} color="black" />
              </button>
              <p className="font-bold text-[22px] text-black">MAAM PARTY</p>
            </div>
          </div>
        )}

        <div className={`flex flex-col w-full items-center`}>
          <Header
            handleSearchParty={handleSearchParty}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            hideNavBar={hideNavBar}
          />
          <div>
            <ListParty parties={parties} hideNavBar={hideNavBar} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
