import { Member } from '@/data/models/user.ts'
import MemberLicenceViewUi from '@/pages/member/components/ui/view_dialog/member-licence-view-ui.tsx'

type Props = {
  member: Member
}

export default function MemberLicenceViewFeature(props: Props) {
  return <MemberLicenceViewUi member={props.member} />
}
