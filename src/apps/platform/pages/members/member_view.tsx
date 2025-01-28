import { AsyncData } from '@/commons/components/async_data.tsx'
import { Member } from '@/data/models/user.ts'
import { ApplicationLayout } from '@/commons/components/layouts/default/layout.tsx'
import { useParams } from 'react-router'
import { useGetMemberQuery } from '@/data/api/member_api.ts'
import { Badge } from '@/commons/components/ui/badge.tsx'
import { Fragment } from 'react'

export default function MemberView() {
  const params = useParams()
  const memberQuery = useGetMemberQuery({
    structureId: params.structureId,
    memberId: params.memberId
  }, { skip: !params.structureId || !params.memberId })

  return (
    <ApplicationLayout
      mode="platform"
      breadcrumb={[
        {label: 'Accueil', url: `/platform/${params.structureId}/overview`},
        {label: 'Licenciés', url: `/platform/${params.structureId}/members/overview`}

      ]}
    >
      <div>
        <div className="p-5 border-b">
          <AsyncData<Member>
            source={memberQuery}
            onData={(member) => (
              <Fragment>
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  <p>{member.user.firstname} {member.user.lastname}</p>
                </h2>
                <p className="text-sm text-muted-foreground">
                  <Badge variant="outline">{member.structure.name}</Badge>
                </p>
              </Fragment>
            )}
          />
        </div>
      </div>
    </ApplicationLayout>
  )
}
