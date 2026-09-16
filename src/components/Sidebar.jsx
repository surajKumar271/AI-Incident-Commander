import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboardIcon,
  SirenIcon,
  ServerIcon,
  BotIcon,
  FileSearchIcon,
  PlayCircleIcon,
  SettingsIcon,
  ShieldCheckIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  TerminalIcon } from
'lucide-react';
import { useAuth } from '../context/AuthContext';

const nav = [
{ to: '/', label: 'Dashboard', icon: LayoutDashboardIcon, end: true },
{ to: '/incidents', label: 'Incidents', icon: SirenIcon, badge: '4' },
{ to: '/services', label: 'Services', icon: ServerIcon },
{ to: '/agents', label: 'AI Agents', icon: BotIcon },
{ to: '/evidence', label: 'Evidence', icon: FileSearchIcon },
{ to: '/actions', label: 'Actions', icon: PlayCircleIcon, badge: '1' },
{ to: '/settings', label: 'Settings', icon: SettingsIcon }];


export function Sidebar({ collapsed, onToggle, mobileOpen, onCloseMobile }) {
  const { user } = useAuth();
  const width = collapsed ? 'lg:w-[68px]' : 'lg:w-[248px]';

  return (
    <>
      {mobileOpen &&
      <div
        className="fixed inset-0 z-30 bg-black/60 lg:hidden"
        onClick={onCloseMobile}
        aria-hidden="true" />

      }
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-line bg-panel transition-transform duration-200 ease-smooth lg:static lg:translate-x-0 ${width} ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'}`
        }>
        
        <div className={`flex h-14 items-center border-b border-line ${collapsed ? 'lg:justify-center lg:px-0' : ''} gap-2.5 px-4`}>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-ai/15 ring-1 ring-inset ring-ai/30">
            <TerminalIcon className="h-4 w-4 text-ai" aria-hidden="true" />
          </div>
          <div className={`min-w-0 ${collapsed ? 'lg:hidden' : ''}`}>
            <p className="truncate text-sm font-semibold leading-tight tracking-tight text-fg">AI Incident Commander</p>
            <p className="text-2xs text-fg3">acme-corp · prod-us-east</p>
          </div>
        </div>

        <nav className="overflow-y-auto px-2 py-3 scroll-thin" aria-label="Main navigation">
          <ul className="space-y-0.5">
            {nav.map((item) =>
            <li key={item.to}>
                <NavLink
                to={item.to}
                end={item.end}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                `group relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors duration-150 ease-smooth ${
                isActive ? 'bg-white/[0.06] text-fg' : 'text-fg2 hover:bg-white/[0.03] hover:text-fg'} ${
                collapsed ? 'lg:justify-center lg:px-0' : ''}`
                }
                title={collapsed ? item.label : undefined}>
                
                  {({ isActive }) =>
                <>
                      {isActive && <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-ai" aria-hidden="true" />}
                      <item.icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-ai' : 'text-fg3 group-hover:text-fg2'}`} aria-hidden="true" />
                      <span className={`flex-1 truncate ${collapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
                      {item.badge &&
                  <span className={`tabular rounded bg-white/[0.07] px-1.5 py-0.5 text-2xs font-semibold text-fg2 ${collapsed ? 'lg:hidden' : ''}`}>
                          {item.badge}
                        </span>
                  }
                    </>
                }
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="mt-auto border-t border-line p-2">
          <div className={`mb-2 flex items-center gap-2.5 rounded-md bg-ok/[0.06] px-2.5 py-2 ring-1 ring-inset ring-ok/20 ${collapsed ? 'lg:justify-center lg:px-0' : ''}`}>
            <ShieldCheckIcon className="h-4 w-4 shrink-0 text-ok" aria-hidden="true" />
            <div className={`min-w-0 ${collapsed ? 'lg:hidden' : ''}`}>
              <p className="truncate text-xs font-medium text-ok">All systems operational</p>
              <p className="text-2xs text-fg3">Last check 12s ago</p>
            </div>
          </div>

          <div className={`flex items-center gap-2.5 rounded-md px-2 py-2 ${collapsed ? 'lg:justify-center lg:px-0' : ''}`}>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-panel2 text-2xs font-semibold text-fg2 ring-1 ring-inset ring-line2">
              {user.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
            </span>
            <div className={`min-w-0 flex-1 ${collapsed ? 'lg:hidden' : ''}`}>
              <p className="truncate text-xs font-medium text-fg">{user.name}</p>
              <p className="truncate text-2xs text-fg3">On-call · SRE</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggle}
            className={`mt-1 hidden w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-xs font-medium text-fg3 transition-colors duration-150 ease-smooth hover:bg-white/[0.04] hover:text-fg2 lg:flex ${
            collapsed ? 'lg:justify-center lg:px-0' : ''}`
            }
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            
            {collapsed ? <PanelLeftOpenIcon className="h-4 w-4" aria-hidden="true" /> : <PanelLeftCloseIcon className="h-4 w-4" aria-hidden="true" />}
            <span className={collapsed ? 'lg:hidden' : ''}>Collapse</span>
          </button>
        </div>
      </aside>
    </>);

}
