import { useEffect, useRef } from "react";
import InputComponent from "./InputComponent.jsx";
import Calender from "./Calender.jsx";
import TimePicker from "./TimePicker.jsx";
import { useNavigate } from "react-router-dom";

function PartyForm({
  type,
  hideNavBar,
  loginUser,
  myParty,
  partyName,
  setPartyName,
  description,
  setDescription,
  selectedDate,
  setSelectedDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  baseTags,
  setBaseTags,
  setSelectedTags,
  handleSelectedTag,
  createNewParty,
  enableCreateButton,
  fetchBaseTags,
  updateMyParty,
}) {
  const navigator = useNavigate();
  const isInitialized = useRef(false);

  useEffect(() => {
    fetchBaseTags();
  }, []);

  useEffect(() => {
    if (
      type === "update" &&
      myParty &&
      baseTags.length > 0 &&
      !isInitialized.current
    ) {
      isInitialized.current = true;
      setPartyName(myParty.name || "");
      setDescription(myParty.description || "");
      setSelectedDate(myParty.date || "");
      setStartTime(myParty.startTime || "");
      setEndTime(myParty.endTime || "");

      const updatedTags = baseTags.map((tag) => ({
        ...tag,
        selected: myParty.tags.some((t) => t._id === tag._id),
      }));
      setBaseTags(updatedTags);
      setSelectedTags(myParty.tags);
    }
  }, [myParty, type, baseTags]);

  return (
    <div
      // transition-all duration-300
      className={`flex flex-col text-black md:shadow-xl gap-3 mt-[88px] mb-6 bg-[#ffffff] p-4 max-[600px]:p-2 border-2 rounded-xl ${
        hideNavBar
          ? " max-[426px]:ml-0 ml-10 sm:ml-25 lg:ml-250 xl:ml-180"
          : " xl:ml-75 lg:ml-20 sm:ml-25 ml-10 "
      } `}
    >
      <div className="flex justify-start mb-5">
        {type === "create" && (
          <h1 className="text-[30px] font-bold">Create your party</h1>
        )}
        {type === "update" && (
          <h1 className="text-[30px] font-bold">Update party</h1>
        )}
      </div>
      <div className="flex flex-col lg:items-center">
        <label className="-ml-[410px] mb-2 max-[769px]:ml-0">
          Party Name {""}
          <span className="text-red-500">*</span>
        </label>
        <div className="max-[600px]:self-start">
          <InputComponent
            id="party-name"
            type="text"
            placeholder="Enter party name"
            width="500"
            value={partyName}
            handleInput={(e) => setPartyName(e)}
            maxLength={50}
          />
        </div>

        <label className="-ml-[420px] mb-2 max-[769px]:ml-0">Description</label>
        <div className="max-[600px]:self-start">
          <InputComponent
            id="description"
            type="text"
            placeholder="Enter party description"
            width="500"
            value={description}
            handleInput={(e) => setDescription(e)}
            maxLength={200}
          />
        </div>
        <label className="-ml-[420px] mb-2  max-[769px]:ml-0">
          Pick a date {""}
          <span className="text-red-500">*</span>
        </label>
        <div className="max-[600px]:self-start">
          <Calender
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <div className="flex w-[500px] max-[600px]:self-start max-[600px]:ml-1 gap-5 max-[600px]:flex-col max-[600px]:w-[68vw] max-[321px]:ml-2">
          <TimePicker
            label="Start Time"
            selectedTime={startTime}
            setSelectedTime={setStartTime}
          />
          <TimePicker
            label="End Time"
            selectedTime={endTime}
            setSelectedTime={setEndTime}
          />
        </div>
        <label className="-ml-[390px] mb-2 max-[769px]:ml-0">Select party tags</label>

        <div className="flex self-start flex-wrap gap-3 max-[426px]:w-[90vw] lg:w-[40vw] max-[769px]:w-[70vw] w-[80vw] pl-6">
          {baseTags.map((tag, index) => {
            return (
              <div
                key={index}
                className={`border border-[#041c0cff] rounded-[10px] px-2 py-[2px] text-[16px] cursor-pointer select-none ${
                  baseTags[index].selected ? "bg-[#beffd4ff]" : "bg-transparent"
                }`}
                onClick={() => handleSelectedTag(index)}
              >
                {tag.name}
              </div>
            );
          })}
        </div>
        <div
          className={`${
            type === "create"
              ? "ml-auto"
              : type === "update"
              ? "ml-auto"
              : ""
          } mt-5`}
        >
          {type === "create" && (
            <button
              onClick={() => createNewParty()}
              className={` ${
                enableCreateButton
                  ? "bg-[#beffd4ff] cursor-pointer hover:bg-[#7ad89aff]"
                  : "bg-[#ccc7c4]"
              } rounded-[5px] w-fit mt-2 px-4 py-2 font-[700] `}
              disabled={!enableCreateButton}
            >
              Create
            </button>
          )}
          {type === "update" && (
            <div className="flex gap-2">
              <button
                onClick={() => navigator("/my-party")}
                className={`
            bg-[#f3bfa3] cursor-pointer hover:bg-[#f0b291]
             rounded-[5px] w-fit mt-2 px-4 py-2 font-[700] `}
              >
                cancel
              </button>

              <button
                onClick={() =>
                  updateMyParty(
                    {
                      name: partyName,
                      description,
                      date: selectedDate,
                      startTime,
                      endTime,
                      tags: baseTags
                        .filter((tag) => tag.selected)
                        .map((tag) => tag._id),
                    },
                    loginUser?._id,
                    myParty._id
                  )
                }
                className="bg-[#beffd4ff] cursor-pointer hover:bg-[#7ad89aff]
             rounded-[5px] w-fit mt-2 px-4 py-2 font-[700]"
              >
                Update
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PartyForm;
