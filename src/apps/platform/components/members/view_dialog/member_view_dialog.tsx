import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/commons/components/ui/dialog'
import MemberViewContent from '@/apps/platform/components/members/view_dialog/member_view_content'
import { useNavigate, useParams } from 'react-router'

export default function MemberViewDialog() {
  const navigate = useNavigate()
  const params = useParams()
  const [open, setOpen] = useState(!!params.memberId)

  useEffect(() => {
    setOpen(!!params.memberId)
  }, [params])

  function onOpen(value: boolean) {
    if (!value) {
      navigate(`/structures/${params.structureId}/members/overview`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent className="overflow-hidden !p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <MemberViewContent {...params} />
      </DialogContent>
    </Dialog>
  )
}
