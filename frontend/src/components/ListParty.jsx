function ListParty({ parties }) {
  if (!parties) return <div>Loading...</div>;

  return (
    <>
      <div>
        {parties.map((party, index) => (
          <div key={index}>
            {party.name}
          </div>
        ))}
      </div>
    </>
  );
}

export default ListParty;
