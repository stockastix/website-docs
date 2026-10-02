"use client";

import { useEffect } from "react";

// import type { HTMLAttributes, ReactNode } from "react";
// import type XInputCEType from "@stockastix/x-input";

export function XInput({
  children,
  type = "expression",
  // ...props
}: /* HTMLAttributes<XInputCEType> & */ {
  children?: React.ReactNode; // string?
  type?: string;
}) {
  // // use useEffect, as per https://stackoverflow.com/a/79262846
  // useEffect(() => {
  //   import("@stockastix/x-input");
  // }, []);

  return (
    <x-input spellCheck="false" data-type={type}>
      {children}
    </x-input>
  );
}
