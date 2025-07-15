import { useNavigationBar } from "../hooks/useNavigationBar";
import SideNavContainer from "../components/SideNavContainer";
import Header from "../components/Header";
import PartyForm from "../components/Form/PartyForm";
import { useParty } from "../hooks/useParty";
import { useTags } from "../hooks/useTags";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CreateUpdatePartyPage({ type }) {
  const { hideNavBar, toggleSideNavBar } = useNavigationBar();
  const { loginUser, getLoginUser } = useUser();
  const { id } = useParams();

  const {
    party,
    getPartyTagsAndMembersName,
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
    updateMyParty,
  } = useParty();

  const {
    baseTags,
    selectedTags,
    fetchBaseTags,
    handleSelectedTag,
    setBaseTags,
    setSelectedTags,
  } = useTags();

  const [enableCreateButton, setEnableCreateButton] = useState(false);

  useEffect(() => {
    if (partyName.trim() && selectedDate && startTime) {
      setEnableCreateButton(true);
    } else {
      setEnableCreateButton(false);
    }
  }, [partyName, selectedDate, startTime]);

  useEffect(() => {
    getLoginUser();
  }, []);

  useEffect(() => {
    if (id) {
      getPartyTagsAndMembersName(id);
    }
  }, []);

  return (
    <div className="flex bg-[#fff7f8] min-h-screen">
      <SideNavContainer
        hideNavBar={hideNavBar}
        toggleSideNavBar={toggleSideNavBar}
      />
      <div className="min-w-full">
        <div className="-ml-[75px]">
          <Header
            hideSearchBar={true}
            hideNavBar={hideNavBar}
            loginUser={loginUser}
          />
        </div>
        {type === "create" && (
          <PartyForm
            type={type}
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
            enableCreateButton={enableCreateButton}
            myParty={null}
          />
        )}

        {type === "update" && (
          <PartyForm
            type={type}
            hideNavBar={hideNavBar}
            loginUser={loginUser}
            myParty={party}
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
            setBaseTags={setBaseTags}
            setSelectedTags={setSelectedTags}
            fetchBaseTags={fetchBaseTags}
            handleSelectedTag={handleSelectedTag}
            updateMyParty={() =>
              updateMyParty(
                {
                  name: partyName,
                  description,
                  date: selectedDate,
                  startTime,
                  endTime,
                  tags: selectedTags,
                },
                loginUser?._id,
                id
              )
            }
          />
        )}
      </div>
    </div>
  );
}

export default CreateUpdatePartyPage;
