import { ApplicationLayout } from "@/commons/components/layouts/default/layout";

export default function PageDashboardFeature() {
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