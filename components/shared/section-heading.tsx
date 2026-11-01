import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  className?: string;
};

const SectionHeading = ({
  title,
  description,
  className,
}: SectionHeadingProps) => {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 className="font-heading text-3xl leading-tight font-extrabold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default SectionHeading;
