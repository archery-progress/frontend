import { cn } from "@/commons/utils"
import { type VariantProps } from "class-variance-authority"
import * as React from "react"
import headingVariants from "./heading-variants"

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    VariantProps<typeof headingVariants> {}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as = "h1", // Default is h1
      className,
      size,
      weight,
      align,
      trim,
      truncate,
      wrap,
      color,
      ...props
    },
    ref,
  ) => {
    const computedClassName = cn(
      headingVariants({
        size,
        weight,
        align,
        trim,
        truncate,
        wrap,
        color,
        className,
      }),
    )

    // Render based on the "as" prop
    switch (as) {
      case "h1":
        return <h1 className={computedClassName} ref={ref} {...props} />
      case "h2":
        return <h2 className={computedClassName} ref={ref} {...props} />
      case "h3":
        return <h3 className={computedClassName} ref={ref} {...props} />
      case "h4":
        return <h4 className={computedClassName} ref={ref} {...props} />
      case "h5":
        return <h5 className={computedClassName} ref={ref} {...props} />
      case "h6":
        return <h6 className={computedClassName} ref={ref} {...props} />
      default:
        return null
    }
  },
)

Heading.displayName = "Heading"

export { Heading }
