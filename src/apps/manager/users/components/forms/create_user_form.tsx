import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/commons/components/ui/form.tsx'
import { useForm, useFormContext } from 'react-hook-form'
import { CreateUserFormSchema, createUserValidator } from '@/apps/manager/users/validators'
import { Input } from '@/commons/components/ui/input.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { Fragment, useEffect } from 'react'
import { DialogContext, toastVariant, usePermissionBitwise, useUserPermissions } from '@/commons/utils'
import { toast } from 'sonner'
import { useStoreUserMutation } from '@/data/api/user_api.ts'
import { Button } from '@/commons/components/ui/button.tsx'
import { Checkbox } from '@/commons/components/ui/checkbox.tsx'
import { Permission, PermissionKey } from '@/data/models/permission.ts'

type Props = DialogContext

type FormProps = {
  permissions: Partial<typeof Permission>
  onSubmit: (data: CreateUserFormSchema) => void
}

export function CreateUserForm(props: Props) {
  const [handleSubmit, result] = useStoreUserMutation()
  const {internals} = usePermissionBitwise()

  const form = useForm<CreateUserFormSchema>({
    resolver: zodResolver(createUserValidator),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password_confirmation: '',
      permissions: 0,
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
      <CreateUserFormUi
        permissions={internals}
        onSubmit={handleSubmit}
      />
    </Form>
  )
}

function CreateUserFormUi(props: FormProps) {
  const form = useFormContext<CreateUserFormSchema>()

  const {has, add, remove} = usePermissionBitwise()
  const {can} = useUserPermissions()

  return (
    <form id="create-user-form" onSubmit={form.handleSubmit(props.onSubmit)}>
      <div className="pt-5 flex flex-col gap-5">
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
                <Input
                  placeholder="john.doe@foo.bar"
                  disabled={!can('INTERNAL_MANAGER')}
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-5">
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" disabled={!can('INTERNAL_MANAGER')} {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password_confirmation"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Password confirmation</FormLabel>
                <FormControl>
                  <Input type="password" disabled={!can('INTERNAL_MANAGER')} {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <FormField
            control={form.control}
            name="permissions"
            render={({field}) => (
              <Fragment>
                <FormLabel>Permissions</FormLabel>
                <FormItem className="flex-1">
                  {Object.entries(props.permissions).map(([key, element]) => (
                    <FormItem
                      key={key}
                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow"
                    >
                      <FormControl>
                        <Checkbox
                          disabled={!can('INTERNAL_MANAGER')}
                          checked={has(field.value, key as PermissionKey)}
                          onCheckedChange={(value) => {
                            field.onChange(!value
                              ? remove(field.value, key as PermissionKey)
                              : add(field.value, key as PermissionKey))
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>{element.label}</FormLabel>
                        <FormDescription>{element.description}</FormDescription>
                      </div>
                    </FormItem>
                  ))}
                </FormItem>
              </Fragment>
            )}
          />
        </div>

        <Button type="submit" disabled={!form.formState.isValid}>
          Créer l'utilisateur
        </Button>
      </div>
    </form>
  )
}
