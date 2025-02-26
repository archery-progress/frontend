import { Heading } from '@/commons/components/ui/heading.tsx'
import PlanCard from '@/pages/onboarding/components/plan-card.tsx'

export default function PageOnboardingPlans() {
  return (
    <div className="max-w-7xl mx-auto py-16">
      <Heading>Plan</Heading>
      <p className="text-muted-foreground">Page de création de plan</p>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8 text-gray-700">
          14 days trial with no credit card required for all paid plans
          <a className="text-indigo-600 hover:underline ml-1">
            see details plan
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {plans.map(plan => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              subtitle={plan.subtitle}
              price={plan.price}
              period={plan.period}
              customPrice={plan.customPrice}
              features={plan.features}
              onSelect={() => console.log(`Selected ${plan.title}`)}
            />
          ))}
        </div>

        <div className="mt-8">
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  )
}

const plans = [
  {
    id: 'free',
    title: 'Free plan',
    subtitle: 'Free Forever. No CC required',
    price: '0',
    period: 'per user/month',
    features: [
      'Deploy on your cluster',
      'Up to 25 users',
      'Up to 3 Self-Managed clusters',
      'Up to 20 services',
      '1,000 free deployment minutes',
      'Community support'
    ]
  },
  {
    id: 'team',
    title: 'Team plan',
    subtitle: 'Ideal for teams',
    price: '29',
    period: 'per user/month',
    features: [
      'All FREE features',
      'Up to 100 users',
      'Up to 5 Self-Managed clusters',
      'Up to 200 services',
      '1,000 free deployment minutes',
      '24/5 support (email and chat)'
    ]
  },
  {
    id: 'enterprise',
    title: 'Enterprise plan',
    subtitle: 'Tailored for your organization',
    customPrice: 'Custom',
    features: [
      'All TEAM features',
      'Custom limits',
      'Role-Based Access Control',
      'Extended security and compliance',
      'Usage Report',
      'Custom support'
    ]
  }
]
