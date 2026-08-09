import { cn } from "@/lib/utils";

type DividerProps = {
  className?: string;
  label?: string;
};

export function Divider({ className, label }: DividerProps) {
  if (!label) {
    return (
      <hr
        className={cn(
          "m-0 h-px w-full border-0 bg-border",
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-4 text-foreground-tertiary",
        className,
      )}
      role="separator"
      aria-label={label}
    >
      <span className="h-px flex-1 bg-border" />
      <span className="type-technical shrink-0">{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
