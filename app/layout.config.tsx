import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

import { PROJECT, URL } from "@stockastix/meta";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    url: URL,
    title: (
      <>
        <Image
          src="https://res.cloudinary.com/dsotf1kzl/image/upload/v1592310840/icons/threeballs.png"
          alt="logo"
          width="24"
          height="24"
        />
        {PROJECT}
      </>
    ),
  },
  links: [
    {
      text: "Documentation",
      url: "/docs",
      active: "nested-url",
    },
  ],
  githubUrl: "https://github.com/stockastix",
};
