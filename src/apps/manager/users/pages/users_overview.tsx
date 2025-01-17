import { usePaginateUsersQuery } from '@/data/api/user_api.ts'
import { ApplicationLayout } from '@/commons/components/layouts/default/layout.tsx'
import { Searchbar } from '@/commons/components/searchbar.tsx'
import TableFilter, { ComponentFilter } from '@/commons/components/table_filter.tsx'
import { AsyncData } from '@/commons/components/async_data.tsx'
import { Paginated, State } from '@/commons/utils'
import { User, UserStatus } from '@/data/models/user.ts'
import { useSearchParams } from 'react-router'
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/commons/components/ui/table.tsx'
import { Badge } from '@/commons/components/ui/badge.tsx'
import { CopyIcon } from 'lucide-react'
import { toast } from 'sonner'

export function UsersOverview() {
  const [searchParams] = useSearchParams()
  const paginatedUsersQuery = usePaginateUsersQuery(searchParams.toString())
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    paginatedUsersQuery.refetch()
  }, [searchParams])

  return (
    <ApplicationLayout
      mode="manager"
      breadcrumb={[
        {label: 'Manager', url: '/manager'},
        {label: 'Users overview', url: '/manager/accounts/users'}
      ]}
      trailing={
        <div className="flex items-center justify-end gap-x-2">
          <Searchbar
            placeholder="Search for a user..."
            searchKey="search"
            redirect="/manager/accounts/users/overview"
          />

          <AsyncData<Paginated<User>>
            source={paginatedUsersQuery}
            onData={(users) => (
              <TableFilter
                itemPerPage={users.meta.perPage}
                resources={filterOptions}
                resourceRoute="/manager/accounts/users/overview"
              />
            )}
          />

          {/*<Protected permissions="manager:users:store">*/}
          {/*  <CreateUserDialog trigger={<Button size="sm">New user</Button>} />*/}
          {/*</Protected>*/}
        </div>
      }
    >
      <div>
        <div className="p-5 border-b">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            User accounts
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your user accounts. You can create, update, delete, and view user accounts.
          </p>
        </div>
        <AsyncData<Paginated<User>>
          source={paginatedUsersQuery}
          onLoading={<p>Loading...</p>}
          onData={(users) => (
            <Table meta={users.meta} empty={<EmptyData/>}>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead className="w-[300px]">Identité</TableHead>
                  <TableHead>Type de compte</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody
                data={users.data}
                builder={(user) => (
                  <RowBuilder key={user.uid} user={user} state={[selectedUser, setSelectedUser]}/>
                )}
              />
            </Table>
          )}
        />
      </div>
    </ApplicationLayout>
  )
}

function RowBuilder(props: { user: User; state: State<User | null> }) {
  const [, setSelectedUser] = props.state

  async function onCopy(user: User) {
    await navigator.clipboard.writeText(user.uid)
    toast('Copied to the clipboard', {
      icon: <CopyIcon className="size-4"/>
    })
  }

  return (
    <TableRow>
      <TableCell className="font-medium whitespace-nowrap !text-xs">
        <Badge onClick={() => onCopy(props.user)} variant="outline" className="cursor-pointer">
          {props.user.uid}
          <CopyIcon className="ml-2 -mr-1 size-2"/>
        </Badge>
      </TableCell>
      <TableCell onClick={() => setSelectedUser(props.user)} className="cursor-pointer">
        {props.user.firstname} {props.user.lastname}
      </TableCell>
      <TableCell
        onClick={() => setSelectedUser(props.user)}
        className="flex items-center gap-x-2 cursor-pointer"
      >
        <Badge variant="outline">{props.user.type}</Badge>
        {props.user.status === UserStatus.disabled && (
          <Badge variant="destructive">Deactivate</Badge>
        )}
        {props.user.status === UserStatus.verified && <Badge variant="success">Activate</Badge>}
        {props.user.status === UserStatus.pending && <Badge variant="secondary">Pending</Badge>}
      </TableCell>
      <TableCell onClick={() => setSelectedUser(props.user)} className="text-right cursor-pointer">
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

const filterOptions: ComponentFilter = [
  {
    type: 'combobox',
    label: 'Account types',
    multiple: false,
    searchKey: 'type',
    options: [
      {label: 'Staff', value: 'staff'},
      {label: 'Practitioner', value: 'practitioner'},
      {label: 'User', value: 'user'}
    ]
  },
  {
    type: 'combobox',
    label: 'Account status',
    multiple: false,
    searchKey: 'status',
    options: Object.values(UserStatus).map((status) => ({
      label: status,
      value: status
    }))
  }
]
