import { useParams, useSearchParams } from 'react-router'
import { usePaginateMembersQuery } from '@/data/api/member_api.ts'
import { useDialogResource } from '@/commons/utils'
import { Member } from '@/data/models/user.ts'
import { useEffect } from 'react'
import MembersOverview from '../ui/members-overview'
import { AsyncData } from '@/commons/components/async_data'

export function PageMembersOverviewFeature() {
  const params = useParams()
  const [searchParams] = useSearchParams()

  const { data: members, refetch, isLoading } = usePaginateMembersQuery({
    structureId: params.structureId,
    queryParams: searchParams.toString(),
  }, {skip: !params.structureId})

  const editDialogProps = useDialogResource<Member>()

  useEffect(() => {
    refetch()
  }, [searchParams])

  return (
    <AsyncData 
      data={members}
      isLoading={isLoading}
      onData={(data) => (
        <MembersOverview 
          members={data}
          params={params}
          editDialog={editDialogProps}
        />
      )}
    />
  )
}
