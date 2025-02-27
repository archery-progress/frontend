import Button from "@/commons/components/ui/button"
import { CheckIcon } from "lucide-react"

export interface PlanCardProps {
  id: string
  title: string
  subtitle: string
  price?: string
  disabled?: boolean
  period?: string
  features: string[]
  onSelect: () => void
  customPrice?: string
}

export default function PlanCard(props: PlanCardProps) {
  return (
    <div className="bg-neutral-100 rounded-md border border-neutral-250 p-6 flex flex-col h-full shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{props.title}</h2>
        <p className="text-gray-500 text-sm">{props.subtitle}</p>
      </div>

      <div className="mb-5">
        {props.customPrice ? (
          <h3 className="text-xl font-bold text-neutral-400">{props.customPrice}</h3>
        ) : (
          <div className="flex items-baseline">
            <h3 className="text-xl font-bold text-neutral-400">${props.price}</h3>
            {props.period && <span className="text-sm text-neutral-400 ml-1">{props.period}</span>}
          </div>
        )}
      </div>

      <Button
        disabled={props.disabled}
        type="button"
        className="mb-4 w-full justify-center"
        size="lg"
        onClick={props.onSelect}
      >
        <span className="text-center">
          {props.disabled ? 'Pas disponible' : 'Sélectionner'}
        </span>
      </Button>

      <div className="space-y-3">
        {props.features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <CheckIcon className="w-4 h-4 text-green-500 mr-2" />

            <span className="text-gray-700 text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
};
