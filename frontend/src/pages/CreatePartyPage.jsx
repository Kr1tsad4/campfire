import { useNavigationBar } from "../hooks/useNavigationBar";
import SideNavContainer from "../components/SideNavContainer";
import Header from "../components/Header";
import CreatePartyForm from "../components/CreatePartyForm";
import { useParty } from "../hooks/useParty";
import { useTags } from "../hooks/useTags";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
function CreatePartyPage() {
  const { hideNavBar, toggleSideNavBar } = useNavigationBar();
  const { loginUser, getLoginUser } = useUser();
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
    createNewParty,
  } = useParty();
  const { baseTags, selectedTags, fetchBaseTags, handleSelectedTag } =
    useTags();

  useEffect(() => {
    getLoginUser();
  }, []);
  return (
    <div className="flex bg-[#fcfff7ff] min-h-screen">
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
          baseTags={baseTags}
          createNewParty={() =>
            createNewParty(
              {
                partyName,
                description,
                selectedDate,
                startTime,
                endTime,
                selectedTags,
              },
              loginUser._id
            )
          }
          fetchBaseTags={fetchBaseTags}
          handleSelectedTag={handleSelectedTag}
        />
      </div>
    </div>
  );
}

export default CreatePartyPage;
