import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
};

export function IconButton({
  label,
  children,
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        "inline-flex size-[var(--target-min)] items-center justify-center rounded-[var(--radius-16)] border border-border bg-[rgb(255_255_255_/_0.03)] text-foreground transition-[background-color,border-color,transform] duration-[var(--duration-micro)] ease-[var(--ease-standard)] hover:bg-[rgb(255_255_255_/_0.07)] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-45",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
