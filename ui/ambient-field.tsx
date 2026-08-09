import { cn } from "@/lib/utils";

export type AmbientTone = "graphite" | "signal" | "gold" | "mixed";

type AmbientFieldProps = {
  tone?: AmbientTone;
  className?: string;
};

/**
 * Static ambient illumination for compositional depth.
 * No JS animation. Use sparingly — not a global decoration layer.
 */
export function AmbientField({
  tone = "graphite",
  className,
}: AmbientFieldProps) {
  return (
    <div
      aria-hidden="true"
      data-tone={tone}
      className={cn("ambient-field", className)}
    />
  );
}
