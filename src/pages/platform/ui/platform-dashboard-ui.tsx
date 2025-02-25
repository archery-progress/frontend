import { ApplicationLayout } from '@/commons/components/layouts/default/layout.tsx'
import { Params } from 'react-router'

type Props = {
  params: Readonly<Params<string>>
}

export default function PlatformDashboardUi(props: Props) {
  return (
    <ApplicationLayout
      mode="platform"
      breadcrumb={[
        {label: 'Accueil', url: `/platform/${props.params.structureId}/overview`},
      ]}
    >
      Dashboard
    </ApplicationLayout>
  )
}
