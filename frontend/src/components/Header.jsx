import { FaSearch } from "react-icons/fa";

function Header({
  handleSearchParty,
  searchValue,
  setSearchValue,
  hideNavBar,
}) {
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleSearchParty(searchValue);
      setSearchValue("");
    }
  };
  return (
    <>
      <div className="h-[88px] w-full fixed pl-[250px] backdrop-blur-2xl z-10 max-[769px]:pl-0 max-[426px]:pl-0 ml-[120px]">
        
        <div
          className={`${
            hideNavBar ? "-ml-[50px]" : ""
          } w-full h-[88px] flex justify-between items-center `}
        >

          <div className="flex mr-20">
            <div
              className="flex items-center w-[600px]  max-[426px]:w-[280px] max-[376px]:w-[180px] 
            bg-[#EDE7F6] rounded-full px-4 py-2 "
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

          <div className={` pr-5 cursor-pointer ${hideNavBar ? "mr-[30px]" : "mr-[80px]"}`}>
            <div class="avatar">
              <div class="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring-2 ring-offset-2">
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
