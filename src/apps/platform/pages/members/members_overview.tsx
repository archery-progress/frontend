import { useNavigate, useParams, useSearchParams } from 'react-router'
import { ApplicationLayout } from '@/commons/components/layouts/default/layout.tsx'
import { usePaginateMembersQuery } from '@/data/api/member_api.ts'
import { DialogResourceContext, Paginated, useDialogResource } from '@/commons/utils'
import { Member } from '@/data/models/user.ts'
import { useEffect } from 'react'
import { AsyncData } from '@/commons/components/async_data.tsx'
import TableFilter from '@/commons/components/table_filter.tsx'
import { Searchbar } from '@/commons/components/searchbar.tsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/commons/components/ui/table.tsx'
import { CopyIcon } from 'lucide-react'
import { Badge } from '@/commons/components/ui/badge.tsx'
import { toast } from 'sonner'

export function MembersOverview() {
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
    <ApplicationLayout
      mode="platform"
      breadcrumb={[
        {label: 'Accueil', url: `/platform/${params.structureId}/overview`},
        {label: 'Licenciés', url: `/platform/${params.structureId}/members/overview`}
      ]}
      trailing={
        <div className="flex items-center justify-end gap-x-2">
          <Searchbar
            placeholder="Search for a user..."
            searchKey="search"
            redirect={`/structures/${params.structureId}/members/overview`}
          />

          <AsyncData<Paginated<Member>>
            source={paginatedMembersQuery}
            onData={(users) => (
              <TableFilter
                itemPerPage={users.meta.perPage}
                resources={[]}
                resourceRoute={`/structures/${params.structureId}/members/overview+`}
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
          source={paginatedMembersQuery}
          onLoading={<p>Loading...</p>}
          onData={(members) => (
            <Table meta={members.meta} empty={<EmptyData/>}>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead className="w-[300px]">Identité</TableHead>
                  <TableHead>État du compte</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody
                data={members.data}
                builder={(member) => (
                  <RowBuilder
                    key={member.id}
                    structureId={params.structureId}
                    member={member}
                    {...editDialogProps}
                  />
                )}
              />
            </Table>
          )}
        />
      </div>
    </ApplicationLayout>
  )
}

function RowBuilder(props: DialogResourceContext<Member> & { structureId?: string, member: Member }) {
  const navigate = useNavigate()

  async function onCopy(user: Member) {
    await navigator.clipboard.writeText(user.id)
    toast('Copied to the clipboard', {
      icon: <CopyIcon className="size-4"/>
    })
  }

  return (
    <TableRow>
      <TableCell className="font-medium whitespace-nowrap !text-xs">
        <Badge onClick={() => onCopy(props.member)} variant="outline" className="cursor-pointer">
          {props.member.id}
          <CopyIcon className="ml-2 -mr-1 size-2"/>
        </Badge>
      </TableCell>
      <TableCell
        onClick={() => navigate(`/structures/${props.structureId}/members/${props.member.id}/view`)}
        className="text-right cursor-pointer"
      >
        Actions
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
          <div className="mt-5">
            {/*<CreateUserDialog
              trigger={
                <Button variant="outline" size="sm">
                  <PlusIcon />
                  Créer un utilisateur
                </Button>
              }
            />*/}
          </div>
        </div>
      </div>
    </div>
  )
}
