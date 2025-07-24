const getAllInvitation = async (url) => {
  try {
    const data = await fetch(`${url}/invitations`);
    const invitations = data.json();
    return invitations;
  } catch (e) {
    throw new Error(`Can not get invitations`);
  }
};
const getUserInvitation = async (url, id) => {
  try {
    const data = await fetch(`${url}/invitations/user/${id}`);
    const invitations = await data.json();
    return invitations;
  } catch (e) {
    throw new Error(`Can not get invitations`);
  }
};
const getInvitationById = async (url, id) => {
  try {
    const data = await fetch(`${url}/invitations/obj/${id}`);
    const invitations = await data.json();
    return invitations;
  } catch (e) {
    throw new Error(`Can not get invitations`);
  }
};
const createInvitation = async (url, newInvitation) => {
  try {
    const data = await fetch(`${url}/invitations`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...newInvitation,
      }),
    });
    const invitations = await data.json();
    return invitations;
  } catch (e) {
    throw new Error(`Can not create invitations`);
  }
};
const deleteInvitation = async (url, id) => {
  try {
    const data = await fetch(`${url}/invitations/${id}`, {
      method: "DELETE",
    });
    const invitations = await data.json();
    return invitations;
  } catch (e) {
    throw new Error(`Can not create invitations`);
  }
};

export {
  getAllInvitation,
  getUserInvitation,
  getInvitationById,
  createInvitation,
  deleteInvitation,
};
