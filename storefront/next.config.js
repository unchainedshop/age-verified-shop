await import("./node_env.js");

// Next 16 removed serverRuntimeConfig / publicRuntimeConfig (and getConfig()).
// Client-facing config now comes from NEXT_PUBLIC_* env vars (inlined at build
// time); server-only values are read from process.env directly where needed.
const nextJsConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "prod-eidch-hcms-sdweb.imgix.net" },
      { protocol: "https", hostname: "developer.apple.com" },
      { protocol: "https", hostname: "play.google.com" },
    ],
  },
  // NOTE: Next 16 removed the Pages Router `i18n` config (locale routing).
  // The app falls back to 'en' (see _app.tsx / getMessages). Restoring
  // en/de routing needs an App Router i18n migration (follow-up).
};

export default nextJsConfig;
