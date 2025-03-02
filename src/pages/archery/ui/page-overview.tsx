import { useDefineBreadcrumb } from '@/commons/components/layouts/default/hooks.ts'

export default function PageOverview() {
  useDefineBreadcrumb([
    {label: 'Dashboard', url: '/archery/dashboard'}
  ])

  return (
    <p>Dashboard</p>
  )
}
