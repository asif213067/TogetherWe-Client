"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export function useLogout() {
  const router = useRouter();

  return async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("We could not log you out. Please try again.");
      return;
    }

    toast.success("You have been logged out.");
    router.push("/");
    router.refresh();
  };
}
