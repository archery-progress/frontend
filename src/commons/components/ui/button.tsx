import { forwardRef, ComponentPropsWithoutRef, ElementRef } from "react"
import { ButtonPrimitive } from "./button-primitive"
import LoaderSpinner from "./loader-spinner"
import { twMerge } from "tailwind-merge"

export interface ButtonProps extends ComponentPropsWithoutRef<typeof ButtonPrimitive> {
  loading?: boolean
}

export const Button = forwardRef<ElementRef<typeof ButtonPrimitive>, ButtonProps>(function Button(
  { loading = false, className, ...props },
  forwardedRef
) {
  return (
    <ButtonPrimitive
      {...props}
      ref={forwardedRef}
      className={twMerge(loading ? 'pointer-events-none relative text-transparent' : '', className)}
    >
      {loading && <LoaderSpinner className="absolute left-0 right-0 m-auto" theme="dark" />}
      {props.children}
    </ButtonPrimitive>
  )
})

export default Button 