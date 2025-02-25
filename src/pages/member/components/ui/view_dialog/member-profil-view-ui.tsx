import { Fragment } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/commons/components/ui/breadcrumb.tsx'
import { Member } from '@/data/models/user.ts'
import { Input } from '@/commons/components/ui/input.tsx'
import { Label } from '@/commons/components/ui/label.tsx'

type Props = {
  member: Member
  calculateCurrentAge: (value: string) => string
}

export default function MemberProfilViewUi(props: Props) {
  return (
    <Fragment>
      <header
        className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>
                  {props.member.user.firstname} {props.member.user.lastname}
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block"/>
              <BreadcrumbItem>
                <BreadcrumbPage>Profil</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <div className="flex gap-5">
          <div className="aspect-video size-32 rounded-md overflow-hidden">
            <img src={props.member.user.avatar} alt=""/>
          </div>
          <div className="flex flex-1 flex-col gap-4 w-full">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Prénom</Label>
              <Input className="pointer-events-none" defaultValue={props.member.user.firstname}/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Nom</Label>
              <Input className="pointer-events-none" defaultValue={props.member.user.lastname}/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>
                Date de naissance
                <span className="text-xs">({props.calculateCurrentAge(props.member.user.birthdate)} ans)</span>
              </Label>
              <Input className="pointer-events-none" defaultValue={props.member.user.birthdate}/>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
