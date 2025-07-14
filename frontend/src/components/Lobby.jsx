import Chat from "./Chat";
function Lobby({ party, loginUser }) {
  return (
    <>
      <div>
        <h1 className="text-black font-bold text-4xl">Welcome to {party?.name} !</h1>
        <div className="mt-20">
          <Chat partyId={party?._id} user={loginUser} />
        </div>
      </div>
    </>
  );
}

export default Lobby;
