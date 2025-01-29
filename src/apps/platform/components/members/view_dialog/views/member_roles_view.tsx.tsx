import { Fragment } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/commons/components/ui/breadcrumb.tsx'
import { Member } from '@/data/models/user'
import { Role } from '@/data/models/role'
import { useForm, useFormContext } from 'react-hook-form'
import { EditMemberRolesFormSchema, editMemberRolesValidator } from '@/apps/platform/validators/user_validator.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/commons/components/ui/form.tsx'
import { Checkbox } from '@/commons/components/ui/checkbox.tsx'
import { cn, Paginated, useCurrentMemberPermissions, useQueryResult } from '@/commons/utils'
import { useParams } from 'react-router'
import { useGetStructureRolesQuery } from '@/data/api/role_api.ts'
import { AsyncData } from '@/commons/components/async_data.tsx'
import { useAddMemberRoleMutation, useRemoveMemberRoleMutation } from '@/data/api/member_api.ts'

type Props = {
  member: Member
}

export default function MemberRolesView(props: Props) {
  const [handleAddQuery, resultMemberAdd] = useAddMemberRoleMutation()
  const [handleRemoveQuery, resultMemberRemove] = useRemoveMemberRoleMutation()

  const rolesQuery = useGetStructureRolesQuery({
    structureId: props.member.structure.id,
    queryParams: ''
  })

  const form = useForm<EditMemberRolesFormSchema>({
    resolver: zodResolver(editMemberRolesValidator),
    values: {
      roles: props.member.roles.map(role => role.id)
    }
  })

  const baseQueryUri = {
    structureId: props.member.structure.id,
    userId: props.member.user.id
  }

  const resultMessages = {
    onSuccess: 'Le membre a été mis à jour',
    onError: 'Une erreur est survenue lors de la mise à jour du membre'
  }

  useQueryResult(resultMemberAdd, resultMessages)
  useQueryResult(resultMemberRemove, resultMessages)

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
                <BreadcrumbPage>Roles</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <Form {...form}>
          <AsyncData<Paginated<Role>>
            source={rolesQuery}
            onData={(roles) => (
              <MemberRoleForm
                roles={roles.data}
                onRoleAdd={(id: string) => handleAddQuery({
                  ...baseQueryUri,
                  roleId: id
                })}
                onRoleRemove={(id: string) => handleRemoveQuery({
                  ...baseQueryUri,
                  roleId: id
                })}
              />
            )}
          />
        </Form>
      </div>
    </Fragment>
  )
}

type FormProps = {
  onRoleAdd: (id: string) => void
  onRoleRemove: (id: string) => void
  roles: Role[]
}

function MemberRoleForm(props: FormProps) {
  const params = useParams()
  const form = useFormContext<EditMemberRolesFormSchema>()

  const {can} = useCurrentMemberPermissions(params.structureId)
  const opacity = cn(!can('MANAGE_ROLES') && 'opacity-50')

  return (
    <form id="update-user-form">
      <div className="pt-5 flex flex-col gap-5">
        <div className="flex gap-5 w-full">
          <FormField
            control={form.control}
            name="roles"
            render={({field}) => (
              <FormItem className="flex-1">
                {props.roles.map((role) => {
                  return (
                    <FormControl>
                      <FormItem
                        key={role.id}
                        className={cn(
                          'flex flex-row items-center space-x-3 space-y-0 rounded-md border border-slate-200 p-2',
                          field.value.includes(role.id) && 'border-blue-400 bg-blue-50'
                        )}
                      >
                        <FormLabel htmlFor={role.id}
                                   className={cn(opacity, 'flex items-center gap-2 w-full cursor-pointer')}>
                          <div
                            className={cn(
                              'size-8 rounded flex items-center justify-center',
                              field.value.includes(role.id) ? 'bg-blue-200' : 'bg-accent'
                            )}
                          >
                            <p className="text-foreground uppercase">{role.name.charAt(0)}</p>
                          </div>
                          <Checkbox
                            id={role.id}
                            className="hidden"
                            checked={field.value.includes(role.id)}
                            onCheckedChange={(value) => {
                              if (value) {
                                props.onRoleAdd(role.id)
                                field.onChange([...field.value, role.id])
                              } else {
                                props.onRoleRemove(role.id)
                                field.onChange(field.value.filter((id) => id !== role.id))
                              }
                            }}
                          />
                          <p className="text-sm">{role.name}</p>
                        </FormLabel>
                      </FormItem>
                    </FormControl>
                  )
                })}
              </FormItem>
            )}
          />
        </div>
      </div>
    </form>
  )
}
