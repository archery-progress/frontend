import PageOnboardingStructure from '@/pages/onboarding/ui/page-onboarding-structure.tsx'
import { Form } from '@/commons/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateStructureFormSchema, createStructureIdentity } from '@/pages/onboarding/validators'
import { useNavigate, useParams } from 'react-router'
import { Step } from '@/pages/onboarding/components/progress-step.tsx'
import PageOnboardingMembers from '@/pages/onboarding/ui/page-onboarding-members.tsx'
import { useEffect } from 'react'

export default function PageOnboardingStructureFeature() {
  const navigate = useNavigate()
  const params = useParams()

  const form = useForm<CreateStructureFormSchema>({
    resolver: zodResolver(createStructureIdentity),
    defaultValues: {
      name: '',
      description: '',
      members: []
    }
  })

  useEffect(() => {
    if (params.step !== Step.identity) {
      navigate(`/onboarding/${Step.identity}`)
    }
  }, [])

  return (
    <Form {...form}>
      {params.step == Step.identity && <PageOnboardingStructure />}
      {params.step == Step.members && <PageOnboardingMembers />}
    </Form>
  )
}
