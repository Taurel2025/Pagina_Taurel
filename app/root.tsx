import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import "./styles/global.css";

// Importamos componentes de navegación y footer
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { LanguageProvider } from "./contexts/LanguageContext";

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/jpeg", href: "https://pbs.twimg.com/profile_images/3392292237/0749cb6e714c1caaf78ca914d0b53ae7_400x400.jpeg" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  // HubSpot ANTES que React cargue
  { rel: "preload", as: "script", href: "//js.hs-scripts.com/50651949.js" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* Start of HubSpot Embed Code */}
        <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/50651949.js"></script>
        {/* End of HubSpot Embed Code */}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Navigation />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}