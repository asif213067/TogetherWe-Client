import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-12 sm:py-16">
      <div className="pointer-events-none absolute -top-32 -left-24 size-96 rounded-full bg-brand-via/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-32 size-96 rounded-full bg-pink-400/15 blur-3xl" />

      <div className="relative flex w-full justify-center">{children}</div>
    </main>
  );
}
