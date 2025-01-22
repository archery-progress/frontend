import { ApplicationLayout } from '@/commons/components/layouts/default/layout.tsx'

export function Dashboard() {
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
