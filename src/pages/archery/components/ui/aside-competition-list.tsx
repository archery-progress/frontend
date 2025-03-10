import { Button } from '@/commons/components/ui/button'
import { BanIcon, MoreHorizontalIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { formatDate } from '@/commons/utils'

const listVariants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: {opacity: 0, y: 20},
  visible: {opacity: 1, y: 0}
}

type Props = {
  data: { type: string, label: string, date: { start: string, end: string }, structure: { name: string } }[]
}

export default function AsideCompetitionList(props: Props) {
  return (
    <AnimatePresence>
      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={listVariants}
      >
        {props.data.map((element, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-2 justify-between"
            variants={itemVariants}
            transition={{type: 'tween'}}
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary">
                {element.type}
              </div>
              <div className="flex-1">
                <span className="block text-sm leading-none font-medium">
                  {element.label.substring(0, 10)}
                </span>
                <span className="text-xs text-muted-foreground leading-none">
                  {formatDate(element.date.start)} - {formatDate(element.date.end)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline">
                <MoreHorizontalIcon className="h-5 w-5"/>
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
