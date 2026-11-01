import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

import Logo from "@/components/shared/logo";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
];

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
  { label: "Create Event", href: "/create-event" },
  { label: "Joined Events", href: "/joined-events" },
];

const socialLinks = [
  { label: "TogetherWe on X", href: "https://x.com", icon: FaXTwitter },
  {
    label: "TogetherWe on Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
  },
  {
    label: "TogetherWe on LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedinIn,
  },
  { label: "TogetherWe on GitHub", href: "https://github.com", icon: FaGithub },
];

const linkClass =
    "text-sm text-white/70 transition-colors duration-200 hover:text-white";
  
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const Footer = () => {
  return (
    <footer className="relative mt-auto overflow-hidden bg-footer text-white">
      <div className="h-1 w-full bg-brand-gradient" />
      <div className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full bg-brand-via/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full bg-pink-400/15 blur-3xl" />

      <div className="relative mx-auto max-w-300 px-4 pt-16 pb-8 sm:px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          <div>
            <Link href="/#home" aria-label="TogetherWe homepage">
              <Logo variant="light" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              Small actions. Stronger communities. Find, join, and organize
              social service events in your neighbourhood.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-gradient"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-base font-bold">Explore</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-base font-bold">Account</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-base font-bold">Get in touch</h3>
            <ul className="mt-5 flex flex-col gap-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-brand-to" />
                <span>hello@togetherwe.org</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-brand-to" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-sm text-white/60 sm:flex-row sm:text-left">
          <p>
            © <CopyrightYear /> TogetherWe. All rights reserved.
          </p>
          <p>Made with care in Bangladesh</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
