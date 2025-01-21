import { Alert, AlertDescription, AlertTitle } from '@/commons/components/ui/alert.tsx'
import { AlertCircle } from 'lucide-react'
import { DeleteButton } from '@/commons/components/delete_button.tsx'
import { Fragment, useEffect } from 'react'
import { DialogResourceContext, toastVariant } from '@/commons/utils'
import { User } from '@/data/models/user.ts'
import { useDeleteUserMutation } from '@/data/api/user_api.ts'
import { toast } from 'sonner'

type Props<T> = DialogResourceContext<T>

export default function DangerZone(props: Props<User>) {
  const [handleDelete, result] = useDeleteUserMutation()

  useEffect(() => {
    if (result.isSuccess) {
      props.close()
      toast.success('Success', {
        ...toastVariant.success,
        description: 'User has been deleted.'
      })
    }

    if (result.isError) toast.error('Error', {
      ...toastVariant.error,
      description: 'An error occurred while deleting the user.'
    })
  }, [result])

  return (
    <Fragment>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4 !text-destructive"/>
        <AlertTitle>Attention</AlertTitle>
        <AlertDescription>
          Toute action effectuée dans cette zone est irréversible.
        </AlertDescription>
      </Alert>
      <DeleteButton
        word="confirmation"
        onSubmit={() => handleDelete(props.resource!.id)}
        variant="destructive"
        size="sm"
        className="mt-5"
        steps={['Supprimer le compte', 'Je confirme mon choix', 'En attente de validation']}
      >
        Supprimer
      </DeleteButton>
    </Fragment>
  )
}
