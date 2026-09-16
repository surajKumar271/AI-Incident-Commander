import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Dashboard } from './pages/Dashboard';
import { Incidents } from './pages/Incidents';
import { IncidentDetails } from './pages/IncidentDetails';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Agents } from './pages/Agents';
import { Evidence } from './pages/Evidence';
import { Actions } from './pages/Actions';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { useAuth } from './context/AuthContext';

function ProtectedShell(props) {
  const { isAuthenticated } = useAuth(); const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  return <div className="flex min-h-full w-full bg-canvas text-fg"><Sidebar collapsed={props.collapsed} onToggle={props.onToggle} mobileOpen={props.mobileOpen} onCloseMobile={props.onCloseMobile} /><div className="flex min-w-0 flex-1 flex-col"><Topbar environment={props.environment} onEnvironmentChange={props.onEnvironmentChange} onOpenMobileNav={props.onOpenMobileNav} /><main className="flex-1 px-4 py-6 lg:px-6"><Outlet /></main></div></div>;
}
export function App() {
  const [collapsed, setCollapsed] = useState(false); const [mobileOpen, setMobileOpen] = useState(false); const [environment, setEnvironment] = useState('Production');
  return <BrowserRouter><Routes><Route path="/login" element={<Login />} /><Route element={<ProtectedShell collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} environment={environment} onEnvironmentChange={setEnvironment} onOpenMobileNav={() => setMobileOpen(true)} />}><Route path="/" element={<Dashboard environment={environment} />} /><Route path="/incidents" element={<Incidents />} /><Route path="/incidents/:id" element={<IncidentDetails />} /><Route path="/services" element={<Services environment={environment} />} /><Route path="/services/:id" element={<ServiceDetail />} /><Route path="/agents" element={<Agents />} /><Route path="/evidence" element={<Evidence />} /><Route path="/actions" element={<Actions />} /><Route path="/settings" element={<Settings />} /></Route><Route path="*" element={<Navigate to="/" replace />} /></Routes></BrowserRouter>;
}
