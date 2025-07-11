import { useNavigationBar } from "../hooks/useNavigationBar";
import SideNavContainer from "../components/SideNavContainer";
import Header from "../components/Header";
import CreatePartyForm from "../components/CreatePartyForm";
import { useParty } from "../hooks/useParty";

function CreatePartyPage() {
  const { hideNavBar, toggleSideNavBar } = useNavigationBar();
  const {
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
  } = useParty();

  return (
    <div className="flex bg-[#fff7f8] min-h-screen">
      <SideNavContainer
        hideNavBar={hideNavBar}
        toggleSideNavBar={toggleSideNavBar}
      />
      <div className="min-w-full">
        <div className="-ml-[75px]">
          <Header hideSearchBar={true} hideNavBar={hideNavBar} />
        </div>

        <CreatePartyForm
          hideNavBar={hideNavBar}
          partyName={partyName}
          setPartyName={setPartyName}
          description={description}
          setDescription={setDescription}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          tags={tags}
          setTags={setTags}
          createNewParty={createNewParty}
        />
      </div>
    </div>
  );
}

export default CreatePartyPage;
