"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { authClient } from "@/lib/auth-client";

type RequireAuthProps = {
  children: ReactNode;
  /** Where to send the user back after logging in. */
  callbackUrl?: string;
};

/**
 * Client-side gate for authenticated-only pages. Renders a spinner while the
 * session resolves, redirects anonymous visitors to the login page with a
 * callback URL, and renders children once a session is confirmed.
 *
 * Note: this is a UX convenience only — the real security boundary is the
 * Express API, which derives the organizer identity from the verified JWT.
 */
const RequireAuth = ({
  children,
  callbackUrl = "/create-event",
}: RequireAuthProps) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }
  }, [isPending, session, router, callbackUrl]);

  if (isPending) {
    return (
      <div
        role="status"
        aria-label="Checking login status"
        className="flex min-h-48 items-center justify-center"
      >
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return <>{children}</>;
};

export default RequireAuth;
