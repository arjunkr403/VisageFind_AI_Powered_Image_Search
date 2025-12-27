import { NavLink } from "react-router-dom";

function Sidebar({ setPageTitle, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed lg:relative z-30
        w-64 bg-[#0B1220] text-white flex flex-col h-full
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="p-2 flex justify-between items-center">
          <img className="mx-auto mt-1" src="/logo.png" alt="VisageFind" />

          {/* Close button for mobile */}

          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white mr-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <SidebarLink
            to="/"
            label="Dashboard"
            setPageTitle={setPageTitle}
            onClose={onClose}
          />
          <SidebarLink
            to="/upload"
            label="Upload"
            setPageTitle={setPageTitle}
            onClose={onClose}
          />
          <SidebarLink
            to="/search"
            label="Search"
            setPageTitle={setPageTitle}
            onClose={onClose}
          />
          <SidebarLink
            to="/history"
            label="History"
            setPageTitle={setPageTitle}
            onClose={onClose}
          />
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 text-xs text-slate-400 border-t border-slate-700">
          v1.0 • PWA Enabled
        </div>
      </aside>
    </>
  );
}

function SidebarLink({ to, label, setPageTitle, onClose }) {
  return (
    <NavLink
      to={to}
      end
      onClick={() => {
        setPageTitle(label);
        onClose();
      }}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-md text-sm transition
         ${
           isActive
             ? "bg-slate-800 text-white border-l-4 border-indigo-500"
             : "text-slate-300 hover:bg-slate-800 hover:text-white"
         }`
      }
    >
      {label}
    </NavLink>
  );
}

export default Sidebar;
