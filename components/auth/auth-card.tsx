import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

const AuthCard = ({ title, description, children, footer }: AuthCardProps) => {
  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/10 sm:p-8">
      <div className="text-center">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-card-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="mt-8">{children}</div>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        {footer}
      </div>
    </div>
  );
};

export default AuthCard;
