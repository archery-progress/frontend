import { Outlet } from 'react-router'
import ProgressStep from '@/pages/onboarding/components/progress-step.tsx'

export default function Container() {
  return (
    <div className="flex min-h-screen bg-white">
      <ProgressStep />
      <div className="flex-1">
        <div className="max-w-xl mx-auto py-16">
          <Outlet />
        </div>
      </div>
      <div className="w-1/3 bg-slate-100">
dd
      </div>
    </div>
  )
}
