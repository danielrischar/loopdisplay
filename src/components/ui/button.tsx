import * as React from "react";

const buttonVariants = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50",
  ghost: "bg-transparent text-blue-600 hover:bg-blue-50",
  link: "bg-transparent text-blue-600 underline-offset-4 hover:underline",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    return (
      <button
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${buttonVariants[variant]} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };