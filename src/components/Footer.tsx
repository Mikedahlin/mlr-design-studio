import Link from "next/link";

const footerLinks = {
  services: [
    { href: "/services", label: "Website Design" },
    { href: "/services", label: "Custom Applications" },
    { href: "/services", label: "E-Commerce" },
    { href: "/services", label: "Site Optimization" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/work", label: "Case Studies" },
    { href: "/contact", label: "Contact" },
  ],
  resources: [
    { href: "/about", label: "Our Process" },
    { href: "/services", label: "Pricing" },
    { href: "/contact", label: "Book a Call" },
  ],
};



export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-custom px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center text-background font-bold text-sm">
                M
              </div>
              <span className="text-lg font-bold text-text tracking-tight">
                MLR ASSETS
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              Custom websites, branding, and visual design with direct one-person service.
            </p>
            <a
              href="tel:+13202009969"
              className="mono-label text-xs text-text-secondary hover:text-primary transition-colors mt-4 inline-block"
            >
              (320) 200-9969
            </a>
            <div className="mt-6">
              <a
                href="mailto:hello@mlrassets.com"
                className="mono-label text-xs text-text-secondary hover:text-primary transition-colors"
              >
                hello@mlrassets.com
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mono-label text-xs text-text-muted mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="mono-label text-[11px] text-text-muted">
              &copy; {new Date().getFullYear()} MLR Assets LLC. All rights
              reserved.
            </p>

            {/* Made in America badge */}
            <div className="flex items-center gap-2 bg-surface border border-border px-3 py-1 rounded">
              <span className="sr-only">Made in the United States</span>
              <svg
                width="24"
                height="16"
                viewBox="0 0 24 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect width="24" height="16" fill="#B22234" />
                <rect y="2" width="24" height="2" fill="#fff" />
                <rect y="6" width="24" height="2" fill="#fff" />
                <rect y="10" width="24" height="2" fill="#fff" />
                <rect width="10" height="8" fill="#3C3B6E" />
                {/* Simple star pattern */}
                <g fill="#fff" transform="translate(1,1) scale(0.9)">
                  <circle cx="1" cy="1" r="0.6" />
                  <circle cx="3" cy="1" r="0.6" />
                  <circle cx="5" cy="1" r="0.6" />
                  <circle cx="2" cy="2.5" r="0.6" />
                  <circle cx="4" cy="2.5" r="0.6" />
                </g>
              </svg>
              <span className="mono-label text-[11px] text-text-muted">Made in America</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mono-label text-[11px] text-text-muted">
            <span className="w-1.5 h-1.5 bg-primary" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
