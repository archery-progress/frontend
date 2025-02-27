import { Heading } from '@/commons/components/ui/heading.tsx'
import { useFormContext } from 'react-hook-form'
import { CreateStructureFormSchema } from '@/pages/onboarding/validators.ts'
import { FormField, FormMessage } from '@/commons/components/ui/form.tsx'
import BackButton from '@/pages/onboarding/components/back-button.tsx'
import NextButton from '@/pages/onboarding/components/next-button.tsx'
import { useNavigate } from 'react-router'
import { Fragment, MouseEvent } from 'react'
import { Step } from '@/pages/onboarding/components/progress-step.tsx'
import InputText from '@/commons/components/ui/inputs/input-text'
import InputTextArea from '@/commons/components/ui/inputs/input-text-area'

export default function PageOnboardingStructure() {
  return (
    <div className="flex w-full h-full">
      <div className="flex-1">
        <div className="max-w-xl mx-auto py-16">
          <Heading>Créer une structure ✨</Heading>
          <p className="text-muted-foreground">Page de création de structure</p>
          <OnboardingForm/>
        </div>
      </div>

      <div className="w-1/3 min-h-screen bg-slate-100 flex justify-center pt-12">
        <div className='flex flex-col gap-5'>
          <Box />
        </div>
      </div>
    </div>
  )
}

function Box() {
  return (
    <div className='w-80 rounded-md border border-neutral-250 bg-white'>
      <div className="p-8">
        <span className="text-4xl" role="img" aria-label="light">💡</span>
        <h2 className="text-lg font-bold text-slate-800 mb-5 mt-5 text-neutral-400">Qu'est-ce qu'une structure?</h2>

        <ul className='list-disc list-inside'>
          <li className='mb-2 flex gap-3 text-neutral-400 before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-neutral-400 before:content-[" "]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </li>
        </ul>
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
                <InputTextArea 
                  {...field}
                  label="Description de la structure"
                  className="bg-white w-full"
                />
                <FormMessage/>
              </Fragment>
            )}
          />
        </div>
        <div className="flex justify-between border-t pt-4 mt-4">
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
