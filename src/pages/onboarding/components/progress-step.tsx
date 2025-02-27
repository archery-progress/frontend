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
    [Step.members] : '66%',
    [Step.plans] : '100%',
  }

  const steps: {[key: string]: string} = {
    [Step.identity] : 'Structure',
    [Step.members] : 'Membre',
    [Step.plans] : 'Plan',
  }

  const currentStep = progress[(params.step as string)]

  return (
   <div className='flex flex-col'>
      <div className='flex'>
        <div className='border-r border-gray-200 p-1'>
          <img src="/logo.webp" alt="logo" className="w-12" />
        </div>

        <div className='flex items-center ml-4'>
          <div className='bg-primary text-white px-1 py-0.5 rounded-md text-xs mr-3'>
            {`${Object.keys(steps).indexOf(params.step as string) + 1}/${Object.keys(steps).length}`}
          </div>
          <span className='text-sm font-medium text-gray-700'>
            {steps[params.step as string]}
          </span>
        </div>
      </div>
     <div className="bg-gray-200 h-1.5 w-full">
      <div
        className="h-1.5 bg-primary transition-all duration-300"
        style={{width: currentStep}}
      />
    </div>
   </div>
  )
}
