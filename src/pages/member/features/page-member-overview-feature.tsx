import { useParams } from 'react-router'
import { useGetMemberQuery } from '@/data/api/member_api.ts'
import { Skeleton } from '@/commons/components/ui/skeleton'
import MemberOverview from '../ui/member-overview'
import { AsyncData } from '@/commons/components/async_data.tsx'

export default function PageMemberViewFeature() {
  const params = useParams()

  const query = useGetMemberQuery({
    structureId: params.structureId,
    memberId: params.memberId,
  })

  return (
    <AsyncData
      {...query}
      onLoading={<MemberLoading/>}
      onData={(member) => (
        <MemberOverview
          member={member}
          params={params}
        />
      )}
    />
  )
}


function MemberLoading() {
  return (
    <div className="p-5 border-b">
      <Skeleton className="w-full h-10"/>
    </div>
  )
}
