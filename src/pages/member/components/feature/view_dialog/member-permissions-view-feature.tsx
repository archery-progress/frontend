import { Member } from '@/data/models/user'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/commons/components/ui/form.tsx'
import { useQueryResult } from '@/commons/utils'
import { useUpdateMemberMutation } from '@/data/api/member_api.ts'
import MemberRolesViewUi from '@/pages/member/components/ui/view_dialog/member-permissions-ui.tsx'
import { EditMemberPermissionsFormSchema, editMemberPermissionsValidator } from '@/pages/member/member_validator.ts'

type Props = {
  member: Member
}

export default function MemberPermissionsViewFeature(props: Props) {
  const [handlePermissionUpdate, result] = useUpdateMemberMutation()

  const form = useForm<EditMemberPermissionsFormSchema>({
    resolver: zodResolver(editMemberPermissionsValidator),
    values: {
      permissions: props.member.permissions ?? 0
    }
  })

  useQueryResult(result, {
    onSuccess: 'Le membre a été mis à jour',
    onError: 'Une erreur est survenue lors de la mise à jour du membre'
  })

  return (
    <Form {...form}>
      <MemberRolesViewUi
        member={props.member}
        handlePermissionUpdate={handlePermissionUpdate}
      />
    </Form>
  )
}
