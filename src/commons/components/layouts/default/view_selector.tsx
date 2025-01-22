import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/commons/components/ui/popover'
import { Button } from '@/commons/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Command, CommandGroup, CommandItem, CommandList } from '@/commons/components/ui/command'
import { cn } from '@/commons/utils'
import { useLocation, useNavigate } from 'react-router'
import { User } from '@/data/models/user.ts'

type Props = {
  currentView: string
  user: User
}

export default function ViewSelector(props: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>(props.currentView)

  const buildViews = [
    ...views,
    ...props.user.members.map((member) => ({
      id: member.structureId,
      label: member.structure.name,
      href: `/platform/${member.structureId}/overview`,
    })),
  ]

  const currentView = buildViews.find((view) => {
    return pathname.startsWith('/platform')
      ? pathname.includes(view.id)
      : view.id === value
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex !justify-start !px-3 w-[200px]"
        >
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          {currentView?.label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {buildViews.map((view) => (
                <CommandItem
                  key={view.id}
                  value={view.id}
                  className="cursor-pointer"
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                    navigate(view.href)
                  }}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', view.id === value ? 'opacity-100' : 'opacity-0')}
                  />
                  {view.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const views = [
  {
    id: 'archery',
    label: 'Mon espace',
    href: '/archery/dashboard',
  },
  {
    id: 'manager',
    label: 'Administrateur',
    href: '/manager/users/overview',
  },
]
