export interface ComingSoonProps {
  title?: string
  description?: string
}

export default function ComingSoon({
  title = "Disponible bientôt",
  description = "Cette fonctionnalité n'est pas encore disponible. Veuillez vérifier bientôt pour les mises à jour.",
}: ComingSoonProps) {
  return (
    <div className="w-full  mx-auto p-8 rounded-lg bg-white border">
      <div className="flex flex-col items-center text-center gap-8">
        {/* Illustration/Icon */}
        <div className="w-32 h-32 bg-gradient-to-r from-teal-300 via-teal-500 to-teal-700 rounded-full flex items-center justify-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-teal-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-600 max-w-md">{description}</p>
        </div>

        {/* Links */}
        <div className="flex gap-8 text-sm">
          <a
            target="_blank"
            href="https://www.github.com/archery-progress/"
            className="text-teal-600 hover:text-teal-700 flex items-center gap-2"
          >
            Github
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
          <a
            target="_blank"
            href="https://nudibranches.tech"
            className="text-teal-600 hover:text-teal-700 flex items-center gap-2"
          >
            En savoir plus
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}