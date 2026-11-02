import { Suspense } from "react";
import type { Metadata } from "next";

import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Log in | TogetherWe",
  description: "Log in to TogetherWe to join and organize community events.",
};

export default function LoginPage() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );

    console.log(
      "google enabled:",
      Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    );

  return (
    <Suspense
      fallback={
        <div className="h-112 w-full max-w-md animate-pulse rounded-3xl bg-muted" />
      }
    >
      <LoginForm googleEnabled={googleEnabled} />
    </Suspense>
  );
}
