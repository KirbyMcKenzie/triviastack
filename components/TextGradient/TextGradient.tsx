import React, { FC } from "react";

type Color =
  | "orange"
  | "red"
  | "blue"
  | "green"
  | "slate"
  | "yellow"
  | "purple"
  | "Indigo"
  | "pink";

export interface Props {
  from?: Color;
  to?: Color;
}

// TODO: rework this to work with changing props
const TextGradient: FC<Props> = ({
  from = "orange",
  to = "yellow",
  children,
}) => {
  return (
    <span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-${from}-500 to-${to}-400`}
    >
      {children}
    </span>
  );
};

export default TextGradient;
