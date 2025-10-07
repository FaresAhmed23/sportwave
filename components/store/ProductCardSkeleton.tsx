export default function ProductCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="aspect-[3/4] bg-gray-200 rounded-t-xl" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
        <div className="h-5 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  )
}