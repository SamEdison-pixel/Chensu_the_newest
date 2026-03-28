import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "@/pages/Home";
import CommunityPage from "@/pages/CommunityPage";
import EventsPage from "@/pages/EventsPage";
import CoursesPage from "@/pages/CoursesPage";
import EconomyPage from "@/pages/EconomyPage";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout, navigate }}
    >
      <nav style={{ padding: '1rem', display: 'flex', gap: '1rem', borderBottom: '1px solid #eee' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#2563eb' }}>首页</Link>
        <Link to="/community" style={{ textDecoration: 'none', color: '#2563eb' }}>情感社区</Link>
        <Link to="/events" style={{ textDecoration: 'none', color: '#2563eb' }}>线下活动</Link>
        <Link to="/courses" style={{ textDecoration: 'none', color: '#2563eb' }}>心理课程</Link>
        <Link to="/economy" style={{ textDecoration: 'none', color: '#2563eb' }}>单身经济</Link>
      </nav>

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
