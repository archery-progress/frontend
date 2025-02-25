import { Member } from '@/data/models/user.ts'
import { DateTime } from 'luxon'
import MemberProfilViewUi from '@/pages/member/components/ui/view_dialog/member-profil-view-ui.tsx'

type Props = {
  member: Member
}

export default function MemberProfilViewFeature(props: Props) {
  function calculateCurrentAge(birthdate: string) {
    return DateTime.now()
      .diff(DateTime.fromISO(birthdate), 'years')
      .years.toString()
      .split('.')[0]
  }

  return (
    <MemberProfilViewUi
      member={props.member}
      calculateCurrentAge={calculateCurrentAge}
    />
  )
}
