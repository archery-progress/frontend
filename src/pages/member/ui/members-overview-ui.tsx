import { Searchbar } from '@/commons/components/searchbar.tsx'
import { AsyncData } from '@/commons/components/async_data.tsx'
import { DialogResourceContext, Paginated } from '@/commons/utils'
import { Member } from '@/data/models/user.ts'
import TableFilter from '@/commons/components/table_filter.tsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/commons/components/ui/table.tsx'
import { ApplicationLayout } from '@/commons/components/layouts/default/layout.tsx'
import { TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react'
import { Params, useNavigate } from 'react-router'
import { Badge } from '@/commons/components/ui/badge.tsx'
import { DateTime } from 'luxon'
import MemberViewDialogFeature from '@/pages/member/components/feature/view_dialog/member-view-dialog-feature.tsx'

type Props = {
  paginatedMembersQuery: TypedUseQueryHookResult<any, void, any, any>
  params: Readonly<Params<string>>
  editDialog: DialogResourceContext<Member>
}

export default function MembersOverviewUi(props: Props) {
  return (
    <ApplicationLayout
      mode="platform"
      breadcrumb={[
        {label: 'Accueil', url: `/structures/${props.params.structureId}/overview`},
        {label: 'Licenciés', url: `/structures/${props.params.structureId}/members/overview`}
      ]}
      trailing={
        <div className="flex items-center justify-end gap-x-2">
          <Searchbar
            placeholder="Search for a user..."
            searchKey="search"
            redirect={`/structures/${props.params.structureId}/members/overview`}
          />

          <AsyncData<Paginated<Member>>
            source={props.paginatedMembersQuery}
            onData={(users) => (
              <TableFilter
                itemPerPage={users.meta.perPage}
                resources={[]}
                resourceRoute={`/structures/${props.params.structureId}/members/overview+`}
              />
            )}
          />
        </div>
      }
    >
      <div>
        <div className="p-5 border-b">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Licenciés du club
          </h2>
          <p className="text-sm text-muted-foreground">
            Gestion des licenciés du club.
          </p>
        </div>
        <AsyncData<Paginated<Member>>
          source={props.paginatedMembersQuery}
          onLoading={<p>Loading...</p>}
          onData={(members) => (
            <Table meta={members.meta} empty={<EmptyData />}>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Identité</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">
                    Dernière mise à jour
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody
                data={members.data}
                builder={(member) => (
                  <RowBuilder
                    key={member.id}
                    structureId={props.params.structureId}
                    member={member}
                    {...props.editDialog}
                  />
                )}
              />
            </Table>
          )}
        />
      </div>
      <MemberViewDialogFeature/>
    </ApplicationLayout>
  )
}

function RowBuilder(props: DialogResourceContext<Member> & { structureId?: string, member: Member }) {
  const navigate = useNavigate()

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => navigate(`/structures/${props.structureId}/members/${props.member.id}/view`)}
    >
      <TableCell className="font-medium whitespace-nowrap !text-xs">
        <Badge variant="outline">
          {props.member.user.firstname} {props.member.user.lastname}
        </Badge>
      </TableCell>
      <TableCell>
        <p>{props.member.user.email}</p>
      </TableCell>
      <TableCell className="text-right">
        <p className="text-sm">
          {DateTime.fromISO(props.member.updatedAt ?? props.member.createdAt).toLocaleString(DateTime.DATETIME_MED)}
        </p>
      </TableCell>
    </TableRow>
  )
}

function EmptyData() {
  return (
    <div className="p-5">
      <div className="flex items-center justify-center max-h-screen h-[40rem] border border-input rounded-md p-5">
        <div className="">
          <h2 className="text-xl text-center mt-5">No data found.</h2>
          <div className="mt-5"></div>
        </div>
      </div>
    </div>
  )
}
