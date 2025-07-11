function ListParty({ parties, hideNavBar }) {
  if (!parties) return <div>Loading...</div>;

  return (
    <>
      <div
        className={`flex flex-col gap-3 pt-[88px] mt-6 mb-6 transition-all duration-300 ${
          hideNavBar ? "pl-5" : "pl-[250px]"
        } max-[769px]:pl-0`}
      >
        {" "}
        {parties.map((party, index) => (
          <div
            key={index}
            className={` flex w-[1130px] max-[1441px]:w-[1100px] max-[1025px]:w-[780px] max-[769px]:w-[700px] max-[376px]:w-[300px]  max-[426px]:w-[400px] max-[426px]:h-[180px] border-1
             border-gray-200 h-[200px] rounded-2xl p-3 cursor-pointer text-black hover:bg-gray-100 transition-all`}
          >
            <div className="h-full w-[300px] max-[426px]:w-[150px] max-[426px]:h-[150px] max-[376px]:pt-[20px] max-[376px]:w-[150px] bg-[#FEF3C7] rounded-2xl"></div>
            <div className="p-2 pl-15 pt-3 max-[769px]:pt-2 max-[426px]:text-[10px] max-[376px]:text-[10px] max-[426px]:pt-6 max-[376px]:pt-2 max-[376px]:pl-10">
              <p className="font-bold text-[17px]">{party.name}</p>
              <p className="pb-2 text-gray-500">{party.description}</p>
              <p>Date : {party.date}</p>
              <p>
                Time : {party.startTime} - {party.endTime}{" "}
              </p>
              <div className="flex gap-2 pt-5  ">
                <div key={index} className="flex gap-2 max-[376px]:flex-wrap">
                  {party.tagNames?.map((tagName, index) => (
                    <div key={index}>
                      <p className="bg-blue-200 px-2 rounded-2xl">{tagName}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListParty;
