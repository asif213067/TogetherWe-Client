import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "default" | "light";
};

const Logo = ({ className, variant = "default" }: LogoProps) => {
  return (
    <span className={cn("flex items-center gap-2 sm:gap-2.5", className)}>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient shadow-md shadow-primary/25 sm:size-10">
        <svg
          viewBox="6 3 52 52"
          className="size-6 sm:size-7"
          aria-hidden="true"
        >
          <circle cx="24" cy="23" r="7" fill="#fff" />
          <circle cx="40" cy="23" r="7" fill="#fff" fillOpacity="0.82" />
          <path d="M12 50C12 38 18 32 24 32C30 32 36 38 36 50Z" fill="#fff" />
          <path
            d="M28 50C28 38 34 32 40 32C46 32 52 38 52 50Z"
            fill="#fff"
            fillOpacity="0.82"
          />
          <circle cx="32" cy="11" r="3" fill="#FFB86B" />
        </svg>
      </span>

      <span
        className={cn(
          "font-heading text-lg font-extrabold tracking-tight whitespace-nowrap sm:text-xl",
          variant === "light" ? "text-white" : "text-foreground",
        )}
      >
        Together
        <span
          className={variant === "light" ? "text-brand-to" : "text-primary"}
        >
          We
        </span>
      </span>
    </span>
  );
};

export default Logo;
