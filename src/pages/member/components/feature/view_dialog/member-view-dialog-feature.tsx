import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import MemberViewDialogUi from '@/pages/member/components/ui/view_dialog/member-view-dialog-ui.tsx'

export default function MemberViewDialogFeature() {
  const navigate = useNavigate()
  const params = useParams()
  const [open, setOpen] = useState(!!params.memberId)

  useEffect(() => {
    setOpen(!!params.memberId)
  }, [params])

  function handleOpen(value: boolean) {
    if (!value) {
      navigate(`/structures/${params.structureId}/members/overview`)
    }
  }

  return (
    <MemberViewDialogUi
      open={open}
      onOpen={handleOpen}
      params={params}
    />
  )
}
