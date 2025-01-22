import { ApplicationLayout } from '@/commons/components/layouts/default/layout.tsx'
import { useParams } from 'react-router'

export function PlatformDashboard () {
  const params = useParams()
  return (
    <ApplicationLayout
      mode="platform"
      breadcrumb={[
        {label: 'Accueil', url: `/platform/${params.structureId}/overview`},
      ]}
    >
      Dashboard
    </ApplicationLayout>
  )
}
