import "./theme/global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
});

const GoogleAnalyticsMeasurementId = "G-BG7R43KT6T";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={inter.className}
      suppressHydrationWarning
      data-color-mode="auto"
      data-light-theme="dark_high_contrast"
    >
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src={`"https://www.googletagmanager.com/gtag/js?id=${GoogleAnalyticsMeasurementId}"`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GoogleAnalyticsMeasurementId}');
          `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
