import { Heading } from '@/commons/components/ui/heading.tsx'
import BackButton from '@/pages/onboarding/components/back-button.tsx'
import NextButton from '@/pages/onboarding/components/next-button.tsx'
import { useNavigate } from 'react-router'
import { MouseEvent } from 'react'
import { Step } from '@/pages/onboarding/components/progress-step.tsx'
import InputSearchMember from '@/pages/onboarding/components/input-search-member.tsx'
import { useFormContext } from 'react-hook-form'
import { CreateStructureFormSchema } from '@/pages/onboarding/validators.ts'

export default function PageOnboardingMembers() {
  return (
    <div className="flex w-full">
      <div className="flex-1">
        <div className="max-w-xl mx-auto py-16">
          <Heading>Invitez des membres</Heading>
          <p className="text-muted-foreground">Page d'invitation des membres</p>
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

  function addMember(value: string) {
    form.setValue('members', [...form.getValues('members')!, value])
  }

  function onNextStep(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    navigate(`/onboarding/${Step.plans}`)
  }

  const elements = [
    {label: 'John Doe', value: 'john.doe.example.foo'},
    {label: 'Jane Doe', value: 'jane.doe.example.foo'}
  ]

  const currentMembers = form.watch('members')
  const members = elements.filter((element) => !currentMembers!.includes(element.value))

  return (
    <div className="pt-5 flex flex-col gap-5">
      <div className="flex gap-5 w-full">
        <InputSearchMember
          onSelect={addMember}
          elements={members}
        />
      </div>

      <div>
        {currentMembers?.map((member) => (
          <div key={member} className="flex gap-5 w-full">
            <div className="flex items-center gap-2">
              <span>{member}</span>
              <button
                onClick={() => {
                  form.setValue('members', currentMembers.filter((currentMember) => currentMember !== member))
                }}
                className="text-red-500"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <BackButton/>
        <NextButton onClick={onNextStep}/>
      </div>
    </div>
  )
}
