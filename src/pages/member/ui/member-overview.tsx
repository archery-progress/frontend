
import { Member } from '@/data/models/user.ts'
import { Badge } from '@/commons/components/ui/badge.tsx'
import { ApplicationLayout } from '@/commons/components/layouts/default/layout.tsx'

import { Params } from 'react-router'

type Props = {
  member: Member
  params: Readonly<Params<string>>
}

export default function MemberOverview({ params, member }: Props) {
  return (
    <ApplicationLayout
      mode="platform"
      breadcrumb={[
        {label: 'Accueil', url: `/platform/${params.structureId}/overview`},
        {label: 'Licenciés', url: `/platform/${params.structureId}/members/overview`},
      ]}
    >
      <div>
        <div className="p-5 border-b">
          <div>
            <h2 className='className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0"'>
              <span>{member.user.firstname} {member.user.lastname}</span>
            </h2>

            <span>
              <Badge variant="outline">{member.structure.name}</Badge>
            </span>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  )
}
