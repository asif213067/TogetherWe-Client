"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm, type FieldErrors } from "react-hook-form";
import { toast } from "sonner";

import AuthCard from "@/components/auth/auth-card";
import FormField from "@/components/auth/form-field";
import GoogleAuthSection from "@/components/auth/google-auth-section";
import { authClient } from "@/lib/auth-client";
import { getSafeRedirect } from "@/lib/utils";
import { loginSchema, type LoginValues } from "@/lib/validations/auth";

type LoginFormProps = {
  googleEnabled: boolean;
};

const LoginForm = ({ googleEnabled }: LoginFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = getSafeRedirect(searchParams.get("callbackUrl"));
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(error.message ?? "Invalid email or password.");
      return;
    }

    toast.success("Welcome back!");
    router.push(callbackUrl);
    router.refresh();
  };

  const onInvalid = (formErrors: FieldErrors<LoginValues>) => {
    const firstError = Object.values(formErrors)[0];
    toast.error(firstError?.message ?? "Please check the highlighted fields.");
  };

  return (
    <AuthCard
      title="Welcome back"
      description="Log in to join events and manage the ones you organize."
      footer={
        <>
          New to TogetherWe?{" "}
          <Link
            href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="font-semibold text-primary hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        noValidate
        className="flex flex-col gap-5"
      >
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <FormField
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Your password"
          error={errors.password?.message}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
          {...register("password")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/35 disabled:pointer-events-none disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Logging in
            </>
          ) : (
            "Log in"
          )}
        </button>
      </form>

      {googleEnabled ? (
        <GoogleAuthSection
          label="Continue with Google"
          callbackUrl={callbackUrl}
          disabled={isSubmitting}
        />
      ) : null}
    </AuthCard>
  );
};

export default LoginForm;
