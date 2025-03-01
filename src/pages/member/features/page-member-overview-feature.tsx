import { useParams } from 'react-router'
import { useGetMemberQuery } from '@/data/api/member_api.ts'
import { useEffect } from 'react'
import { Skeleton } from '@/commons/components/ui/skeleton'
import { ApplicationLayout } from '@/commons/components/layouts/default/layout'
import MemberOverview from '../ui/member-overview'

export default function PageMemberViewFeature() {
  const params = useParams()

  const { data: member } = useGetMemberQuery({
    structureId: params.structureId,
    memberId: params.memberId,
  })

  useEffect(() => {
    console.log(member)
    
  }, [member])

  if (!member) {
    return (
      <MemberLoading />
    )
  }

  return (
    <MemberOverview
      member={member!}
      params={params}
    />
  )
}


function MemberLoading() {
  return (
    <ApplicationLayout mode="platform">
      <div className="p-5 border-b">
        <Skeleton className="w-full h-10" />
      </div>
    </ApplicationLayout>
  )
}