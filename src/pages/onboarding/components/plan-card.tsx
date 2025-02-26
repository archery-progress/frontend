type Props = {
  title: string
  subtitle: string
  price?: string
  period?: string
  features: string[]
  onSelect: () => void
  customPrice?: string
}

export default function PlanCard(props: Props) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col h-full shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{props.title}</h2>
        <p className="text-gray-600 text-sm">{props.subtitle}</p>
      </div>

      <div className="mb-5">
        {props.customPrice ? (
          <h3 className="text-2xl font-bold text-gray-800">{props.customPrice}</h3>
        ) : (
          <div className="flex items-baseline">
            <h3 className="text-2xl font-bold text-gray-800">${props.price}</h3>
            {props.period && <span className="text-sm text-gray-500 ml-1">{props.period}</span>}
          </div>
        )}
      </div>

      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-md font-medium transition-colors duration-200 mb-6"
        onClick={props.onSelect}
      >
        Select plan
      </button>

      <div className="space-y-3 mt-auto">
        {props.features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <span className="text-indigo-600 mr-2 font-bold">✓</span>
            <span className="text-gray-700 text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
};
