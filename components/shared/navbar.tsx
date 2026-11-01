"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import Logo from "@/components/shared/logo";
import ThemeToggle from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
];

const brandButton =
  "inline-flex h-11 items-center justify-center rounded-xl bg-brand-gradient px-6 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/35";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-18 max-w-300 items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/#home"
          className="shrink-0"
          aria-label="TogetherWe homepage"
        >
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <Link
            href="/login"
            className={`hidden md:inline-flex ${brandButton}`}
          >
            Login
          </Link>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-11 rounded-xl border-border text-foreground"
                    aria-label="Open navigation menu"
                  >
                    <Menu size={22} />
                  </Button>
                }
              />

              <SheetContent
                side="right"
                className="w-[85vw] max-w-90 border-l border-border bg-background p-0"
              >
                <SheetHeader className="border-b border-border p-5">
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                  <SheetDescription>Make an Impact. Together.</SheetDescription>
                </SheetHeader>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <SheetClose
                        key={link.label}
                        nativeButton={false}
                        render={
                          <Link
                            href={link.href}
                            className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                          >
                            {link.label}
                          </Link>
                        }
                      />
                    ))}
                  </div>

                  <div className="mt-auto border-t border-border pt-5 pb-[env(safe-area-inset-bottom)]">
                    <SheetClose
                      nativeButton={false}
                      render={
                        <Link href="/login" className={`w-full ${brandButton}`}>
                          Login
                        </Link>
                      }
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
