import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type FormFieldProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
  trailing?: ReactNode;
};

const FormField = ({
  label,
  error,
  trailing,
  id,
  className,
  ...props
}: FormFieldProps) => {
  const fieldId = id ?? props.name;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldId} className="text-sm font-medium text-foreground">
        {label}
      </label>

      <div className="relative">
        <input
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={cn(
            "h-12 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/20 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/20",
            trailing && "pr-12",
            className,
          )}
          {...props}
        />

        {trailing ? (
          <div className="absolute inset-y-0 right-2 flex items-center">
            {trailing}
          </div>
        ) : null}
      </div>

      {error ? (
        <p id={`${fieldId}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default FormField;
