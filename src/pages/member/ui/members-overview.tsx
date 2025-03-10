import { useDefineBreadcrumb, useDefineTrailing } from '@/commons/components/layouts/default/hooks'
import { Searchbar } from '@/commons/components/searchbar'
import TableFilter from '@/commons/components/table_filter'
import { Badge } from '@/commons/components/ui/badge'
import { Heading } from '@/commons/components/ui/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/commons/components/ui/table'
import { DialogResourceContext, Paginated } from '@/commons/utils'
import { Member } from '@/data/models/user'
import { DateTime } from 'luxon'
import { Params } from 'react-router'
import { useNavigate } from 'react-router'

export interface MembersOverviewProps {
  members: Paginated<Member>
  params: Readonly<Params<string>>
  editDialog: DialogResourceContext<Member>
}

export default function MembersOverview(props: MembersOverviewProps) {
  useDefineBreadcrumb([{label: 'Licenciés', url: `/platform/${props.params.structureId}/members/overview`}])
  useDefineTrailing(<SidebarTrailing {...props} />)

  return (
    <div>
      <div className='p-5 border-b'>
        <Heading>Licenciés du club</Heading>
        <p className="text-sm text-muted-foreground">
        Gestion des licenciés du club.
        </p>
      </div>

      <div>
        <Table meta={props.members.meta} empty={<EmptyData />}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Identité</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Dernière mise à jour</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody
            data={props.members.data}
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
      </div>
    </div>
  )
}


function RowBuilder(props: DialogResourceContext<Member> & { structureId?: string, member: Member }) {
  const navigate = useNavigate()

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => navigate(`/structures/${props.structureId}/members/${props.member.id}/overview`)}
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


function SidebarTrailing(props: MembersOverviewProps) {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Searchbar
        placeholder="Search for a user..."
        searchKey="search"
        redirect={`/structures/${props.params.structureId}/members/overview`}
      />

      <TableFilter
        itemPerPage={props.members.meta.perPage}
        resources={[]}
        resourceRoute={`/structures/${props.params.structureId}/members/overview+`}
      />
    </div>
  )
}
