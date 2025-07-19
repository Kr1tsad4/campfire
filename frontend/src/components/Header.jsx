import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";

function Header({
  handleSearchParty,
  searchValue,
  setSearchValue,
  hideNavBar,
  hideSearchBar,
  loginUser,
}) {
  const navigator = useNavigate();
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleSearchParty(searchValue, loginUser);
    }
  };
  return (
    <>
      <div
        className={`h-[88px]  top-0 left-0 w-[100vw] fixed box-border backdrop-blur-2xl z-10  
        `}
      >
        <p className="text-black -ml-28 pt-5 font-bold text-[23px]">MAAM PARTY</p>
        <div
          className={`${
            hideNavBar ? "-ml-[50px]" : "ml-[80px]"
          } w-full h-[20px] flex  items-center ${
            hideSearchBar ? "justify-end ml-6" : "justify-between"
          }`}
        >
          <div className={`flex mr-20 ${hideSearchBar ? "hidden" : ""}`}>
            <div
              className={`flex items-center w-[200px] md:w-[250px] lg:w-[500px] xl:w-[800px]
            bg-[#EDE7F6] rounded-full px-4 py-2 fixed top-[6vw] md:top-[2vw] lg:top-[1.5vw] right-[22vw] md:right-[16vw] z-50`}
            >
              <input
                type="text"
                placeholder="search party"
                className="flex-1 bg-transparent outline-none text-gray-800"
                onKeyUp={handleKeyUp}
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
              <FaSearch
                className="text-gray-600 cursor-pointer"
                onClick={() => handleSearchParty(searchValue, loginUser)}
              />
            </div>
          </div>

          <div
            className={` pr-5 cursor-pointer fixed top-[6vw] right-[0vw] md:top-[1.75vw] md:right-[4vw] z-50 -mr-30 backdrop-blur-md`}
          >
            <div
              className="avatar "
              onClick={() => navigator(`/profile/${loginUser?._id}`)}
            >
              <Avatar sx={{ bgcolor: deepOrange[500] }}>
                {" "}
                {loginUser?.penName?.charAt(0).toUpperCase()}
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
