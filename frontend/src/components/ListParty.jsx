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
        className={`flex flex-col gap-3 pt-[88px] mt-6 mb-6 ${
          hideNavBar ? "xl:pl-[380px] lg:pl-[620px]" : ""
        }`}
      >
        {parties.map((party, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              hideNavBar
                ? "w-[calc(95vw)]"
                : "w-[calc(95vw)] lg:w-[calc(100vw-350px)]"
            }
              border border-gray-200 rounded-2xl relative
              p-3 cursor-pointer text-black hover:bg-gray-100 transition-all`}
            onClick={() => openDetailsPopup(party._id)}
          >
            <div
              className="self-center shrink-0 w-[96px] h-[96px]
            md:w-[180px] md:h-[180px] 
            lg:w-[180px] lg:h-[180px] 
            xl:w-[180px] xl:h-[180px] bg-[#FEF3C7] rounded-2xl"
            ></div>
            <div className="flex flex-col p-2 md:pl-15 pt-1">
              <p className="mt-2 font-bold xl:text-[28px] lg:text-[24px] text-[22px]">{party.name}</p>
              <p className="pb-2 mb-2 text-gray-500 line-clamp-4 overflow-hidden w-auto break-words xl:text-[18px] text-[14px]
              max-h-[5.2rem] xl:max-h-[7rem]
              ">{party.description}</p>
              <p>Date : {party.date}</p>
              <p>
                Time : {party.startTime} - {party.endTime}{" "}
              </p>
              <p>Members : {party.members.length} </p>
              <div className="flex gap-2 pt-2  mt-1">
                <div key={index} className="flex gap-2 max-[376px]:flex-wrap">
                  {party.tags?.map((tag, index) => (
                    <div key={index}>
                      <p className="bg-blue-200 px-2 rounded-2xl">{tag.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {isMyParty && (
              <div
                className="flex items-center ml-[350px] gap-2 w-[50px] absolute right-30 top-16 max-[1025px]:flex-col 
              max-[1025px]:right-10 max-[1025px]:top-10 max-[426px]:hidden"
              >
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
