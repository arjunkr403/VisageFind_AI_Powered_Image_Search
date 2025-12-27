import React, { useState, useEffect } from "react";
import { getSearchHistory, getUploadHistory } from "../services/api";

export default function History() {
  const [activeTab, setActiveTab] = useState("uploads");
  const [uploads, setUploads] = useState([]);
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "uploads") {
      fetchUploads();
    }
    else if (activeTab === "searches") {
      fetchSearches();
    }
  }, [activeTab]);

  const fetchUploads = async () => {
    setLoading(true);
    try {
      const data = await getUploadHistory();
      // Map backend data to UI format
      // console.log(data);
      const mapped = data.map((item) => ({
        id: item.id,
        time: item.time,
        name: item.filename,
        status: item.status,
      }));
      setUploads(mapped);
    } catch (err) {
      console.error("Failed to fetch uploads history", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearches = async () => {
    setLoading(true);
    try {
      const data = await getSearchHistory();
      setSearches(data);
    } catch (error) {
      console.error("Failed to fetch search history", error);
    }
    finally {
      setLoading(false);
    }
  }


  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Activity History</h2>
        <p className="text-gray-500 mt-2 text-lg">
          Track your recent uploads, searches, and system events.
        </p>
      </div>

      {/* TABS */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <TabButton
            label="Uploads"
            isActive={activeTab === "uploads"}
            onClick={() => setActiveTab("uploads")}
          />
          <TabButton
            label="Searches"
            isActive={activeTab === "searches"}
            onClick={() => setActiveTab("searches")}
          />
          <TabButton
            label="System Events"
            isActive={activeTab === "system"}
            onClick={() => setActiveTab("system")}
          />
        </nav>
      </div>

      {/* CONTENT AREA */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[300px]">
        {activeTab === "uploads" &&
          (loading ? <LoadingSpinner /> : <UploadsTable data={uploads} />)}

        {activeTab === "searches" && (loading ? <LoadingSpinner /> : <SearchesTable data={searches} />)}
        {activeTab === "system" && <SystemLog />}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <svg
        className="animate-spin h-8 w-8 text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}

function TabButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${isActive
          ? "border-indigo-500 text-indigo-600"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        }
            `}
    >
      {label}
    </button>
  );
}

function UploadsTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No upload history found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              File Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.time}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                    ${item.status === "Success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SearchesTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No search history found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Query Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Match</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:br-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.created_at).toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.query_image_filename}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.results[0] ? item.results[0].filename : 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-semibold">{item.results[0] ? item.results[0].score.toFixed(4) : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SystemLog() {
  const logs = [
    {
      id: 1,
      time: "10:42:05 AM",
      type: "INFO",
      message: "FAISS index rebuilt successfully.",
    },
    {
      id: 2,
      time: "10:41:55 AM",
      type: "INFO",
      message: "Batch upload completed. 4 files processed.",
    },
    {
      id: 3,
      time: "09:15:00 AM",
      type: "WARN",
      message: "Redis connection latency spike detected (120ms).",
    },
  ];

  return (
    <div className="p-6">
      <ul className="space-y-4">
        {logs.map((log) => (
          <li key={log.id} className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-24 text-xs text-gray-400 font-mono pt-1">
              {log.time}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded
                                    ${log.type === "INFO"
                      ? "bg-blue-100 text-blue-800"
                      : log.type === "WARN"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                >
                  {log.type}
                </span>
                <p className="text-sm text-gray-700">{log.message}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
