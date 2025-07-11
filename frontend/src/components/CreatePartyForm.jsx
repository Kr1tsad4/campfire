import InputComponent from "./InputComponent";
import MyCalender from "./MyCalender";
import TimePicker from "./TimePicker";

function CreatePartyForm({
  hideNavBar,
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
  tags,
  setTags,
  createNewParty,
}) {
  return (
    <div
      className={`flex flex-col text-black gap-3 pt-[88px] mt-6 mb-6 transition-all duration-300 ${
        hideNavBar ? "pl-5" : "pl-[250px]"
      } max-[769px]:pl-0`}
    >
      <div className="flex justify-center -ml-[300px] mb-5 ">
        <h1 className="text-[30px] font-bold">Create your party</h1>
      </div>
      <div className="flex flex-col items-center">
        <label className="-ml-[410px] mb-2">
          Party Name {""}
          <span className="text-red-500">*</span>
        </label>
        <InputComponent
          id="party-name"
          placeholder="Enter party name"
          width="500"
          value={partyName}
          handleInput={(e) => setPartyName(e)}
        />
        <label className="-ml-[420px] mb-2">Description</label>

        <InputComponent
          id="description"
          placeholder="Enter party description"
          width="500"
          value={description}
          handleInput={(e) => setDescription(e)}
        />
        <label className="-ml-[420px] mb-2">
          Pick a date {""}
          <span className="text-red-500">*</span>
        </label>

        <MyCalender
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div className="flex w-[500px] gap-5">
          <TimePicker
            label="Start Time"
            value={startTime}
            onChange={setStartTime}
          />
          <TimePicker label="End Time" value={endTime} onChange={setEndTime} />
        </div>
        <label className="-ml-[390px] mb-2">Select party tags</label>

        <InputComponent
          id="tags"
          placeholder="Tags"
          width="500"
          value={tags}
          handleInput={(e) => setTags(e)}
        />
        <div className="ml-[420px] mt-5">
          <button
            onClick={() => createNewParty()}
            className="bg-[#f3bfa3] rounded-[5px] w-fit mt-2 px-4 py-2 font-[700] cursor-pointer hover:bg-[#f0b291] "
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePartyForm;
