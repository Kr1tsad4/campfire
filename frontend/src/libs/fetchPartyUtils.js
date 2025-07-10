const getParties = async (url) => {
  try {
    const data = await fetch(`${url}/party`);
    const parties = data.json();
    return parties;
  } catch (e) {
    throw new Error("can not get parties");
  }
};

const getPartyById = async (url, id) => {
  try {
    const data = await fetch(`${url}/party/${id}`);
    const party = data.json();
    return party;
  } catch (e) {
    if (data.status === 404) return undefined;
    throw new Error("can not get party");
  }
};

const createParty = async (url, newParty) => {
  try {
    const res = await fetch(`${url}/party`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...newParty,
      }),
    });
    const createdParty = await res.json();
    return createdParty;
  } catch (e) {
    throw new Error("can not create party");
  }
};

const updateParty = async (url, id, updateParty) => {
  try {
    const res = await fetch(`${url}/party/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...updateParty,
      }),
    });
    const updatedParty = await res.json();
    return updatedParty;
  } catch (e) {
    throw new Error("can not update party");
  }
};

const deleteParty = async (url, id) => {
  try {
    const res = await fetch(`${url}/party/${id}`, {
      method: "DELETE",
    });
    return res.status;
  } catch (e) {
    throw new Error("can not delete party");
  }
};

export { getParties, getPartyById, createParty, updateParty, deleteParty };
