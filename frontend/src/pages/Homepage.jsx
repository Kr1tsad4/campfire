import Header from "../components/Header";
import NavigationMenu from "../components/NavigationMenu";
import ListParty from "../components/ListParty";
import { API_URL } from "../libs/api";
import { getParties } from "../libs/fetchPartyUtils";
import { useEffect, useState } from "react";
function Homepage() {
  const [parties, setParties] = useState(null);
  const fetchParties = async () => {
    const res = await getParties(API_URL);
    if (res) {
      setParties(res);
    }
  };

  useEffect(() => {
    fetchParties();
    console.log(parties);
  }, []);
  return (
    <>
      <div className="flex">
        <div>
          <NavigationMenu />
        </div>
        <div className="flex flex-col">
          <Header />
          <ListParty parties={parties}/>
        </div>
      </div>
    </>
  );
}

export default Homepage;
