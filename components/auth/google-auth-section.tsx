"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

type GoogleAuthSectionProps = {
  label: string;
  callbackUrl: string;
  disabled?: boolean;
};

const GoogleAuthSection = ({
  label,
  callbackUrl,
  disabled = false,
}: GoogleAuthSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
    });

    if (error) {
      setIsLoading(false);
      toast.error(error.message ?? "Google sign in failed. Please try again.");
    }
  };

  return (
    <>
      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or continue with</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading || disabled}
        className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-70"
      >
        {isLoading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <FcGoogle size={22} />
        )}
        {label}
      </button>
    </>
  );
};

export default GoogleAuthSection;
