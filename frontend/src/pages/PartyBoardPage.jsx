import { useNavigationBar } from "../hooks/useNavigationBar";
import Layout from "../components/Layout";
function PartyBoardPage({loginUser}) {
  const { hideNavBar, toggleSideNavBar } = useNavigationBar();

  return (
    <>
      <div>
        <Layout hideSearchBar={true}></Layout>
      </div>
    </>
  );
}

export default PartyBoardPage;
