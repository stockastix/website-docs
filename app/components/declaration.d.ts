import type XInputCEType from "@stockastix/x-input";

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      ["x-input"]: React.DetailedHTMLProps<
        React.HTMLAttributes<XInputCEType>,
        XInputCEType
      >;
    }
  }
}
