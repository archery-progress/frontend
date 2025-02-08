import { Fragment } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/commons/components/ui/breadcrumb.tsx'
import { Session } from '@/data/models/session.ts'
import { Paginated, useQueryResult } from '@/commons/utils'
import { useAddParticipantMutation, useRemoveParticipantMutation } from '@/data/api/session_api.ts'
import { usePaginateMembersQuery } from '@/data/api/member_api.ts'
import { AsyncData } from '@/commons/components/async_data.tsx'
import { Member } from '@/data/models/user.ts'
import { Combobox } from '@/commons/components/ui/combobox.tsx'
import { Description } from '@radix-ui/react-dialog'

type Props = {
  session: Session
}

export default function SessionParticipantView(props: Props) {
  const [handleAddParticipant, addParticipantResult] = useAddParticipantMutation()
  const [handleRemoveParticipant, removeParticipantResult] = useRemoveParticipantMutation()

  const membersQuery = usePaginateMembersQuery({
    structureId: props.session.structureId,
    queryParams: 'limit=99999'
  })

  useQueryResult(addParticipantResult, {
    onSuccess: 'Participant Ajouté',
    onError: 'Une erreur est survenue lors de l\'ajout du participant'
  })

  useQueryResult(removeParticipantResult, {
    onSuccess: 'Participant retiré',
    onError: 'Une erreur est survenue lors de la suppression du participant'
  })

  function filterAvailableMembers(members: Member[]) {
    return members.filter((member) => {
      return !props.session.participants.some((participant) => participant.memberId === member.id)
    })
  }

  return (
    <Fragment>
      <header
        className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>
                  Session {props.session.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block"/>
              <BreadcrumbItem>
                <BreadcrumbPage>Participants</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <AsyncData<Paginated<Member>>
          source={membersQuery}
          onData={(members) => (
            <SessionParticipantForm
              session={props.session}
              onAddParticipant={(memberId) => handleAddParticipant({
                structureId: props.session.structureId,
                sessionId: props.session.id,
                memberId
              })}
              onRemoveParticipant={(memberId) => handleRemoveParticipant({
                structureId: props.session.structureId,
                sessionId: props.session.id,
                memberId
              })}
              members={filterAvailableMembers(members.data)}
            />
          )}
        />
      </div>
    </Fragment>
  )
}

type FormProps = {
  session: Session
  members: Member[]
  onAddParticipant: (memberId: string) => void
  onRemoveParticipant: (memberId: string) => void
}

function SessionParticipantForm(props: FormProps) {
  function formatOption(member: Member) {
    return {label: `${member.user.firstname} ${member.user.lastname}`, value: member.id}
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Combobox
          clearOnSelect
          items={props.members.map(formatOption)}
          onChange={props.onAddParticipant}
          notFoundPlaceholder="Aucun membre disponible"
          placeholder="Ajouter un participant"
        />
        <Description className="text-[0.8rem] text-muted-foreground">
          Veillez à ajouter vos participants après avoir configuré la session.
        </Description>
      </div>

      <div>
        {props.session.participants.map((participant) => (
          <p key={participant.id}>{participant.member.user.firstname}</p>
        ))}
      </div>
    </div>
  )
}
