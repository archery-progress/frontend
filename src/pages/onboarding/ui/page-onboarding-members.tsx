import { Heading } from '@/commons/components/ui/heading.tsx'
import BackButton from '@/pages/onboarding/components/back-button.tsx'
import NextButton from '@/pages/onboarding/components/next-button.tsx'
import { useNavigate } from 'react-router'
import { MouseEvent } from 'react'
import { Step } from '@/pages/onboarding/components/progress-step.tsx'

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
    </div>
  )
}


export function OnboardingForm() {
  const navigate = useNavigate()

  function onNextStep(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    navigate(`/onboarding/${Step.plans}`)
  }

  return (
    <div className="pt-5 flex flex-col gap-5">
      <div className="flex flex-col items-center justify-center p-10 border border-dashed border-gray-300 rounded-lg bg-gray-50">
        <div className="bg-primary/10 p-3 rounded-full mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-primary" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3a3 3 0 100-6 3 3 0 000 6z" 
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Invitation des membres</h3>
        <p className="text-muted-foreground text-center mb-4">
          Cette fonctionnalité sera bientôt disponible. Vous pourrez inviter des membres à rejoindre votre structure.
        </p>
        <div className="bg-primary/5 text-primary font-medium py-1 px-3 rounded-full text-sm">
          Prochainement
        </div>
      </div>

      <div className="flex justify-between border-t pt-4 mt-4">
        <BackButton/>
        <NextButton onClick={onNextStep}/>
      </div>
    </div>
  )
}
