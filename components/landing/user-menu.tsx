"use client";

import Link from "next/link";
import { ChevronDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/use-logout";
import { userLinks } from "@/lib/navigation";
import { getInitials } from "@/lib/utils";
import { useState } from "react";

export type NavUser = {
  name: string;
  email: string;
  image?: string | null;
};

type UserMenuProps = {
  user: NavUser;
};

const UserMenu = ({ user }: UserMenuProps) => {
    const logout = useLogout();
    const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          aria-label="Open account menu"
          className="peer/avatar flex items-center gap-1.5 rounded-full outline-none transition-all hover:ring-primary focus-visible:ring-primary"
        >
          <Avatar className="size-10 shrink-0 ring-2 ring-border transition-all hover:ring-primary sm:size-11">
            <AvatarImage
              src={user.image ?? undefined}
              alt={user.name}
              referrerPolicy="no-referrer"
            />

            <AvatarFallback className="bg-brand-gradient text-sm font-semibold text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          <ChevronDown
            size={16}
            className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64">
          <div className="px-3 py-2.5">
            <p className="truncate text-sm font-semibold text-foreground">
              {user.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>

          <DropdownMenuSeparator />

          {userLinks.map((link) => (
            <DropdownMenuItem
              key={link.href}
              render={
                <Link
                  href={link.href}
                  className="flex items-center gap-3 py-2.5"
                >
                  <link.icon size={18} />
                  {link.label}
                </Link>
              }
            />
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onClick={logout}
            className="gap-3 py-2.5"
          >
            <LogOut size={18} />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <span
        role="tooltip"
        className="pointer-events-none absolute top-full right-0 z-50 mt-2 max-w-48 truncate rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity duration-150 peer-hover/avatar:opacity-100 peer-focus-visible/avatar:opacity-100 peer-aria-expanded/avatar:hidden"
      >
        {user.name}
      </span>
    </div>
  );
};

export default UserMenu;
