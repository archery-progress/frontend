import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/commons/components/ui/button-old'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/commons/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/commons/components/ui/popover'
import { cn } from '@/commons/utils'
import { useState } from 'react'

type Props = {
  items: { label: string; value: string }[]
  placeholder?: string
  notFoundPlaceholder?: string
  searchPlaceholder?: string
  defaultValue?: string | number
  expanded?: boolean
  multiple?: boolean
  searchable?: boolean
  onChange?: (value: string | number) => void
}

export function Combobox(props: Props) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string | number | undefined>(props.defaultValue)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('!px-2 justify-between', props.expanded ? 'w-full' : 'w-[200px]')}
        >
          {value
            ? props.items.find((element) => element.value === value)?.label
            : (props.placeholder ?? 'Select an element')}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className={cn('p-0', props.expanded ? 'w-full' : 'w-[200px]')}>
        <Command className="w-full">
          {props.searchable && (
            <CommandInput placeholder={props.searchPlaceholder ?? 'Search an element'} className="h-9" />
          )}
          <CommandList>
            <CommandEmpty>{props.notFoundPlaceholder ?? `No element found.`}</CommandEmpty>
            {props.items.length > 0 && (
              <CommandGroup>
                {props.items.map((element) => (
                  <CommandItem
                    key={element.value}
                    value={element.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue)
                      props.onChange?.(currentValue)
                      setOpen(false)
                    }}
                  >
                    {element.label}
                    <Check
                      className={cn('ml-auto', value === element.value ? 'opacity-100' : 'opacity-0')}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
