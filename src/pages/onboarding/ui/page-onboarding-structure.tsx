import { Heading } from '@/commons/components/ui/heading.tsx'
import { useFormContext } from 'react-hook-form'
import { CreateStructureFormSchema } from '@/pages/onboarding/validators.ts'
import { Input } from '@/commons/components/ui/input.tsx'
import { FormField, FormMessage } from '@/commons/components/ui/form.tsx'
import { Textarea } from '@/commons/components/ui/textarea.tsx'
import BackButton from '@/pages/onboarding/components/back-button.tsx'
import NextButton from '@/pages/onboarding/components/next-button.tsx'
import { useNavigate } from 'react-router'
import { Fragment, MouseEvent } from 'react'
import { Step } from '@/pages/onboarding/components/progress-step.tsx'

export default function PageOnboardingStructure() {
  return (
    <div>
      <Heading>Créer une structure ✨</Heading>
      <p className="text-muted-foreground">Page de création de structure</p>
      <OnboardingForm/>
    </div>
  )
}

export function OnboardingForm() {
  const navigate = useNavigate()
  const form = useFormContext<CreateStructureFormSchema>()

  function onNextStep(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    navigate(`/onboarding/${Step.members}`)
  }

  return (
    <form id="onboarding-user-form">
      <div className="pt-5 flex flex-col gap-5">
        <div className="flex gap-5 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <Input
                {...field}
                className="bg-white"
                placeholder="Nom de la structure"
              />
            )}
          />
        </div>
        <div className="flex gap-5 w-full">
          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <Fragment>
                <Textarea
                  {...field}
                  rows={8}
                  className="bg-white"
                  placeholder="Description de la structure"
                />
                <FormMessage />
              </Fragment>
            )}
          />
        </div>
        <div className="flex justify-between">
          <BackButton/>
          <NextButton
            onClick={onNextStep}
            disabled={!form.formState.isValid}
          />
        </div>
      </div>
    </form>
  )
}
