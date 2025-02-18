import { Skeleton } from "./ui/skeleton";

export default function Loader () {
  return (
    <div className="flex bg-[hsl(var(--sidebar-background))] h-screen">
      {/* Sidebar */}
      <div className="w-64 p-4 space-y-6">
        {/* User info */}
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        {/* Navigation sections */}
        <div className="space-y-6">
          {/* Association section */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <div className="space-y-1 pl-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          {/* Entrainements section */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-28" />
            <div className="space-y-1 pl-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>

          {/* Paramètres section */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <div className="space-y-1 pl-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>

        {/* Logout button */}
        <div className="absolute bottom-4">
          <Skeleton className="h-10 w-48" />
        </div>
      </div>

      {/* Main content */}
      <div className="p-3 w-full h-full">
      <div className="flex-1 h-full p-6 rounded-md border bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-40" />
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      </div>
      </div>
    </div>

  )
}