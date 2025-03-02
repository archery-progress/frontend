import { getStructureState } from '@/data/store/structure_store'
import { useSelector } from 'react-redux'
import PageOverview from '../ui/page-overview'

export default function PageOverviewFeature() {
  const { currentStructure } = useSelector(getStructureState)

  return (
    <PageOverview 
      structure={currentStructure!}
    />
  )
}