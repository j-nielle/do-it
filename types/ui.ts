import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Color =
  | "secondary"
  | "success"
  | "primary"
  | "default"
  | "warning"
  | "danger"
  | "foreground"
  | undefined;
