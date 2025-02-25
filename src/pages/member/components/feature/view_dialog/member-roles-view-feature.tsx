import { Member } from '@/data/models/user'
import { useForm } from 'react-hook-form'
import { EditMemberRolesFormSchema, editMemberRolesValidator } from '@/pages/member/member_validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/commons/components/ui/form'
import { useQueryResult } from '@/commons/utils'
import { useGetStructureRolesQuery } from '@/data/api/role_api'
import { useAddMemberRoleMutation, useRemoveMemberRoleMutation } from '@/data/api/member_api'
import MemberRolesViewUi from '@/pages/member/components/ui/view_dialog/member-roles-view-ui'

type Props = {
  member: Member
}

export default function MemberRolesViewFeature(props: Props) {
  const [handleAddQuery, resultMemberAdd] = useAddMemberRoleMutation()
  const [handleRemoveQuery, resultMemberRemove] = useRemoveMemberRoleMutation()

  const rolesQuery = useGetStructureRolesQuery({
    structureId: props.member.structure.id,
    queryParams: ''
  })

  const form = useForm<EditMemberRolesFormSchema>({
    resolver: zodResolver(editMemberRolesValidator),
    values: {
      roles: props.member.roles.map(role => role.id)
    }
  })

  const baseQueryUri = {
    structureId: props.member.structure.id,
    userId: props.member.user.id
  }

  const resultMessages = {
    onSuccess: 'Le membre a été mis à jour',
    onError: 'Une erreur est survenue lors de la mise à jour du membre'
  }

  useQueryResult(resultMemberAdd, resultMessages)
  useQueryResult(resultMemberRemove, resultMessages)

  return (
    <Form {...form}>
      <MemberRolesViewUi
        member={props.member}
        handleAddQuery={handleAddQuery}
        handleRemoveQuery={handleRemoveQuery}
        rolesQuery={rolesQuery}
        baseQueryUri={baseQueryUri}
      />
    </Form>
  )
}
