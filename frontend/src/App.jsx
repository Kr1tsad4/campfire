import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AuthPage from "./pages/AuthPage";
import MyPartyPage from "./pages/MyPartyPage";
import PartyBoardPage from "./pages/PartyBoardPage";
import InvitationsPage from "./pages/InvitationsPage";
import ProfilePage from "./pages/ProfilePage";
import CreateUpdatePartyPage from "./pages/CreateUpdatePartyPage";
import PartyLobbyPage from "./pages/PartyLobbyPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import FriendsPage from "./pages/FriendsPage";
import { useUser } from "./hooks/useUser";
import { useEffect } from "react";
import { NavigationProvider } from "./contexts/NavigationContext";

function App() {
  const { loginUser, getLoginUser, isLoadingUser } = useUser();
  useEffect(() => {
    getLoginUser();
  }, []);
  return (
    <NavigationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
                <Homepage loginUser={loginUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/party/:partyId"
            element={
              <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
                <Homepage openPartyDetails={true} loginUser={loginUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/party/:partyId/lobby"
            element={
              <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
                <PartyLobbyPage loginUser={loginUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/party-board"
            element={
              <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
                <PartyBoardPage loginUser={loginUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-party"
            element={
              <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
                <MyPartyPage loginUser={loginUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/friends"
            element={
              <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
                <FriendsPage loginUser={loginUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-party/update-party/:id"
            element={
              <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
                <CreateUpdatePartyPage type="update" loginUser={loginUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-party"
            element={
              <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
                <CreateUpdatePartyPage type="create" loginUser={loginUser} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/invitations"
            element={
              <ProtectedRoute user={loginUser} isLoading={isLoadingUser}>
                <InvitationsPage openPartyDetails={true} loginUser={loginUser} />
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
    </NavigationProvider>
  );
}

export default App;
