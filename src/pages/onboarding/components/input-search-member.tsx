import { Input } from '@/commons/components/ui/input.tsx'
import { ReactNode, useEffect, useState } from 'react'

type Props = {
  onSelect: (value: string) => void
  onChange?: (value: string) => void
  elements: { label: ReactNode | string; value: string }[]
}

export default function InputSearchMember(props: Props) {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (search) setOpen(true)
  }, [search])

  const filteredElements = props.elements.filter((element) => element.value.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="relative w-full">
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0"/>}
      <Input
        value={search}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          setSearch(event.target.value)
          props.onChange?.(event.target.value)
        }}
      />

      {(open || search) && (
        <div className="absolute top-2 translate-y-8 w-full rounded-md shadow-sm border border-input bg-white">
          {filteredElements.map((element) => (
            <div
              key={element.value}
              onClick={() => {
                props.onSelect(element.value)
                setSearch('')
              }}
              className="px-2 py-1 cursor-pointer hover:bg-gray-100"
            >
              <span className="text-sm">{element.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
