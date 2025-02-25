import { cva } from "class-variance-authority"

const headingVariants = cva("transition-all", {
  variants: {
    as: {
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      h5: "h5",
      h6: "h6",
    },
    size: {
      1: "text-4xl",
      2: "text-3xl",
      3: "text-2xl",
      4: "text-xl",
      5: "text-lg",
      6: "text-base",
    },
    weight: {
      light: "font-light",
      regular: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    trim: {
      normal: "truncate",
      start: "truncate ...",
      end: "... truncate",
    },
    truncate: {
      true: "truncate",
      false: "whitespace-normal",
    },
    wrap: {
      wrap: "break-words",
      nowrap: "whitespace-nowrap",
      pretty: "overflow-ellipsis",
      balance: "line-clamp-3",
    },
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      danger: "text-danger",
    },
  },
  defaultVariants: {
    as: "h1",
    size: 1,
    weight: "bold",
    align: "left",
    trim: "normal",
    truncate: false,
    wrap: "wrap",
    color: "primary",
  },
})

export default headingVariants
