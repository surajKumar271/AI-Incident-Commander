import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, BellIcon, ChevronDownIcon, MenuIcon, CheckIcon, ActivityIcon, LogOutIcon, SunIcon, MoonIcon } from 'lucide-react';
import { environments, incidents } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export function Topbar({ environment, onEnvironmentChange, onOpenMobileNav }) {
  const [envOpen, setEnvOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const envRef = useRef(null);
  const profileRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    function onDocClick(e) {
      if (envRef.current && !envRef.current.contains(e.target)) setEnvOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);
  useEffect(() => { const onKey = (e) => e.key === 'Escape' && setProfileOpen(false); document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey); }, []);

  const results = query.trim() ?
  incidents.filter(
    (i) =>
    i.id.toLowerCase().includes(query.toLowerCase()) ||
    i.title.toLowerCase().includes(query.toLowerCase()) ||
    i.service.toLowerCase().includes(query.toLowerCase())
  ) :
  [];

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-line bg-canvas/90 px-4 backdrop-blur">
      <button
        type="button"
        onClick={onOpenMobileNav}
        className="rounded-md p-2 text-fg2 transition-colors duration-150 ease-smooth hover:bg-white/[0.05] hover:text-fg lg:hidden"
        aria-label="Open navigation">
        
        <MenuIcon className="h-4 w-4" aria-hidden="true" />
      </button>

      <div className="relative w-full max-w-sm">
        <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-fg3" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 120)}
          placeholder="Search incidents, services, evidence…"
          aria-label="Global search"
          className="h-8 w-full rounded-md border border-line bg-panel pl-8 pr-14 text-xs text-fg placeholder:text-fg3 transition-colors duration-150 ease-smooth hover:border-line2 focus:border-ai/50 focus:outline-none" />
        
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-line2 bg-panel2 px-1.5 py-0.5 font-mono text-2xs text-fg3">
          ⌘K
        </kbd>

        {focused && query.trim() &&
        <div className="absolute left-0 right-0 top-10 overflow-hidden rounded-md border border-line2 bg-panel shadow-2xl">
            {results.length === 0 ?
          <p className="px-3 py-4 text-xs text-fg3">No results for “{query}”.</p> :

          <ul className="max-h-72 overflow-y-auto scroll-thin py-1">
                {results.map((r) =>
            <li key={r.id}>
                    <button
                type="button"
                onMouseDown={() => {
                  navigate(`/incidents/${r.id}`);
                  setQuery('');
                }}
                className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors duration-150 ease-smooth hover:bg-white/[0.05]">
                
                      <span className="font-mono text-2xs text-fg3">{r.id}</span>
                      <span className="min-w-0 flex-1 truncate text-xs text-fg">{r.title}</span>
                      <span className="text-2xs text-fg3">{r.service}</span>
                    </button>
                  </li>
            )}
              </ul>
          }
          </div>
        }
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-1.5 rounded-md border border-line bg-panel px-2.5 py-1.5 md:flex">
          <ActivityIcon className="h-3.5 w-3.5 text-ok" aria-hidden="true" />
          <span className="text-2xs font-medium text-fg2">Systems nominal</span>
        </div>

        <div className="relative" ref={envRef}>
          <button
            type="button"
            onClick={() => setEnvOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={envOpen}
            className="flex items-center gap-2 rounded-md border border-line bg-panel px-2.5 py-1.5 text-xs font-medium text-fg transition-colors duration-150 ease-smooth hover:border-line2">
            
            <span className={`h-1.5 w-1.5 rounded-full ${environment === 'Production' ? 'bg-ok' : 'bg-info'}`} aria-hidden="true" />
            {environment}
            <ChevronDownIcon className="h-3.5 w-3.5 text-fg3" aria-hidden="true" />
          </button>
          {envOpen &&
          <ul
            role="listbox"
            className="absolute right-0 top-9 w-44 overflow-hidden rounded-md border border-line2 bg-panel py-1 shadow-2xl">
            
              {environments.map((env) =>
            <li key={env} role="option" aria-selected={env === environment}>
                  <button
                type="button"
                onClick={() => {
                  onEnvironmentChange(env);
                  setEnvOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-fg2 transition-colors duration-150 ease-smooth hover:bg-white/[0.05] hover:text-fg">
                
                    <span className={`h-1.5 w-1.5 rounded-full ${env === 'Production' ? 'bg-ok' : 'bg-info'}`} aria-hidden="true" />
                    <span className="flex-1">{env}</span>
                    {env === environment && <CheckIcon className="h-3.5 w-3.5 text-ai" aria-hidden="true" />}
                  </button>
                </li>
            )}
            </ul>
          }
        </div>

        <button
          type="button"
          className="relative rounded-md border border-line bg-panel p-2 text-fg2 transition-colors duration-150 ease-smooth hover:border-line2 hover:text-fg"
          aria-label="Notifications, 3 unread">
          
          <BellIcon className="h-4 w-4" aria-hidden="true" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-crit px-1 text-[10px] font-semibold text-white">
            3
          </span>
        </button>

        <div className="relative" ref={profileRef}>
          <button type="button" onClick={() => setProfileOpen((v) => !v)} className="flex h-8 w-8 items-center justify-center rounded-full bg-panel2 text-2xs font-semibold text-fg2 ring-1 ring-inset ring-line2" aria-label="Open user menu">{user.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</button>
          {profileOpen && <div className="absolute right-0 top-10 w-56 overflow-hidden rounded-lg border border-line2 bg-panel p-1 shadow-2xl"><div className="border-b border-line px-3 py-2.5"><p className="text-xs font-semibold text-fg">{user.name}</p><p className="mt-0.5 text-2xs text-fg3">{user.role}</p></div><button className="menu-item" onClick={() => setProfileOpen(false)}>Profile</button><button className="menu-item" onClick={() => { setProfileOpen(false); navigate('/settings'); }}>Account</button><button className="menu-item" onClick={toggleTheme}>{theme === 'dark' ? <SunIcon className="h-3.5 w-3.5" /> : <MoonIcon className="h-3.5 w-3.5" />}Theme: {theme === 'dark' ? 'Light' : 'Dark'}</button><button className="menu-item text-crit hover:bg-crit/10" onClick={() => { logout(); navigate('/login', { replace: true }); }}><LogOutIcon className="h-3.5 w-3.5" />Logout</button></div>}
        </div>
      </div>
    </header>);

}
