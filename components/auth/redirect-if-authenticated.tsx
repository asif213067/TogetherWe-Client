"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

type RedirectIfAuthenticatedProps = {
  to: string;
};

const RedirectIfAuthenticated = ({ to }: RedirectIfAuthenticatedProps) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user) {
      router.replace(to);
    }
  }, [session, router, to]);

  return null;
};

export default RedirectIfAuthenticated;
