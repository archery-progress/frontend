import { Outlet } from 'react-router'
import ProgressStep from '@/pages/onboarding/components/progress-step.tsx'

export default function Container() {
  return (
    <div className="flex min-h-screen bg-white">
      <ProgressStep/>
      <Outlet/>
    </div>
  )
}
