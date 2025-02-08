import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/commons/components/ui/button'
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

type Props<T> = {
  items: { label: string; value: T }[]
  clearOnSelect?: boolean
  placeholder?: string
  notFoundPlaceholder?: string
  searchPlaceholder?: string
  defaultValue?: T
  expanded?: boolean
  multiple?: boolean
  searchable?: boolean
  onChange?: (value: T) => void
}

export function Combobox<T>(props: Props<T>) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<T | undefined>(props.defaultValue)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
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
        </div>
      </PopoverTrigger>
      <PopoverContent align="start"  className={cn('p-0', props.expanded ? 'w-full' : 'w-[200px]')}>
        <Command>
          {props.searchable && (
            <CommandInput placeholder={props.searchPlaceholder ?? 'Search an element'} className="h-9" />
          )}
          <CommandList>
            <CommandEmpty>{props.notFoundPlaceholder ?? `No element found.`}</CommandEmpty>
            {props.items.length ? (
              <CommandGroup>
                {props.items.map((element) => (
                  <CommandItem
                    key={element.value as string | number}
                    value={element.value as string}
                    onSelect={(currentValue) => {
                      setValue((currentValue === value ? '' : currentValue) as T)
                      props.onChange?.(currentValue as T)
                      setOpen(false)

                      if (props.clearOnSelect) {
                        setValue('' as T)
                      }
                    }}
                  >
                    {element.label}
                    <Check
                      className={cn('ml-auto', value === element.value ? 'opacity-100' : 'opacity-0')}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
