import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AuthPage from "./pages/AuthPage";
import MyPartyPage from "./pages/MyPartyPage";
import SchedulePage from "./pages/SchedulePage";
import InvitationsPage from "./pages/InvitationsPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import CreateUpdatePartyPage from "./pages/CreatePartyPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route
          path="/party/:partyId"
          element={<Homepage openPartyDetails={true} />}
        />
        <Route path="/my-party" element={<MyPartyPage />} />
        <Route
          path="/my-party/update-party/:id"
          element={<CreateUpdatePartyPage type="update" />}
        />
        <Route
          path="/create-party"
          element={<CreateUpdatePartyPage type="create" />}
        />
        <Route
          path="/my-party/update-party/:id"
          element={<CreateUpdatePartyPage type="update" />}
        />
        <Route
          path="/create-party"
          element={<CreateUpdatePartyPage type="create" />}
        />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/invitations" element={<InvitationsPage />} />
        <Route path="/settings" element={<SettingsPage/>} />
        <Route path="/profile/:id" element={<ProfilePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
