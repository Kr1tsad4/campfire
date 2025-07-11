import { FaBars, FaHome } from "react-icons/fa";

function NavigationMenu({ toggleSideNavBar, hideNavBar }) {
  return (
    <>
      <div
        className="w-[250px] min-h-screen bg-[#c86e5a] fixed z-20 
          max-[1025px]:min-h-full max-[1025px]:w-[200px] max-[769px]:hidden max-[426px]:hidden"
      >
        <div className="flex gap-4 px-5">
          <div className="pt-7 ">
            <button
              className="cursor-pointer"
              onClick={() => toggleSideNavBar(hideNavBar)}
            >
              <FaBars size={25} />
            </button>
          </div>
          <p className="font-bold text-[22px] pt-6">MAAM PARTY</p>
        </div>
        <div>
          <div className="mt-10">
            <button className="cursor-pointer flex gap-4 hover:bg-blue-400 transition-all w-full px-5 py-3">
              <FaHome size={25} />
              <h1 className="font-bold text-[22px] -mt-1">Home</h1>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavigationMenu;
