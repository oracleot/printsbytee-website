import Link from "next/link";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "@/components/shared/SocialIcons";
import { PatternDivider } from "@/components/shared/PatternDivider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://instagram.com/printsbytee", label: "Instagram", Icon: InstagramIcon },
  { href: "https://facebook.com/printsbytee", label: "Facebook", Icon: FacebookIcon },
  { href: "https://tiktok.com/@printsbytee", label: "TikTok", Icon: TikTokIcon },
];

export function Footer() {
  return (
    <footer className="bg-black text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PatternDivider />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <svg viewBox="0 0 100 60" className="h-10 w-16" fill="currentColor">
                <text x="0" y="45" fontFamily="serif" fontSize="42" fontWeight="bold" fill="#F5F0E8">P</text>
                <text x="30" y="45" fontFamily="serif" fontSize="42" fontWeight="bold" fill="#C9A84C">b</text>
                <text x="50" y="45" fontFamily="serif" fontSize="42" fontWeight="bold" fill="#F5F0E8">T</text>
              </svg>
              <span className="font-heading text-xl font-bold text-cream">PrintsbyTee</span>
            </Link>
            <p className="text-cream/70 text-sm leading-relaxed">
              Ready-to-Wear fashion for bold and beautiful African women. Premium African prints with contemporary style.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-bold tracking-wider uppercase text-gold mb-4">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-cream/70 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-bold tracking-wider uppercase text-gold mb-4">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <a 
                href="mailto:hello@printsbytee.co.uk"
                className="block text-sm text-cream/70 hover:text-gold transition-colors"
              >
                hello@printsbytee.co.uk
              </a>
              <div className="flex items-center gap-4 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/70 hover:text-gold transition-colors"
                    aria-label={social.label}
                  >
                    <social.Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/50">
            © {new Date().getFullYear()} PrintsbyTee. All rights reserved.
          </p>
          <p className="text-xs text-cream/50">
            Ready-to-Wear
          </p>
        </div>
      </div>
    </footer>
  );
}