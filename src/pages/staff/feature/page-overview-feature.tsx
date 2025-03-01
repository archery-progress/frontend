import { useSelector } from "react-redux"
import PageOverview from "../ui/page-overview"
import { getStructureState } from "@/data/store/structure_store"

export default function PageOverviewFeature() {
  const { currentStructure } = useSelector(getStructureState)
  return (
    <PageOverview 
      structure={currentStructure!}
    />
  )
}