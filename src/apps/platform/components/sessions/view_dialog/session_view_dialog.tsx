import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/commons/components/ui/dialog'
import { useNavigate, useParams } from 'react-router'
import SessionViewContent from '@/apps/platform/components/sessions/view_dialog/session_view_content.tsx'

export default function SessionViewDialog() {
  const navigate = useNavigate()
  const params = useParams()
  const [open, setOpen] = useState(!!params.sessionId)

  useEffect(() => {
    setOpen(!!params.sessionId)
  }, [params])

  function onOpen(value: boolean) {
    if (!value) {
      navigate(`/structures/${params.structureId}/sessions/overview`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent className="overflow-hidden !p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <SessionViewContent {...params} />
      </DialogContent>
    </Dialog>
  )
}
