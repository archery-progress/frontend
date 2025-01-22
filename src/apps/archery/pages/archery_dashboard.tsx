import { ApplicationLayout } from '@/commons/components/layouts/default/layout.tsx'

export function ArcheryDashboard() {
  return (
    <ApplicationLayout
      mode="archery"
      breadcrumb={[
        {label: 'Mon espace', url: '/archery'},
        {label: 'Accueil', url: '/archery/dashboard'}
      ]}
    >
      Dashboard
    </ApplicationLayout>
  )
}
