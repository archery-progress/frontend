import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/commons/components/ui/form.tsx'
import { useForm, useFormContext } from 'react-hook-form'
import { Input } from '@/commons/components/ui/input.tsx'
import { User, UserStatus } from '@/data/models/user.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { DialogResourceContext, toastVariant, useUserPermissions } from '@/commons/utils'
import { toast } from 'sonner'
import { useUpdateUserMutation } from '@/data/api/user_api.ts'
import { Button } from '@/commons/components/ui/button.tsx'
import { EditUserProfilFormSchema, editUserProfilValidator } from '@/apps/manager/users/validators.ts'

type Props<T> = DialogResourceContext<T>

type FormProps = {
  onSubmit: (data: EditUserProfilFormSchema) => void
}

export function EditUserProfilForm(props: Props<User>) {
  const [handleSubmit, result] = useUpdateUserMutation()

  const form = useForm<EditUserProfilFormSchema>({
    resolver: zodResolver(editUserProfilValidator),
    values: {
      id: props.resource?.id ?? '',
      firstname: props.resource?.firstname ?? '',
      lastname: props.resource?.lastname ?? '',
      email: props.resource?.email ?? '',
      status: props.resource?.status
        ? Object.values(UserStatus).find((element) => element === props.resource?.status)!
        : UserStatus.pending
    }
  })

  useEffect(() => {
    if (result.isSuccess) {
      props.close()
      toast.success('Success', {
        ...toastVariant.success,
        description: 'User has been created.'
      })
    }

    if (result.isError) toast.error('Error', {
      ...toastVariant.error,
      description: 'An error occurred while creating the user.'
    })
  }, [result])

  return (
    <Form {...form}>
      <EditUserFormUi onSubmit={(values) => handleSubmit({
        id: props.resource!.id,
        values
      })}/>
    </Form>
  )
}

function EditUserFormUi(props: FormProps) {
  const form = useFormContext<EditUserProfilFormSchema>()
  const { can } = useUserPermissions()

  return (
    <form id="update-user-form" onSubmit={form.handleSubmit(props.onSubmit)}>
      <div className="pt-5 flex flex-col gap-5">
        <FormField
          control={form.control}
          name="id"
          render={({field}) => (
            <FormItem className="flex-1">
              <FormLabel>Identifiant</FormLabel>
              <FormControl>
                <Input disabled={true} {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <div className="flex gap-5 w-full">
          <FormField
            control={form.control}
            name="firstname"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input placeholder="John" disabled={!can('INTERNAL_MANAGER')} {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" disabled={!can('INTERNAL_MANAGER')} {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@foo.bar" disabled={true} {...field} />
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
