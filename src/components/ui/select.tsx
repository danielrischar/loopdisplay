import * as React from "react";

export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ children, value, onValueChange, className = "", ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const id = React.useId();
    
    return (
      <div ref={ref} className={`relative ${className}`} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === SelectTrigger) {
            return React.cloneElement(child, {
              value,
              onClick: () => setOpen(!open),
            });
          }
          if (React.isValidElement(child) && child.type === SelectContent) {
            return React.cloneElement(child, {
              id: `select-content-${id}`,
              value,
              onValueChange,
              open,
            });
          }
          return child;
        })}
      </div>
    );
  }
);
Select.displayName = "Select";

const SelectTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: string }
>(({ className = "", children, value, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${className}`}
    {...props}
  >
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === SelectValue) {
        return React.cloneElement(child, { value });
      }
      return child;
    })}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 opacity-50"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </div>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { value?: string; placeholder?: string }
>(({ className = "", value, placeholder, ...props }, ref) => (
  <span
    ref={ref}
    className={`block truncate ${value ? "" : "text-gray-500"} ${className}`}
    {...props}
  >
    {value || placeholder}
  </span>
));
SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    value?: string; 
    onValueChange?: (value: string) => void;
    open?: boolean;
  }
>(({ className = "", children, value, onValueChange, open, ...props }, ref) => (
  <div
    ref={ref}
    className={`absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-md mt-1 w-full ${open ? "" : "hidden"} ${className}`}
    {...props}
  >
    <div className="p-1">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === SelectItem) {
          return React.cloneElement(child, {
            selected: child.props.value === value,
            onClick: () => {
              onValueChange?.(child.props.value);
              const content = document.getElementById(props.id || "");
              if (content) {
                content.classList.add("hidden");
              }
            },
          });
        }
        return child;
      })}
    </div>
  </div>
));
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string; selected?: boolean }
>(({ className = "", children, selected, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 ${
      selected ? "bg-gray-100" : ""
    } ${className}`}
    {...props}
  >
    <span className={`absolute left-2 flex h-3.5 w-3.5 items-center justify-center ${selected ? "" : "opacity-0"}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M5 12l5 5 9-9" />
      </svg>
    </span>
    <span className="truncate">{children}</span>
  </div>
));
SelectItem.displayName = "SelectItem";

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };