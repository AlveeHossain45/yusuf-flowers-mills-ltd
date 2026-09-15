import { Menu, Bell, Search, ChevronDown, LogOut, User, Settings as SettingsIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header({ onMenuClick, title }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // বাইরে click করলে dropdown বন্ধ হবে
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30">
      <div className="h-full flex items-center px-4 sm:px-6 gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Search (desktop) */}
        <div className="hidden md:flex items-center flex-1 max-w-md">
          <div className="relative w-full group">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors"
            />
            <input
              placeholder="Search anything..."
              className="w-full pl-10 pr-16 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200/80 placeholder-slate-400 text-slate-700 focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
            />
            <kbd className="hidden lg:inline-flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 rounded">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Mobile page title */}
        <h2 className="md:hidden flex-1 text-sm font-semibold text-slate-800 truncate">
          {title}
        </h2>

        {/* Right side actions */}
        <div className="flex items-center gap-1 sm:gap-2 ml-auto">
          {/* Notification */}
          <button
            className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-slate-200 mx-1" />

          {/* Profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="relative">
                <img
                  src="/Alveeee.png"
                  alt="Alvee Hossain"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-100"
                />
                <span className="absolute -bottom-0 -right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>

              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-800 leading-tight">
                  Alvee Hossain
                </p>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Software Engineer
                </p>
              </div>

              <ChevronDown
                size={14}
                className={`hidden sm:block text-slate-400 transition-transform duration-200 ${
                  profileOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-lg shadow-slate-900/5 overflow-hidden">
                {/* Profile header */}
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <img
                      src="/Alveeee.png"
                      alt="Alvee Hossain"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        Alvee Hossain
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        alvee@onexero.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                <div className="py-1.5">
                  <Link
                    to="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <User size={15} className="text-slate-400" />
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <SettingsIcon size={15} className="text-slate-400" />
                    Settings
                  </Link>
                </div>

                {/* Logout */}
                <div className="border-t border-slate-100 py-1.5">
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={15} />
                    Sign out
                  </button>
                </div>

                {/* Footer */}
                <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-center">
                  <a
                    href="https://onexero.netlify.app"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-slate-400 hover:text-brand-600 transition-colors"
                  >
                    Powered by Onexero
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}