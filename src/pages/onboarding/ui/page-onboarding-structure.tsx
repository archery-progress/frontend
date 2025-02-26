import { Heading } from '@/commons/components/ui/heading.tsx'
import { useFormContext } from 'react-hook-form'
import { CreateStructureFormSchema } from '@/pages/onboarding/validators.ts'
import { FormField, FormMessage } from '@/commons/components/ui/form.tsx'
import { Textarea } from '@/commons/components/ui/textarea.tsx'
import BackButton from '@/pages/onboarding/components/back-button.tsx'
import NextButton from '@/pages/onboarding/components/next-button.tsx'
import { useNavigate } from 'react-router'
import { Fragment, MouseEvent } from 'react'
import { Step } from '@/pages/onboarding/components/progress-step.tsx'
import InputText from '@/commons/components/ui/input-text.tsx'

export default function PageOnboardingStructure() {
  return (
    <div className="flex w-full">
      <div className="flex-1">
        <div className="max-w-xl mx-auto py-16">
          <Heading>Créer une structure ✨</Heading>
          <p className="text-muted-foreground">Page de création de structure</p>
          <OnboardingForm/>
        </div>
      </div>

      <div className="w-1/3 bg-slate-100">
        dd
      </div>
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
              <InputText
                {...field}
                className="bg-white"
                label="Nom de la structure"
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
                <FormMessage/>
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
