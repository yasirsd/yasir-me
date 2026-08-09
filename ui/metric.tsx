import { cn } from "@/lib/utils";

type MetricProps = {
  value: string;
  label: string;
  className?: string;
};

export function Metric({ value, label, className }: MetricProps) {
  return (
    <div
      className={cn(
        "flex min-h-[7.25rem] flex-col justify-between gap-4 rounded-[var(--radius-24)] bg-background-elevated/80 p-5",
        "shadow-[inset_0_1px_0_rgb(255_255_255_/_0.06)]",
        className,
      )}
    >
      <p className="type-display text-[clamp(1.875rem,3.8vw,2.625rem)] text-foreground">
        {value}
      </p>
      <p className="type-label text-foreground-secondary">{label}</p>
    </div>
  );
}
