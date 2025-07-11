import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AuthPage from "./pages/AuthPage";
import MyPartyPage from "./pages/MyPartyPage";
import PartyDetailsPage from "./pages/PartyDetailsPage";
import SchedulePage from "./pages/SchedulePage";
import CreatePartyPage from "./pages/CreatePartyPage";
import InvitationsPage from "./pages/InvitationsPage";
import SettingsPage from "./pages/SettingsPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/party/:id" element={<PartyDetailsPage />} />
        <Route path="/my-party" element={<MyPartyPage />} />
        <Route path="/create-party" element={<CreatePartyPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/invitations" element={<InvitationsPage />} />
        <Route path="/settings" element={<SettingsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
