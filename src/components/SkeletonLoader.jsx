export default function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(n => (
        <div key={n} className="bg-white rounded-xl p-4 border border-gray-200 animate-pulse">
          <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-9 bg-gray-200 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
}