import { Form, FormControl, FormField, FormItem, FormMessage } from '@/commons/components/ui/form.tsx'
import { useForm, useFormContext } from 'react-hook-form'
import { User } from '@/data/models/user.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { DialogResourceContext, toastVariant, useUserPermissions } from '@/commons/utils'
import { toast } from 'sonner'
import { useGetUserQuery, useUpdateUserAssetsMutation } from '@/data/api/user_api.ts'
import { Button } from '@/commons/components/ui/button.tsx'
import { EditUserAssetsFormSchema, editUserAssetsValidator } from '@/apps/manager/users/validators.ts'
import { InputImage } from '@/commons/components/input_image.tsx'
import { AsyncData } from '@/commons/components/async_data.tsx'
import { ErrorFormBox } from '@/commons/components/error_form_box.tsx'

type Props<T> = DialogResourceContext<T>

type FormProps = {
  onSubmit: (data: EditUserAssetsFormSchema) => void
  user: User
}

export function EditUserAssetsForm(props: Props<User>) {
  const [handleSubmit, result] = useUpdateUserAssetsMutation()
  const userQuery = useGetUserQuery(props.resource?.id ?? '', {
    skip: !props.resource
  })

  const form = useForm<EditUserAssetsFormSchema>({
    resolver: zodResolver(editUserAssetsValidator),
    values: {
      avatar: undefined as never
    }
  })

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Success', {
        ...toastVariant.success,
        description: 'User has been updated.'
      })
    }

    if (result.isError) toast.error('Error', {
      ...toastVariant.error,
      description: 'An error occurred while updating the user.'
    })
  }, [result])

  return (
    <Form {...form}>
      <AsyncData<User>
        source={userQuery}
        onError={(error) => <ErrorFormBox error={error} />}
        onData={(user) => (
          <EditUserFormUi
            user={user}
            onSubmit={(values) => handleSubmit({
              id: props.resource!.id,
              values
            })}
          />
        )}
      />
    </Form>
  )
}

function EditUserFormUi(props: FormProps) {
  const form = useFormContext<EditUserAssetsFormSchema>()
  const {can} = useUserPermissions()

  return (
    <form id="update-user-form" onSubmit={form.handleSubmit(props.onSubmit)}>
      <div className="pt-5 flex flex-col gap-5">
        <FormField
          control={form.control}
          name="avatar"
          render={({field: {value, onChange, ...fields}}) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <InputImage
                    {...fields}
                    defaultValue={props.user?.avatar}
                    value={value}
                    name="logo"
                    onFileChange={onChange}
                    className="w-[64] h-[64] aspect-square object-cover"
                  />
                </div>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
      </div>
      <div className="pt-5">
        <Button
          type="submit"
          disabled={!form.formState.isValid || !can('INTERNAL_MANAGER')}
        >
          Mettre à jour
        </Button>
      </div>
    </form>
  )
}
