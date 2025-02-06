import { Fragment } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/commons/components/ui/breadcrumb.tsx'
import { Session } from '@/data/models/session.ts'
import { useForm, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditSessionFormSchema, editSessionValidator } from '@/apps/platform/validators/session_validator'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/commons/components/ui/form.tsx'
import { Input } from '@/commons/components/ui/input.tsx'
import { Label } from '@/commons/components/ui/label.tsx'
import { Textarea } from '@/commons/components/ui/textarea.tsx'
import { Calendar } from '@/commons/components/ui/calendar.tsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/commons/components/ui/popover.tsx'
import { Button } from '@/commons/components/ui/button.tsx'
import { cn, useQueryResult } from '@/commons/utils'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { useUpdateSessionMutation } from '@/data/api/session_api.ts'

type Props = {
  session: Session
}

export default function SessionView(props: Props) {
  const [handleUpdate, result] = useUpdateSessionMutation()

  const form = useForm<EditSessionFormSchema>({
    resolver: zodResolver(editSessionValidator),
    values: {
      name: props.session.name ?? undefined,
      description: props.session.description ?? undefined,
      targetDatetime: props.session.targetDatetime ? new Date(props.session.targetDatetime) : undefined
    }
  })

  useQueryResult(result, {
    onSuccess: 'La séance a été mise à jour',
    onError: 'Une erreur est survenue lors de la mise à jour de la séance'
  })

  return (
    <Fragment>
      <header
        className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>
                  Session {props.session.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block"/>
              <BreadcrumbItem>
                <BreadcrumbPage>Configuration</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <Form {...form}>
          <SessionConfigurationForm
            onSubmit={(values) => handleUpdate({
              structureId: props.session.structureId,
              sessionId: props.session.id,
              data: values
            })}
          />
        </Form>
      </div>
    </Fragment>
  )
}

type FormProps = {
  onSubmit: (values: EditSessionFormSchema) => void
}

function SessionConfigurationForm(props: FormProps) {
  const form = useFormContext<EditSessionFormSchema>()

  return (
    <form onSubmit={form.handleSubmit(props.onSubmit)}>
      <div className="flex gap-5">
        <div className="flex flex-1 flex-col gap-4 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormControl>
                <FormItem>
                  <Label>Intitulé</Label>
                  <Input {...field} type="text"/>
                </FormItem>
              </FormControl>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormControl>
                <FormItem>
                  <Label>Description</Label>
                  <Textarea {...field} rows={5}/>
                </FormItem>
              </FormControl>
            )}
          />
          <FormField
            control={form.control}
            name="targetDatetime"
            render={({field}) => (
              <FormControl>
                <FormItem className="flex flex-col">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Sélectionner une date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage/>
                </FormItem>
              </FormControl>
            )}
          />
        </div>
      </div>
      <div className="pt-5">
        <Button
          type="submit"
          disabled={!form.formState.isValid}
        >
          Mettre à jour
        </Button>
      </div>
    </form>
  )
}
