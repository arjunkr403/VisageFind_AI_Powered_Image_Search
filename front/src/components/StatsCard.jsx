export default function StatsCard({ label, value, trend, trendType }) {
  const trendColor =
    trendType === "up"
      ? "text-green-600"
      : trendType === "down"
      ? "text-red-600"
      : "text-gray-500";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-md hover:shadow-xl transition-shadow">
      <h3 className="text-lg font-medium text-gray-500">
        {label}
      </h3>

      <div className="mt-3 flex items-end justify-between">
        <span className="text-3xl font-bold text-gray-900">
          {value}
        </span>

        <span className={`text-sm font-medium ${trendColor}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}
