import { useNavigationBar } from "../contexts/NavigationContext";
import PartyForm from "../components/Form/PartyForm";
import { useParty } from "../hooks/useParty";
import { useTags } from "../hooks/useTags";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

function CreateUpdatePartyPage({ type, loginUser }) {
  const { hideNavBar } = useNavigationBar();
  const { id } = useParams();

  const {
    party,
    fetchPartyById,
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
    if (id) {
      fetchPartyById(id);
    }
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Layout loginUser={loginUser} hideSearchBar={true}>
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
      </Layout>
    </div>
  );
}

export default CreateUpdatePartyPage;
