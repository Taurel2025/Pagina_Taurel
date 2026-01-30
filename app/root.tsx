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
import Chatbot from "./components/Chatbot"; // ← NUEVO: Importar componente Chatbot
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
  // Precargar recursos del chatbot
  { 
    rel: "preload", 
    as: "script", 
    href: "https://copilotstudio.microsoft.com/environments/Default-b6f746d7-e5ec-486f-9ba3-d0475df395de/bots/cr91f_oriAsistenteAduanero/webchat?__version__=2",
    crossOrigin: "anonymous"
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Taurel - Tu aliado logístico de principio a fin. Servicios aduaneros, transporte marítimo y soluciones integrales de logística." />
        <meta name="keywords" content="logística, aduanas, transporte marítimo, Taurel, embarques, tracking, importación, exportación" />
        <meta name="author" content="Taurel" />
        <meta property="og:title" content="Taurel - Aliado Logístico Integral" />
        <meta property="og:description" content="Impulsamos tu negocio de principio a fin con soluciones logísticas completas." />
        <meta property="og:image" content="https://pbs.twimg.com/profile_images/3392292237/0749cb6e714c1caaf78ca914d0b53ae7_400x400.jpeg" />
        <meta property="og:url" content="https://taurel.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://taurel.com" />
        <Meta />
        <Links />
        {/* Start of HubSpot Embed Code */}
        <script 
          type="text/javascript" 
          id="hs-script-loader" 
          async 
          defer 
          src="//js.hs-scripts.com/50651949.js"
        ></script>
        {/* End of HubSpot Embed Code */}
        {/* Preconnect para recursos del chatbot */}
        <link rel="preconnect" href="https://copilotstudio.microsoft.com" />
        <link rel="dns-prefetch" href="https://copilotstudio.microsoft.com" />
      </head>
      <body className="antialiased font-sans bg-white text-gray-900">
        {children}
        <ScrollRestoration />
        <Scripts />
        {/* Script para manejar scroll suave */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Smooth scroll para anchors internos
              document.addEventListener('DOMContentLoaded', function() {
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                  anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href !== '#' && href.startsWith('#')) {
                      e.preventDefault();
                      const target = document.querySelector(href);
                      if (target) {
                        target.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }
                  });
                });

                // Manejar scroll para navegación fija
                let lastScrollTop = 0;
                const navigation = document.querySelector('.navigation');
                
                window.addEventListener('scroll', function() {
                  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                  
                  if (navigation) {
                    if (scrollTop > 50) {
                      navigation.classList.add('scrolled');
                    } else {
                      navigation.classList.remove('scrolled');
                    }
                    
                    if (scrollTop > lastScrollTop && scrollTop > 100) {
                      navigation.classList.add('hidden');
                    } else {
                      navigation.classList.remove('hidden');
                    }
                  }
                  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
                });

                // Inicializar animaciones de scroll
                const observerOptions = {
                  root: null,
                  rootMargin: '0px',
                  threshold: 0.1
                };

                const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      entry.target.classList.add('animate-in');
                    }
                  });
                }, observerOptions);

                // Observar elementos con data-animate
                document.querySelectorAll('[data-animate]').forEach(el => {
                  observer.observe(el);
                });
              });
            `
          }}
        />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Navigation />
      <main className="page-content min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <Chatbot /> {/* ← NUEVO: Chatbot integrado */}
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
      <h1 className="text-4xl font-bold text-red-600 mb-4">{message}</h1>
      <p className="text-lg text-gray-700 mb-6">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto bg-gray-100 rounded-lg">
          <code className="text-sm text-gray-800">{stack}</code>
        </pre>
      )}
      <div className="mt-8">
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← Volver al inicio
        </a>
      </div>
    </main>
  );
}