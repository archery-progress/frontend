import { AsyncData } from '@/commons/components/async_data.tsx'
import { Member } from '@/data/models/user.ts'
import { Fragment } from 'react'
import { Badge } from '@/commons/components/ui/badge.tsx'
import { ApplicationLayout } from '@/commons/components/layouts/default/layout.tsx'
import { TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react'
import { Params } from 'react-router'

type Props = {
  memberQuery: TypedUseQueryHookResult<any, void, any, any>
  params: Readonly<Params<string>>
}

export default function MemberViewUi(props: Props) {
  return (
    <ApplicationLayout
      mode="platform"
      breadcrumb={[
        {label: 'Accueil', url: `/platform/${props.params.structureId}/overview`},
        {label: 'Licenciés', url: `/platform/${props.params.structureId}/members/overview`}

      ]}
    >
      <div>
        <div className="p-5 border-b">
          <AsyncData<Member>
            source={props.memberQuery}
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
