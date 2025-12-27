import InstallPWABtn from "./InstallPWABtn";

function Topbar({ title, onMenuClick }) {
  return (
    <header className="h-16 md:h-24 bg-[#fcfcfd] border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* Hamburger Menu (Mobile Only) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Page Title */}
        <h1 className="text-xl md:text-3xl font-bold text-gray-800 truncate">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* system status */}
        <div className="hidden md:flex items-center gap-3 text-xs md:text-sm">
          <StatusBadge label="FAISS" status="ok" />
          <StatusBadge label="Redis" status="ok" />
        </div>

        {/* PWA Install */}
        <InstallPWABtn />
      </div>
    </header>
  );
}

function StatusBadge({ label, status }) {
  const isOk = status === "ok";
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-3 w-3 rounded-full ${isOk ? "bg-green-500" : "bg-red-500"}`}
      />
      <span className="font-semibold text-md text-gray-700">{label}</span>
    </div>
  );
}

export default Topbar;
