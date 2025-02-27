import { Heading } from '@/commons/components/ui/heading.tsx'
import PlanCard, { PlanCardProps } from '@/pages/onboarding/components/plan-card.tsx'
import BackButton from '../components/back-button'

export interface PageOnboardingPlansProps {
  onClick: any
}
export default function PageOnboardingPlans({ onClick }: PageOnboardingPlansProps) {
  return (
    <div className="max-w-5xl mx-auto py-16">
      <Heading className="text-center">Une tarification simple et transparente</Heading>
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
              key={plan.id!}
              id={plan.id!}
              title={plan.title!}
              disabled={plan.disabled}
              subtitle={plan.subtitle!}
              price={plan.price}
              period={plan.period}
              customPrice={plan.customPrice}
              features={plan.features!}
              onSelect={onClick}
            />
          ))}
        </div>

        <div className="mt-8 border-t  pt-8">
          <BackButton />
        </div>
      </div>
    </div>
  )
}

const plans: Partial<PlanCardProps>[] = [
  {
    id: 'free',
    title: 'Free plan',
    subtitle: 'Pour les particuliers ou les équipes de petite taille qui débutent tout juste avec Archery',
    price: '0',
    period: 'per user/month',
    features: [
      'Accès à toutes les fonctionnalités',
      '5 utilisateurs',
    ]
  },
  {
    id: 'team',
    title: 'Team plan',
    subtitle: "Pour les équipes qui ont besoin de fonctionnalités avancées et d'un support personnalisé",
    price: '29',
    period: 'per user/month',
    features: [],
    disabled: true
  },
  {
    id: 'business',
    title: 'Business plan',
    subtitle: "Pour les équipes qui ont besoin de fonctionnalités avancées et d'un support personnalisé",
    customPrice: 'Custom',
    features: [],
    disabled: true
  }
]
