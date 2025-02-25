import { Dialog, DialogContent } from '@/commons/components/ui/dialog'
import MemberViewContentFeature from '@/pages/member/components/feature/view_dialog/member-view-content-feature.tsx'
import { Params } from 'react-router'

type Props = {
  open: boolean
  onOpen: (value: boolean) => void
  params: Readonly<Params<string>>
}

export default function MemberViewDialogUi(props: Props) {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpen}>
      <DialogContent className="overflow-hidden !p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <MemberViewContentFeature {...props.params} />
      </DialogContent>
    </Dialog>
  )
}
