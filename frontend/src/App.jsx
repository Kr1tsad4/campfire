import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AuthPage from "./pages/AuthPage";
import MyPartyPage from "./pages/MyPartyPage";
import SchedulePage from "./pages/SchedulePage";
import InvitationsPage from "./pages/InvitationsPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import CreateUpdatePartyPage from "./pages/CreateUpdatePartyPage";
import PartyLobbyPage from "./pages/PartyLobbyPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useUser } from "./hooks/useUser";
import { useEffect } from "react";
function App() {
  const { loginUser, getLoginUser, isLoadingUser } = useUser();
  useEffect(() => {
    getLoginUser();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/party/:partyId"
          element={
            <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
              <Homepage openPartyDetails={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/party/:partyId/lobby"
          element={
            <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
              <PartyLobbyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-party"
          element={
            <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
              <MyPartyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-party/update-party/:id"
          element={
            <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
              <CreateUpdatePartyPage type="update" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-party"
          element={
            <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
              <CreateUpdatePartyPage type="create" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
              <SchedulePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invitations"
          element={
            <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
              <InvitationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
