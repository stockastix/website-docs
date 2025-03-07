"use client";

import { useEffect } from "react";
import type XInputCEType from "@stockastix/x-input";

// as per https://stackoverflow.com/a/62934334/18612308
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["x-input"]: React.DetailedHTMLProps<
        React.HTMLAttributes<XInputCEType>,
        XInputCEType
      >;
    }
  }
}

export function XInput({
  children,
  type = "expression",
}: {
  children: React.ReactNode;
  type?: string;
}) {
  // use useEffect, as per https://stackoverflow.com/a/79262846
  useEffect(() => {
    import("@stockastix/x-input");
  }, []);

  // not sure why typescript complains, despite namespace declaration above
  // Also tried unsuccessfully https://stackoverflow.com/questions/37414304/typescript-complains-property-does-not-exist-on-type-jsx-intrinsicelements-whe
  // @ts-ignore
  return <x-input data-type={type}>{children}</x-input>;
}
