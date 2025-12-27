function HealthItem({ label, status }) {
    return (
        <div className="flex items-center justify-between py-2 ">
            <span className="text-lg text-gray-800">{label}</span>

            <span className="flex items-center gap-2 text-sm">
                <span
                    className={`h-2 w-2 rounded-full ${status ? "bg-green-500" : "bg-red-500"
                        }`}
                />
                <span className={status ? "text-green-600" : "text-red-600"}>
                    {status ? "Healthy" : "Down"}
                </span>
            </span>
        </div>
    );
}

export default function SystemHealth() {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                System Health
            </h2>

            <div className="divide-y">
                <HealthItem label="CLIP Model Loaded" status={true} />
                <HealthItem label="FAISS Index Ready" status={true} />
                <HealthItem label="C++ Preprocessing Active" status={true} />
                <HealthItem label="PostgreSQL Connected" status={true} />
                <HealthItem label="Redis Cache Active" status={true} />
            </div>
        </div>
    );
}
