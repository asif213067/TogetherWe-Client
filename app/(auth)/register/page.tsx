import { Suspense } from "react";
import type { Metadata } from "next";

import RegisterForm from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create account | TogetherWe",
  description:
    "Create a TogetherWe account to join and organize community events.",
};

export default function RegisterPage() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );

  return (
    <Suspense
      fallback={
        <div className="h-136 w-full max-w-md animate-pulse rounded-3xl bg-muted" />
      }
    >
      <RegisterForm googleEnabled={googleEnabled} />
    </Suspense>
  );
}
