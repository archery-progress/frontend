import { EditUserProfilForm } from '@/apps/manager/users/components/forms/edit_user_profil_form.tsx'
import { EditResourceDialog } from '@/commons/components/edit_resource_dialog.tsx'
import { DialogResourceContext } from '@/commons/utils'
import { User } from '@/data/models/user.ts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/commons/components/ui/tabs.tsx'
import { SquarePenIcon } from 'lucide-react'
import { EditUserPermissionsForm } from '@/apps/manager/users/components/forms/edit_user_permissions_form.tsx'
import DangerZone from '@/apps/manager/users/components/forms/danger_zone.tsx'
import { EditUserAssetsForm } from '@/apps/manager/users/components/forms/edit_user_assets_form.tsx'

type Props = {
  dialogContext: DialogResourceContext<User>
}

export default function UserUpdateDialog(props: Props) {
  const { firstname, lastname } = props.dialogContext.resource ?? {}
  const username = `${firstname} ${lastname}`

  return (
    <EditResourceDialog
      title={(
        <div className="flex items-center gap-2">
          <SquarePenIcon className="w-5 h-5 opacity-80" />
          {username}
        </div>
      )}
      description="Edit the user account."
      {...props.dialogContext}
    >
      <Tabs defaultValue="profil">
        <TabsList>
          <TabsTrigger value="profil">Profil</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="logs">Activité</TabsTrigger>
          <TabsTrigger value="danger" className="border data-[state=inactive]:border-transparent data-[state=active]:border-destructive/50 data-[state=active]:text-destructive">
            Danger zone
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profil">
          <EditUserProfilForm {...props.dialogContext} />
        </TabsContent>
        <TabsContent value="permissions">
          <EditUserPermissionsForm {...props.dialogContext} />
        </TabsContent>
        <TabsContent value="assets">
          <EditUserAssetsForm {...props.dialogContext} />
        </TabsContent>
        <TabsContent value="logs">
          Logs
        </TabsContent>
        <TabsContent value="danger">
          <DangerZone {...props.dialogContext} />
        </TabsContent>
      </Tabs>

    </EditResourceDialog>
  )
}
