import { useParams } from 'react-router'
import PlatformDashboardUi from '@/pages/platform/ui/platform-dashboard-ui.tsx'

export function PagePlatformDashboardFeature () {
  const params = useParams()
  return <PlatformDashboardUi params={params} />
}
