import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/commons/components/ui/form.tsx'
import { useForm, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn, DialogResourceContext, toastVariant, usePermissionBitwise, useUserPermissions } from '@/commons/utils'
import { Button } from '@/commons/components/ui/button.tsx'
import { EditUserPermissionsFormSchema, editUserPermissionsValidator } from '@/apps/manager/users/validators.ts'
import { Checkbox } from '@/commons/components/ui/checkbox.tsx'
import { useUpdateUserMutation } from '@/data/api/user_api.ts'
import { User } from '@/data/models/user.ts'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Permission, PermissionKey } from '@/data/models/permission.ts'

type Props<T> = DialogResourceContext<T>

type FormProps = {
  onSubmit: (data: EditUserPermissionsFormSchema) => void
  permissions: Partial<typeof Permission>
}

export function EditUserPermissionsForm(props: Props<User>) {
  const {internals} = usePermissionBitwise()
  const [handleSubmit, result] = useUpdateUserMutation()

  const form = useForm<EditUserPermissionsFormSchema>({
    resolver: zodResolver(editUserPermissionsValidator),
    values: {
      permissions: props.resource?.permissions ?? 0
    }
  })

  useEffect(() => {
    if (result.isSuccess) {
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

  function onSubmit(values: EditUserPermissionsFormSchema) {
    handleSubmit({
      id: props.resource!.id,
      values
    })
  }

  return (
    <Form {...form}>
      <EditUserPermissionsFormUi
        permissions={internals}
        onSubmit={onSubmit}
      />
    </Form>
  )
}

function EditUserPermissionsFormUi(props: FormProps) {
  const {has, add, remove} = usePermissionBitwise()
  const {can} = useUserPermissions()

  const form = useFormContext<EditUserPermissionsFormSchema>()

  const opacity = cn(!can('INTERNAL_MANAGER') && 'opacity-50')

  return (
    <form id="update-user-form" onSubmit={form.handleSubmit(props.onSubmit)}>
      <div className="pt-5 flex flex-col gap-5">
        <div className="flex gap-5 w-full">
          <FormField
            control={form.control}
            name="permissions"
            render={({field}) => (
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
                      <FormLabel className={opacity}>
                        {element.label}
                      </FormLabel>
                      <FormDescription className={opacity}>
                        {element.description}
                      </FormDescription>
                    </div>
                  </FormItem>
                ))}
              </FormItem>
            )}
          />
        </div>
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
