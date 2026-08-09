import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
};

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "children" | "href"
  > & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex min-h-[var(--target-min)] items-center justify-center gap-2 rounded-[var(--radius-interactive)] px-5 text-sm font-medium text-foreground transition-[background,box-shadow,border-color,transform,opacity] duration-[var(--duration-micro)] ease-[var(--ease-standard)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-45";

const variants = {
  primary: "btn-primary-material",
  secondary: "btn-secondary-material",
} as const;

const sizes = {
  md: "text-sm",
  lg: "px-6 text-base",
} as const;

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    const external = href.startsWith("http") || href.endsWith(".pdf");

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.endsWith(".pdf")
            ? {}
            : { target: "_blank", rel: "noreferrer" })}
          {...linkRest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button
      type={buttonRest.type ?? "button"}
      className={classes}
      {...buttonRest}
    >
      {children}
    </button>
  );
}
