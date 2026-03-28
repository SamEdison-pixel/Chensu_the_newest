import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import CommunityPage from "@/pages/CommunityPage";
import EventsPage from "@/pages/EventsPage";
import CoursesPage from "@/pages/CoursesPage";
import EconomyPage from "@/pages/EconomyPage";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/economy" element={<EconomyPage />} />
      </Routes>
    </AuthContext.Provider>
  );
}
