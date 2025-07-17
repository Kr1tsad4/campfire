import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
      handleSearchParty(searchValue);
      setSearchValue("");
    }
  };
  return (
    <>
      <div
        className={`h-[88px]  top-0 w-full fixed ml-[120px] pl-[250px] backdrop-blur-2xl z-10 
         max-[1025px]:right-0  max-[769px]:pl-0 max-[321px]:pl-12  max-[376px]:pl-10 max-[426px]:ml-35 max-[769px]:ml-40 
          
        `}
      >
        <div
          className={`${
            hideNavBar ? "-ml-[50px]" : ""
          } w-full h-[88px] flex  items-center ${
            hideSearchBar  ? "justify-end ml-6" : "justify-between"
          }`}
        >
          <div className={`flex mr-20 ${hideSearchBar ? "hidden" : ""}`}>
            <div
              className={`flex items-center w-[600px]  max-[426px]:w-[280px] max-[376px]:w-[180px] 
            bg-[#EDE7F6] rounded-full px-4 py-2 max-[426px]:ml-15 max-[426px]:-mr-15 ${
              hideNavBar
                ? "max-[769px]:w-[500px] max-[769px]:ml-42 max-[1025px]:-ml-5 max-[426px]:ml-28 max-[376px]:ml-20 max-[376px]:-mr-3  max-[321px]:ml-15 max-[321px]:-mr-15  "
                : "max-[1025px]:-ml-5"
            }`}
            >
              <input
                type="text"
                placeholder="search party name"
                className="flex-1 bg-transparent outline-none text-gray-800 pl-2 "
                onKeyUp={handleKeyUp}
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
              <FaSearch className="text-gray-600 ml-3 cursor-pointer" />
            </div>
          </div>

          <div
            className={` pr-5 cursor-pointer ${
              hideNavBar && !hideSearchBar ? "mr-[30px]" : "mr-[80px]"
            }  ${hideSearchBar && hideNavBar ? "max-[769px]:mr-5 mr-25":"mr-25"}`}
          >
            <div
              className="avatar"
              onClick={() => navigator(`/profile/${loginUser?._id}`)}
            >
              <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring-2 ring-offset-2">
                <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
