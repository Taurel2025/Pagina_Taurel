import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,          // ← desactiva SSR
  basename: "/",       // ← raíz del sitio
} satisfies Config;