import { Route, Routes } from 'react-router'
import PageOnboardingStructureFeature from '@/pages/onboarding/feature/page-onboarding-structure-feature.tsx'
import Container from '@/pages/onboarding/container.tsx'

export default function OnboardingRouter() {
  return (
    <Routes>
      <Route element={<Container/>}>
        <Route path=":step" element={<PageOnboardingStructureFeature/>}/>
      </Route>
    </Routes>
  )
}
