import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/commons/components/ui/form.tsx'
import { useForm, useFormContext } from 'react-hook-form'
import { EditUserFormSchema, editUserValidator } from '@/apps/manager/users/validators'
import { Input } from '@/commons/components/ui/input.tsx'
import SelectBox from '@/commons/components/ui/select.tsx'
import { User, UserStatus } from '@/data/models/user.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { Fragment, useEffect } from 'react'
import { DialogResourceContext, Paginated, permission, toastVariant, useUserPermissions } from '@/commons/utils'
import { toast } from 'sonner'
import { useUpdateUserMutation } from '@/data/api/user_api.ts'
import { usePaginateRolesQuery } from '@/data/api/role_api.ts'
import { AsyncData } from '@/commons/components/async_data.tsx'
import { Role } from '@/data/models/role.ts'
import { Button } from '@/commons/components/ui/button.tsx'
import { usePaginateStructuresQuery } from '@/data/api/structure_api.ts'
import { Structure } from '@/data/models/structure.ts'
import { ErrorFormBox } from '@/commons/components/error_form_box.tsx'

type Props<T> = DialogResourceContext<T>

type FormProps = {
  onSubmit: (data: EditUserFormSchema) => void
}

export function EditUserForm(props: Props<User>) {
  const [handleSubmit, result] = useUpdateUserMutation()

  const form = useForm<EditUserFormSchema>({
    resolver: zodResolver(editUserValidator),
    values: {
      uid: props.resource?.uid ?? '',
      firstname: props.resource?.firstname ?? '',
      lastname: props.resource?.lastname ?? '',
      email: props.resource?.email ?? '',
      roles: props.resource?.roles?.map((role) => role.id.toString()) ?? [],
      structure: [],
      type: props.resource?.type as unknown as string,
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
        uid: props.resource!.uid,
        values
      })}/>
    </Form>
  )
}

function EditUserFormUi(props: FormProps) {
  const paginatedRolesQuery = usePaginateRolesQuery('')
  const paginatedStructuresQuery = usePaginateStructuresQuery('')

  const form = useFormContext<EditUserFormSchema>()
  const canBeUse = useUserPermissions(permission.users('update', true))

  return (
    <form id="update-user-form" onSubmit={form.handleSubmit(props.onSubmit)}>
      <div className="pt-5 flex flex-col gap-5">
        <FormField
          control={form.control}
          name="uid"
          render={({field}) => (
            <FormItem className="flex-1">
              <FormLabel>Uid</FormLabel>
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
                  <Input placeholder="John" disabled={!canBeUse} {...field} />
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
                  <Input placeholder="Doe" disabled={!canBeUse} {...field} />
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
                <Input placeholder="john.doe@foo.bar" disabled={!canBeUse} {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <div className="flex gap-5 w-full">
          <div>
            <FormField
              control={form.control}
              name="type"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Account type</FormLabel>
                  <FormControl>
                    <SelectBox
                      options={[
                        {label: 'Staff', value: 'staff'},
                        {label: 'Practitioner', value: 'practitioner'},
                        {label: 'User', value: 'user'}
                      ]}
                      defaultValue={field.value}
                      onChange={field.onChange}
                      placeholder="Select type..."
                      inputPlaceholder="Search type"
                      emptyPlaceholder="No type found."
                      disabled={!canBeUse}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="roles"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Roles</FormLabel>
                  <AsyncData<Paginated<Role>>
                    source={paginatedRolesQuery}
                    onError={(error) => <ErrorFormBox error={error}/>}
                    onData={(roles) => (
                      <FormControl>
                        <SelectBox
                          options={roles.data.map((role) => ({
                            label: role.name,
                            value: role.id.toString()
                          }))}
                          defaultValue={field.value}
                          onChange={field.onChange}
                          placeholder="Select roles..."
                          inputPlaceholder="Search roles"
                          emptyPlaceholder="No role found."
                          multiple
                          disabled={!canBeUse}
                        />
                      </FormControl>
                    )}/>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="status"
          render={({field}) => (
            <Fragment>
              <FormLabel>Club</FormLabel>
              <AsyncData<Paginated<Structure>>
                source={paginatedStructuresQuery}
                onError={(error) => <ErrorFormBox error={error}/>}
                onData={(structures) => (
                  <FormControl>
                    <SelectBox
                      options={structures.data.map((role) => ({
                        label: role.name,
                        value: role.id.toString()
                      }))}
                      defaultValue={field.value}
                      onChange={field.onChange}
                      placeholder="Select club..."
                      inputPlaceholder="Search club"
                      emptyPlaceholder="No club found."
                      disabled={!canBeUse}
                    />
                  </FormControl>
                )}
              />
              <FormMessage/>
            </Fragment>
          )}
        />

        <Button type="submit" disabled={!form.formState.isValid}>
          Mettre à jour
        </Button>
      </div>
    </form>
  )
}
