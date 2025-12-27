import React, { useState } from "react";

export default function ImageCard({ result, onClick }) {
  const [imgSrc, setImgSrc] = useState(result.url);
  const [hasError, setHasError] = useState(false);

  // Determine if it's a search result (has score) or just a gallery image
  const matchPercentage = result.score ? Math.round(result.score * 100) : null;

  const handleError = () => {
    setHasError(true);
    // Fallback placeholder (using a generic gray box or a placeholder service)
    setImgSrc(
      "https://placehold.co/400x400/e2e8f0/94a3b8?text=Image+Not+Found",
    );
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      {/* Image Container */}
      <div className="aspect-square bg-gray-100 overflow-hidden relative flex items-center justify-center">
        <img
          src={imgSrc}
          alt={result.filename || "Image"}
          onError={handleError}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${hasError ? "opacity-50" : ""}`}
          loading="lazy"
        />

        {/* Score Badge (Overlay) */}
        {matchPercentage !== null && !hasError && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
            {matchPercentage}% Match
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div className="p-3">
        <p
          className="text-sm font-medium text-gray-900 truncate"
          title={result.filename}
        >
          {result.filename || "Untitled"}
        </p>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <span
            className={`w-2 h-2 rounded-full ${result.score && !hasError ? "bg-green-500" : "bg-gray-400"}`}
          ></span>
          {hasError ? "Missing File" : result.score ? "Indexed" : "Stored"}
        </p>
      </div>
    </div>
  );
}
