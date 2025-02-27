import PageOnboardingStructure from '@/pages/onboarding/ui/page-onboarding-structure.tsx'
import { Form } from '@/commons/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateStructureFormSchema, createStructureIdentity } from '@/pages/onboarding/validators'
import { useNavigate, useParams } from 'react-router'
import { Step } from '@/pages/onboarding/components/progress-step.tsx'
import PageOnboardingMembers from '@/pages/onboarding/ui/page-onboarding-members.tsx'
import { useEffect } from 'react'
import PageOnboardingPlans from '@/pages/onboarding/ui/page-onboarding-plans.tsx'
import { useCreateStructureMutation } from '@/data/api/onboarding_api'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/data/store/store'
import { structureActions } from '@/data/store/structure_store'

export default function PageOnboardingStructureFeature() {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const [createStructure, result] = useCreateStructureMutation()

  const form = useForm<CreateStructureFormSchema>({
    resolver: zodResolver(createStructureIdentity),
    defaultValues: {
      name: '',
      description: '',
      members: []
    }
  })

  const handleSubmit = form.handleSubmit((data) => {
    createStructure(data)
  })

  useEffect(() => {
    if (result.isSuccess) {
      navigate(`/structures/${result.data.id}/overview`)
      dispatch(structureActions.addStructure(result.data))
    }
  }, [result])

  useEffect(() => {
    if (params.step !== Step.identity) {
      navigate(`/onboarding/${Step.identity}`)
    }
  }, [])

  return (
    <Form {...form}>
      {params.step == Step.identity && <PageOnboardingStructure />}
      {params.step == Step.members && <PageOnboardingMembers />}
      {params.step == Step.plans && <PageOnboardingPlans onClick={handleSubmit} />}
    </Form>
  )
}
