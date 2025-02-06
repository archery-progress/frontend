import { useNavigate, useParams, useSearchParams } from 'react-router'
import { ApplicationLayout } from '@/commons/components/layouts/default/layout.tsx'
import { DialogResourceContext, Paginated, useDialogResource } from '@/commons/utils'
import { useEffect } from 'react'
import { AsyncData } from '@/commons/components/async_data.tsx'
import TableFilter from '@/commons/components/table_filter.tsx'
import { Searchbar } from '@/commons/components/searchbar.tsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/commons/components/ui/table.tsx'
import { Badge } from '@/commons/components/ui/badge.tsx'
import { DateTime } from 'luxon'
import { Button } from '@/commons/components/ui/button.tsx'
import { usePaginateSessionsQuery, useStoreSessionMutation } from '@/data/api/session_api.ts'
import { Session } from '@/data/models/session.ts'
import SessionViewDialog from '@/apps/platform/components/sessions/view_dialog/session_view_dialog.tsx'

export function SessionsOverview() {
  const navigate = useNavigate()
  const params = useParams()
  const [searchParams] = useSearchParams()

  const [handleCreateSession, result] = useStoreSessionMutation()
  const paginatedSessionsQuery = usePaginateSessionsQuery({
    structureId: params.structureId,
    queryParams: searchParams.toString()
  }, {skip: !params.structureId})

  const editDialogProps = useDialogResource<Session>()

  useEffect(() => {
    paginatedSessionsQuery.refetch()
  }, [searchParams])

  useEffect(() => {
    if (result.isSuccess) {
      navigate(`/structures/${params.structureId}/sessions/${result.data.id}/view`)
    }
  }, [result])

  return (
    <ApplicationLayout
      mode="platform"
      breadcrumb={[
        {label: 'Accueil', url: `/platform/${params.structureId}/overview`},
        {label: 'Séances', url: `/platform/${params.structureId}/sessions/overview`}
      ]}
      trailing={
        <div className="flex items-center justify-end gap-x-2">
          <Searchbar
            placeholder="Search for a user..."
            searchKey="search"
            redirect={`/structures/${params.structureId}/sessions/overview`}
          />

          <AsyncData<Paginated<Session>>
            source={paginatedSessionsQuery}
            onData={(sessions) => (
              <TableFilter
                itemPerPage={sessions.meta.perPage}
                resources={[]}
                resourceRoute={`/structures/${params.structureId}/sessions/overview+`}
              />
            )}
          />
        </div>
      }
    >
      <div>
        <div className="p-5 border-b">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Séances d'entrainement
          </h2>
          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              Gestion des séances d'entrainement.
            </p>
            <div>
              <Button
                variant="default"
                onClick={() => handleCreateSession({
                  structureId: params.structureId,
                })}
              >
                Créer une séance
              </Button>
            </div>
          </div>
          </div>
          <AsyncData<Paginated<Session>>
            source={paginatedSessionsQuery}
            onLoading={<p>Loading...</p>}
          onData={(sessions) => (
            <Table meta={sessions.meta} empty={<EmptyData/>}>
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
                data={sessions.data}
                builder={(session) => (
                  <RowBuilder
                    key={session.id}
                    structureId={params.structureId}
                    session={session}
                    {...editDialogProps}
                  />
                )}
              />
            </Table>
          )}
        />
      </div>
      <SessionViewDialog/>
    </ApplicationLayout>
  )
}

function RowBuilder(props: DialogResourceContext<Session> & { structureId?: string, session: Session }) {
  const navigate = useNavigate()

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => navigate(`/structures/${props.structureId}/sessions/${props.session.id}/view`)}
    >
      <TableCell className="font-medium whitespace-nowrap !text-xs">
        <Badge variant="outline">
          {props.session.targetDatetime ? (
            DateTime.fromISO(props.session.targetDatetime).toLocaleString(DateTime.DATETIME_MED)
          ) : (
            'Aucune date'
          )}
        </Badge>
      </TableCell>
      <TableCell>
        <p>{props.session.memberId}</p>
      </TableCell>
      <TableCell className="text-right">
        <p className="text-sm">
          {DateTime.fromISO(props.session.updatedAt ?? props.session.createdAt).toLocaleString(DateTime.DATETIME_MED)}
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
