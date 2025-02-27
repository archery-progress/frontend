import { Outlet } from 'react-router'
import ProgressStep from '@/pages/onboarding/components/progress-step.tsx'

export default function Container() {
  return (
    <div className="flex max-h-screen flex-col h-full overflow-hidden">
      <ProgressStep/>
      
      <div className="min-h-screen">
        <Outlet/>
      </div>
    </div>
  )
}
