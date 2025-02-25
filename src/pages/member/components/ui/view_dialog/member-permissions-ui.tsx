import { Fragment } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/commons/components/ui/breadcrumb.tsx'
import { Member } from '@/data/models/user'
import { useFormContext } from 'react-hook-form'
import { EditMemberPermissionsFormSchema } from '@/apps/platform/validators/member_validator.ts'
import { FormControl, FormField, FormItem, FormLabel } from '@/commons/components/ui/form.tsx'
import { Checkbox } from '@/commons/components/ui/checkbox.tsx'
import { cn, useCurrentMemberPermissions, usePermissionBitwise } from '@/commons/utils'
import { useParams } from 'react-router'
import { PermissionKey } from '@/data/models/permission.ts'
import { Check } from 'lucide-react'
import { MutateMemberRequest } from '@/data/contracts/member.ts'

type Props = {
  member: Member
  handlePermissionUpdate: (payload: MutateMemberRequest) => void
}

export default function MemberRolesViewUi(props: Props) {
  return (
    <Fragment>
      <header className="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div>
          <div className="flex items-center gap-2 px-4 h-12">
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
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <MemberPermissionForm
          onChange={(permissions) => props.handlePermissionUpdate({
            structureId: props.member.structure.id,
            memberId: props.member.id,
            data: {permissions}
          })}
        />
      </div>
    </Fragment>
  )
}

type FormProps = {
  onChange: (permissions: number) => void
}

function MemberPermissionForm(props: FormProps) {
  const params = useParams()
  const form = useFormContext<EditMemberPermissionsFormSchema>()

  const {can} = useCurrentMemberPermissions(params.structureId)
  const opacity = cn(!can('MANAGE_ROLES') && 'opacity-50')

  const {has, add, remove, structures} = usePermissionBitwise()

  return (
    <form id="update-user-form">
      <div className="pt-5 flex flex-col gap-5">
        <div className="flex gap-5 w-full">
          <FormField
            control={form.control}
            name="permissions"
            render={({field}) => (
              <FormItem className="flex-1">
                {Object.entries(structures).map(([key, permission]) => {
                  return (
                    <FormControl>
                      <FormItem
                        key={key}
                        className={cn(
                          'flex flex-row items-center space-x-3 space-y-0 rounded-md border border-slate-200 p-2',
                          has(field.value, key as PermissionKey) && 'border-blue-400 bg-blue-50'
                        )}
                      >
                        <FormLabel
                          htmlFor={key}
                          className={cn(opacity, 'flex items-center justify-between gap-2 w-full cursor-pointer')}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                'size-8 rounded flex items-center justify-center',
                                has(field.value, key as PermissionKey) ? 'bg-blue-200' : 'bg-accent'
                              )}
                            >
                              <p className="text-foreground uppercase">{permission.label.charAt(0)}</p>
                            </div>
                            <Checkbox
                              id={key}
                              className="hidden"
                              name={field.name}
                              checked={has(field.value, key as PermissionKey)}
                              onCheckedChange={(value) => {
                                const newValue = !value
                                  ? remove(field.value, key as PermissionKey)
                                  : add(field.value, key as PermissionKey)

                                field.onChange(newValue)
                                props.onChange(newValue)
                              }}
                            />
                            <div>
                              <p className="text-sm">{permission.label}</p>
                              <p className="text-xs">{permission.description}</p>
                            </div>
                          </div>
                          {has(field.value, key as PermissionKey) && (
                            <div className="flex items-center">
                              <Check className="size-4 text-blue-600"/>
                            </div>
                          )}
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
