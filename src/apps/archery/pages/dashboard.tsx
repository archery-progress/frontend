import { ApplicationLayout } from '@/commons/components/layouts/default/layout.tsx'

export function Dashboard() {
  return (
    <ApplicationLayout
      mode="archery"
      breadcrumb={[
        {label: 'Manager', url: '/manager'},
        {label: 'Users overview', url: '/manager/users'}
      ]}
    >
      Dashboard
    </ApplicationLayout>
  )
}
