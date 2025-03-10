import { Copyright, Key, LucideIcon, Tag, User } from 'lucide-react'
import { ReactElement, useState } from 'react'
import { useGetMemberQuery } from '@/data/api/member_api.ts'
import { Member } from '@/data/models/user.ts'
import MemberViewContentUi from '@/pages/member/components/ui/view_dialog/member-view-content-ui.tsx'
import MemberProfilViewFeature from '@/pages/member/components/feature/view_dialog/member-profil-view-feature.tsx'
import MemberPermissionsViewFeature
  from '@/pages/member/components/feature/view_dialog/member-permissions-view-feature.tsx'
import MemberRolesViewFeature from '@/pages/member/components/feature/view_dialog/member-roles-view-feature.tsx'
import MemberLicenceViewFeature from '@/pages/member/components/feature/view_dialog/member-licence-view-feature.tsx'
import { AsyncData } from '@/commons/components/async_data.tsx'
import { QueryError } from '@/commons/utils'

type Props = {
  structureId?: string
  memberId?: string
}

export type TabItem = {
  name: string
  icon: LucideIcon
  component: (props: { member: Member }) => ReactElement
}

export default function MemberViewContentFeature(props: Props) {
  const tabs: TabItem[] = [
    {name: 'Profil', icon: User, component: MemberProfilViewFeature},
    {name: 'Roles', icon: Tag, component: MemberRolesViewFeature},
    {name: 'Permissions', icon: Key, component: MemberPermissionsViewFeature},
    {name: 'Licence', icon: Copyright, component: MemberLicenceViewFeature}
  ]

  const tabItemState = useState<TabItem>(tabs[0])
  const memberQuery = useGetMemberQuery(props, {
    skip: !props.structureId || !props.memberId,
  })

  return (
    <AsyncData<Member, QueryError>
      {...memberQuery}
      onData={(member) => (
        <MemberViewContentUi
          member={member}
          params={props}
          tabs={tabs}
          tabState={tabItemState}
        />
      )}
    />
  )
}
