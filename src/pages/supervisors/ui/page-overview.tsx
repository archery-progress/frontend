import { ApplicationLayout } from '@/commons/components/layouts/default/layout'
import ComingSoon from '@/commons/components/ui/coming-soon'
import { Heading } from '@/commons/components/ui/heading'
import { Structure } from '@/data/models/structure'

export interface PageOverviewProps {
  structure: Structure
}

export default function PageOverview(props: PageOverviewProps) {
  return (
    <ApplicationLayout
      mode='platform'
      breadcrumb={[
        {label: 'Accueil', url: `/structures/${props.structure.id}/overview`},
        {label: 'Encadrants', url: `/structures/${props.structure.id}/supervisors/overview`},
      ]}
    >
      <div className="p-5">
        <Heading>
          Encadrants
        </Heading>

        <div className="mt-5">
          <ComingSoon />
        </div>
      </div>
    </ApplicationLayout>
  )
}