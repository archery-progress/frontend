import { Heading } from "@/commons/components/ui/heading"
import { User } from "@/data/models/user"

export interface PageGeneralProps {
  user: User
}

export default function PageGeneral(props: PageGeneralProps) {
  return (
    <div>

      <div className="flex mb-4">
        <Heading size={3}>Informations générales</Heading>
      </div>
      <div className="flex items-center gap-4 w-full lg:w-3/5 border p-6 rounded-md">
        <img 
          src={props.user.avatar} 
          alt={props.user.firstname} 
          className="w-26 h-26 rounded-xl"
        />

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{props.user.firstname}</span>
            <span className="text-2xl font-bold">{props.user.lastname}</span>
          </div>
          <span className="text-sm text-gray-700 font-semibold">Membre depuis: <span className="text-gray-500 font-normal">29 août 2022</span></span>
          <span className="text-sm text-gray-700 font-semibold">E-mail: <span className="text-gray-500 font-normal">{props.user.email}</span></span>
        </div>
      </div>
    </div>
  )
}