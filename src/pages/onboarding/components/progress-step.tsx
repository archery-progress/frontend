import { useParams } from 'react-router'

export const Step = {
  identity: 'structure',
  members: 'members',
  plans: 'plans',
} as const

export default function ProgressStep() {
  const params = useParams()

  const progress: {[key: string]: string} = {
    [Step.identity] : '33%',
    [Step.members] : '50%',
    [Step.plans] : '66%',
  }

  const currentStep = progress[(params.step as string)]

  return (
    <div className="fixed top-1 left-0 bg-gray-200 h-1.5 w-full">
      <div
        className="h-1.5 bg-primary transition-all duration-300"
        style={{width: currentStep}}
      />
    </div>
  )
}
