import { useNavigate } from "react-router-dom";

function ListParty({
  parties,
  hideNavBar,
  viewPartyDetails,
  openPartyDetails,
  isMyParty = false,
  deleteMyParty,
  userId,
}) {
  const navigator = useNavigate();

  if (!parties) return <div>Loading...</div>;
  const openDetailsPopup = (partyId) => {
    openPartyDetails = true;
    viewPartyDetails(partyId);
  };
  return (
    <>
      <div
        className={`flex flex-col gap-3 pt-[88px] mt-6 mb-6 transition-all duration-300 ${
          hideNavBar ? "pl-5" : "pl-[380px]"
        } max-[769px]:pl-0`}
      >
        {parties.map((party, index) => (
          <div
            key={index}
            className={`flex w-[1120px] max-[1441px]:w-[1000px] max-[1025px]:w-[750px] max-[769px]:w-[700px] max-[376px]:w-[300px]  
              max-[426px]:w-[400px] max-[426px]:h-[180px] border-1 border-gray-200 h-[200px] rounded-2xl relative
              p-3 cursor-pointer text-black hover:bg-gray-100 transition-all`}
            onClick={() => openDetailsPopup(party._id)}
          >
            <div className="h-full w-[300px] max-[426px]:w-[150px] max-[426px]:h-[150px] max-[376px]:pt-[20px] max-[376px]:w-[150px] bg-[#FEF3C7] rounded-2xl"></div>
            <div className="p-2 pl-15 pt-1 max-[321px]:-mt-2 max-[769px]:pt-2 max-[426px]:text-[10px] max-[376px]:text-[10px] max-[426px]:pt-2 max-[376px]:pt-2 max-[376px]:pl-10">
              <p className="font-bold text-[17px]">{party.name}</p>
              <p className="pb-2 text-gray-500">{party.description}</p>
              <p>Date : {party.date}</p>
              <p>
                Time : {party.startTime} - {party.endTime}{" "}
              </p>

              <div className="flex gap-2 pt-2  mt-5">
                <div key={index} className="flex gap-2 max-[376px]:flex-wrap">
                  {party.tagNames?.map((tagName, index) => (
                    <div key={index}>
                      <p className="bg-blue-200 px-2 rounded-2xl">{tagName}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {isMyParty && (
              <div className="flex items-center ml-[350px] gap-2 w-[50px] absolute right-30 top-16 max-[1025px]:flex-col 
              max-[1025px]:right-10 max-[1025px]:top-10 max-[426px]:hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator(`/my-party/update-party/${party._id}`);
                  }}
                  className="bg-[#f3bfa3] rounded-[5px]  mt-2 px-3 py-2 font-[700] cursor-pointer hover:bg-[#f0b291]"
                >
                  Update
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMyParty(party._id, userId);
                  }}
                  className="bg-red-300 rounded-[5px] mt-2 px-3 py-2 font-[700] cursor-pointer hover:bg-[#f0b291]"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ListParty;
