import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/commons/components/ui/form.tsx'
import { Button } from '@/commons/components/ui/button.tsx'
import { Input } from '@/commons/components/ui/input.tsx'
import { ReactNode } from 'react'

import { UseFormReturn } from 'react-hook-form'
import { LoginFormSchema } from '../validators/login_validator'

type Props = {
  form: UseFormReturn<LoginFormSchema>
  onSubmit: (data: LoginFormSchema) => void
  actions?: ReactNode
  id?: string
}

export default function LoginForm(props: Props) {
  return (
    <Form {...props.form}>
      <form id={props.id} onSubmit={props.form.handleSubmit(props.onSubmit)}>
        <div className="flex flex-col gap-5">
          <FormField
            control={props.form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" aria-autocomplete="both" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={props.form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" aria-autocomplete="both" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" size="sm" className="mt-5">
          Connexion
        </Button>
      </form>
    </Form>
  )
}
