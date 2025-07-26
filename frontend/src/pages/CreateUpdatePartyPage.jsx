import { useState, useEffect } from "react";
import PartyForm from "@/components/PartyForm";
import { useParams } from "react-router-dom";
import { getMyPartyById, createParty, updateParty, fetchTags } from "@/api/party";

function CreateUpdatePartyPage({ loginUser }) {
  const { partyId } = useParams();
  const type = partyId ? "update" : "create";
  const [isLoading, setIsLoading] = useState(false);
  const [partyName, setPartyName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [baseTags, setBaseTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [myParty, setMyParty] = useState(null);

  useEffect(() => {
    fetchBaseTags();
    if (type === "update") {
      getMyPartyById(partyId).then((party) => setMyParty(party));
    }
  }, []);

  const fetchBaseTags = async () => {
    const tags = await fetchTags();
    setBaseTags(tags);
  };

  const handleSelectedTag = (index) => {
    const newTags = [...baseTags];
    newTags[index].selected = !newTags[index].selected;
    setBaseTags(newTags);
    const selected = newTags.filter((tag) => tag.selected);
    setSelectedTags(selected);
  };

  const enableCreateButton = partyName.trim() !== "" && selectedDate && startTime;

  const createNewParty = async () => {
    setIsLoading(true);
    try {
      const payload = {
        name: partyName,
        description,
        date: selectedDate,
        startTime,
        endTime,
        tags: baseTags.filter((tag) => tag.selected).map((tag) => tag._id),
        createdBy: loginUser?._id,
      };
      await createParty(payload);
    } catch (error) {
      console.error("Create error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMyParty = async (updatedData, userId, partyId) => {
    setIsLoading(true);
    try {
      await updateParty(updatedData, userId, partyId);
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/30 backdrop-blur-sm">
          <p className="text-gray-800 text-2xl font-semibold animate-pulse">
            {type === "create" ? "Creating your party..." : "Updating party..."}
          </p>
        </div>
      )}

      <PartyForm
        type={type}
        loginUser={loginUser}
        myParty={myParty}
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
        handleSelectedTag={handleSelectedTag}
        createNewParty={createNewParty}
        enableCreateButton={enableCreateButton}
        fetchBaseTags={fetchBaseTags}
        updateMyParty={updateMyParty}
        hideNavBar={true}
      />
    </div>
  );
}

export default CreateUpdatePartyPage;
