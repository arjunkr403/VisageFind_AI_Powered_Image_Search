export default function RecentActivity({ data = [] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow h-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Recent Activity
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No recent activity.</p>
      ) : (
        <ul className="pt-2 space-y-4">
          {data.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              <span className="text-xl">
                {item.type === "upload" ? "📤" : "🔍"}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {item.action}:{" "}
                  <span className="text-indigo-600">{item.details}</span>
                </p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
