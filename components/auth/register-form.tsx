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
import { registerSchema, type RegisterValues } from "@/lib/validations/auth";
import RedirectIfAuthenticated from "./redirect-if-authenticated";

type RegisterFormProps = {
  googleEnabled: boolean;
};

const RegisterForm = ({ googleEnabled }: RegisterFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = getSafeRedirect(searchParams.get("callbackUrl"));
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", photoURL: "", password: "" },
  });

  const onSubmit = async (values: RegisterValues) => {
    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.photoURL || undefined,
    });

    if (error) {
      toast.error(
        error.message ?? "We could not create your account. Please try again.",
      );
      return;
    }

    toast.success("Account created. Welcome to TogetherWe!");
    router.push(callbackUrl);
    router.refresh();
  };

  const onInvalid = (formErrors: FieldErrors<RegisterValues>) => {
    const firstError = Object.values(formErrors)[0];
    toast.error(firstError?.message ?? "Please check the highlighted fields.");
  };

  return (
    <AuthCard
      title="Create your account"
      description="Join TogetherWe to discover, join and organize community events."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="font-semibold text-primary hover:underline"
          >
            Log in
          </Link>
        </>
      }
    >
      <RedirectIfAuthenticated to={callbackUrl} />
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        noValidate
        className="flex flex-col gap-5"
      >
        <FormField
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          error={errors.name?.message}
          {...register("name")}
        />

        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <FormField
          label="Profile photo link (optional)"
          type="url"
          autoComplete="off"
          placeholder="https://example.com/your-photo.jpg"
          error={errors.photoURL?.message}
          {...register("photoURL")}
        />

        <FormField
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="6+ characters, with upper, lower and a number"
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
              Creating account
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      {googleEnabled ? (
        <GoogleAuthSection
          label="Sign up with Google"
          callbackUrl={callbackUrl}
          disabled={isSubmitting}
        />
      ) : null}
    </AuthCard>
  );
};

export default RegisterForm;
