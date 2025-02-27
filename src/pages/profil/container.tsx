import { Outlet, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getUserState } from "@/data/store/user_store";
import { Skeleton } from "@/commons/components/ui/skeleton";
import { Button } from "@/commons/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function Container() {
  const { user } = useSelector(getUserState)
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  if (!user) {
    return (
      <div className="bg-gray-200 min-h-screen w-full  flex items-center justify-center">
        <div className="bg-white rounded-md p-12 w-[98%] min-h-[98vh] overflow-auto">
          <PageLoader />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-200 min-h-screen w-full  flex items-center justify-center">
      <div className="bg-white rounded-md p-12 w-[98%] min-h-[98vh] overflow-auto">

        <Button 
          variant="outline" 
          size="md" 
          className="mb-4"
          onClick={handleBack}
        >
          <div className="flex items-center gap-2">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Retour</span>
          </div>
        </Button>
        <Outlet />
      </div>
    </div>
  )
}

function PageLoader() {
  return (
    <div className="flex flex-col gap-5 bg-white">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}