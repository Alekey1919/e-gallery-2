/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.steamusercontent.com"],
  },

  /**
   * Security Headers Configuration
   *
   * These headers help protect your site from various web security vulnerabilities.
   * For more information on each header, visit:
   * https://nextjs.org/docs/advanced-features/security-headers
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          /**
           * X-DNS-Prefetch-Control
           *
           * Enables DNS prefetching, which can improve performance by resolving
           * domain names before a user clicks a link.
           */
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },

          /**
           * X-XSS-Protection
           *
           * Enables browser's built-in XSS filtering. While modern browsers don't
           * need this as they have better protections, it's good for older browsers.
           */
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },

          /**
           * X-Frame-Options
           *
           * Prevents your site from being embedded in iframes on other domains,
           * protecting against clickjacking attacks.
           * SAMEORIGIN - allows embedding only on pages from the same domain.
           */
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },

          /**
           * X-Content-Type-Options
           *
           * Prevents browsers from interpreting files as a different MIME type
           * than what was specified in the Content-Type header (MIME sniffing).
           */
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },

          /**
           * Referrer-Policy
           *
           * Controls how much referrer information is included with requests.
           * origin-when-cross-origin - full URL when staying on the same origin,
           * only the domain when going to other domains.
           */
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },

          /**
           * Strict-Transport-Security (HSTS)
           *
           * Forces browsers to use HTTPS for your site.
           * max-age - how long browsers should remember to use HTTPS (in seconds)
           * includeSubDomains - applies to all subdomains too
           * preload - allows inclusion in browser preload lists
           */
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },

          /**
           * Content-Security-Policy (CSP)
           *
           * Restricts what resources can be loaded, helping prevent XSS and data injection attacks.
           *
           * Directive breakdown:
           * - default-src 'self': Only allow resources from the same origin by default
           * - img-src: Allow images from both the same origin and Steam CDN
           * - style-src: Allow styles from same origin and inline styles (needed for libraries like Tailwind)
           * - font-src: Only allow fonts from the same origin
           * - script-src: Allow scripts from same origin, with exceptions for necessary inline and eval scripts
           *
           * Customize this policy based on your specific resource needs (fonts, APIs, etc.)
           */
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; img-src 'self' https://images.steamusercontent.com; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
