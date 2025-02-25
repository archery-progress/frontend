import { useParams } from 'react-router'
import { useGetMemberQuery } from '@/data/api/member_api.ts'
import MemberViewUi from '@/pages/member/ui/member-view-ui.tsx'

export default function PageMemberViewFeature() {
  const params = useParams()
  const memberQuery = useGetMemberQuery({
    structureId: params.structureId,
    memberId: params.memberId
  }, { skip: !params.structureId || !params.memberId })

  return (
    <MemberViewUi
      memberQuery={memberQuery}
      params={params}
    />
  )
}
