import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function PrimaryButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center justify-center rounded-md border border-gold-500 bg-gold-500 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400",
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export function OutlineButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center justify-center rounded-md border border-gold-500 px-5 py-3 text-sm font-semibold text-gold-400 transition hover:bg-gold-500/10",
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
