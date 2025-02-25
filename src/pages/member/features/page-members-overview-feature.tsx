import { useParams, useSearchParams } from 'react-router'
import { usePaginateMembersQuery } from '@/data/api/member_api.ts'
import { useDialogResource } from '@/commons/utils'
import { Member } from '@/data/models/user.ts'
import { useEffect } from 'react'
import MembersOverviewUi from '@/pages/member/ui/members-overview-ui.tsx'

export function PageMembersOverviewFeature() {
  const params = useParams()
  const [searchParams] = useSearchParams()

  const paginatedMembersQuery = usePaginateMembersQuery({
    structureId: params.structureId,
    queryParams: searchParams.toString()
  }, {skip: !params.structureId})

  const editDialogProps = useDialogResource<Member>()

  useEffect(() => {
    paginatedMembersQuery.refetch()
  }, [searchParams])

  return (
    <MembersOverviewUi
      paginatedMembersQuery={paginatedMembersQuery}
      params={params}
      editDialog={editDialogProps}
    />
  )
}
