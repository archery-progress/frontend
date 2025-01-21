import { ChangeEvent, ComponentProps, forwardRef, useRef, useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { cn } from '@/commons/utils'
import { FormLabel } from '@/commons/components/ui/form.tsx'

type Props = Omit<ComponentProps<'input'>, 'value' | 'defaultValue'> & {
  value?: File
  defaultValue?: string
  onFileChange?: (file: File) => void
  onFilesChange?: (files: FileList) => void
}

export const InputImage = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [imageData, setImageData] = useState<string | undefined>(props.defaultValue)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      if (!event.target.files?.length) {
        return
      }

      if (event.target.files.length === 1) {
        const file = event.target.files[0]
        setImageData(URL.createObjectURL(file))
        props.onFileChange?.(file)
      }

      if (event.target.files.length > 1) {
        props.onFilesChange?.(event.target.files)
      }
    }

    function handleReset() {
      if (inputRef.current && props.onFileChange) {
        inputRef.current.files = null
        setImageData(undefined)
        props.onFileChange(props.value as never)
        props.onFilesChange?.([] as never)
      }
    }

    return (
      <div className="group relative">
        {imageData && (
          <div
            onClick={handleReset}
            className="hidden group-hover:flex absolute z-10 w-6 h-6 top-2 right-2 bg-red-500 rounded items-center justify-center"
          >
            <PlusIcon className="w-5 h-5 text-white cursor-pointer rotate-45" />
          </div>
        )}
        <FormLabel className={cn('cursor-pointer rounded overflow-hidden', className)} htmlFor={props.name}>
          {imageData ? (
            <img src={imageData} alt="Preview" className="w-full h-full object-cover rounded" />
          ) : (
            <div className={cn('cursor-pointer aspect-video border border-gray-200 rounded flex items-center justify-center')}>
              Ajouter une image
            </div>
          )}
        </FormLabel>
        <input ref={inputRef} id={props.name} onChange={handleChange} type="file" hidden />
      </div>
    )
  }
)
