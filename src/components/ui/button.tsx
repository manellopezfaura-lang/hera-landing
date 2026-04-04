import { type ButtonHTMLAttributes, forwardRef } from "react"

type ButtonVariant = "default" | "ghost" | "outline"
type ButtonSize = "default" | "sm" | "lg" | "icon"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer"

    const variants: Record<ButtonVariant, string> = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      ghost: "hover:bg-secondary hover:text-foreground",
      outline: "border border-border bg-background hover:bg-secondary",
    }

    const sizes: Record<ButtonSize, string> = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3 text-sm",
      lg: "h-11 px-8",
      icon: "h-10 w-10",
    }

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
