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
              Websites, branding, and visual design — one person, direct with you, no middlemen.
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
                role="img"
              >
                {/* 13 stripes: 7 red, 6 white */}
                <rect width="24" height="16" fill="#B22234" />
                <rect y="1.2308" width="24" height="1.2308" fill="#fff" />
                <rect y="3.6923" width="24" height="1.2308" fill="#fff" />
                <rect y="6.1538" width="24" height="1.2308" fill="#fff" />
                <rect y="8.6154" width="24" height="1.2308" fill="#fff" />
                <rect y="11.0769" width="24" height="1.2308" fill="#fff" />
                <rect y="13.5385" width="24" height="1.2308" fill="#fff" />
                {/* Canton: 7/13 of the height, 2/5 of the width */}
                <rect width="9.6" height="8.6154" fill="#3C3B6E" />
                {/* 50 stars: 9 rows alternating 6 and 5, evenly spaced */}
                <g fill="#fff">
                  {[0, 1, 2, 3, 4].map((row) => (
                    <g key={`row6-${row}`}>
                      {[0, 1, 2, 3, 4, 5].map((col) => (
                        <circle
                          key={`s6-${row}-${col}`}
                          cx={0.9 + col * 1.56}
                          cy={0.85 + row * 1.731}
                          r="0.36"
                        />
                      ))}
                    </g>
                  ))}
                  {[0, 1, 2, 3].map((row) => (
                    <g key={`row5-${row}`}>
                      {[0, 1, 2, 3, 4].map((col) => (
                        <circle
                          key={`s5-${row}-${col}`}
                          cx={1.68 + col * 1.56}
                          cy={1.715 + row * 1.731}
                          r="0.36"
                        />
                      ))}
                    </g>
                  ))}
                </g>
              </svg>
              <span className="mono-label text-[11px] text-text-muted">Made in America</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
