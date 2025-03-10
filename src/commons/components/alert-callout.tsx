import { Alert, AlertTitle } from '@/commons/components/ui/alert'
import {
  CircleFadingArrowUpIcon,
} from 'lucide-react'

export default function AlertCallout() {
  return (
    <Alert className="bg-blue-500/10 dark:bg-blue-600/30 border-blue-300 dark:border-blue-600/70">
      <CircleFadingArrowUpIcon className="h-4 w-4 !text-blue-500" />
      <AlertTitle>A new version of the app is now available.</AlertTitle>
    </Alert>
  )
}
