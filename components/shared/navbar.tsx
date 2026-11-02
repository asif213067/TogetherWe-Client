"use client";

import Link from "next/link";
import { LogIn, LogOut, Menu } from "lucide-react";

import Logo from "@/components/shared/logo";
import ThemeToggle from "@/components/shared/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

import { authClient } from "@/lib/auth-client";
import { useLogout } from "@/hooks/use-logout";
import UserMenu from "../landing/user-menu";
import { userLinks } from "@/lib/navigation";
import { getInitials } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
];

const brandButton =
  "items-center justify-center rounded-xl bg-brand-gradient text-sm font-semibold whitespace-nowrap text-white shadow-md shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/35";

const outlineButton =
  "items-center justify-center rounded-xl border border-border bg-background text-sm font-semibold whitespace-nowrap text-foreground transition-colors duration-200 hover:bg-muted";

const compactLoginButton = `hidden h-10 px-4 min-[360px]:inline-flex sm:h-11 sm:px-6 lg:hidden ${brandButton}`;
const desktopLoginButton = `hidden h-11 px-6 lg:inline-flex ${brandButton}`;
// const desktopSignupButton = `hidden h-11 px-6 lg:inline-flex ${brandButton}`;
const sheetLoginButton = `flex h-11 w-full px-6 ${brandButton}`;
const sheetSignupButton = `flex h-11 w-full px-6 ${outlineButton}`;
const sheetLinkClass =
  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const logout = useLogout();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-300 items-center justify-between gap-2 px-4 sm:h-18 sm:gap-4 sm:px-6">
        <Link href="/" className="shrink-0" aria-label="TogetherWe homepage">
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

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <ThemeToggle />

          {isPending ? (
            <div className="size-10 animate-pulse rounded-full bg-muted sm:size-11" />
          ) : user ? (
            <>
              <UserMenu user={user} />
              {/* Desktop-only Logout button */}
              <Button
                variant="outline"
                onClick={logout}
                className="hidden h-10 gap-2 rounded-xl border-border px-4 text-destructive hover:bg-destructive/10 sm:h-11 lg:inline-flex"
              >
                <LogOut size={18} />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className={compactLoginButton}>
                <LogIn size={18} />
                <p className="ml-2">Login</p>
              </Link>
              <Link href="/login" className={desktopLoginButton}>
                <LogIn size={18} />
                <p className="ml-2">Log in</p>
              </Link>
              {/* <Link href="/register" className={desktopSignupButton}>
                Sign up
              </Link> */}
            </>
          )}

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-10 rounded-xl border-border text-foreground sm:size-11"
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

                <div className="flex flex-1 flex-col overflow-y-auto p-5">
                  {user ? (
                    <div className="mb-4 flex items-center gap-3 rounded-2xl bg-muted p-3">
                      <Avatar className="size-11">
                        <AvatarImage
                          src={user.image ?? undefined}
                          alt={user.name}
                          referrerPolicy="no-referrer"
                        />
                        <AvatarFallback className="bg-brand-gradient text-sm font-semibold text-white">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <SheetClose
                        key={link.label}
                        nativeButton={false}
                        render={
                          <Link href={link.href} className={sheetLinkClass}>
                            {link.label}
                          </Link>
                        }
                      />
                    ))}

                    {user
                      ? userLinks.map((link) => (
                          <SheetClose
                            key={link.href}
                            nativeButton={false}
                            render={
                              <Link href={link.href} className={sheetLinkClass}>
                                <link.icon size={18} />
                                {link.label}
                              </Link>
                            }
                          />
                        ))
                      : null}
                  </div>

                  <div className="mt-auto flex flex-col gap-3 border-t border-border pt-5 pb-[env(safe-area-inset-bottom)]">
                    {user ? (
                      <SheetClose
                        render={
                          <button
                            type="button"
                            onClick={logout}
                            className={`flex h-11 w-full gap-2 px-6 ${outlineButton} text-destructive`}
                          >
                            <LogOut size={18} />
                            Log out
                          </button>
                        }
                      />
                    ) : (
                      <>
                        <SheetClose
                          nativeButton={false}
                          render={
                            <Link href="/login" className={sheetLoginButton}>
                              <LogIn size={18} />
                              <p className="ml-2">Login</p>
                            </Link>
                          }
                        />
                        <SheetClose
                          nativeButton={false}
                          render={
                            <Link
                              href="/register"
                              className={sheetSignupButton}
                            >
                              <LogIn size={18} />
                              <p className="ml-2">Sign up</p>
                            </Link>
                          }
                        />
                      </>
                    )}
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
