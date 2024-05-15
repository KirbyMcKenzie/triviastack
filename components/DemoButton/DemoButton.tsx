import Sparkle from "components/icons/Sparkle";
import React, { FC, ReactElement } from "react";

const DemoButton: FC = (): ReactElement => {
  return (
    <a
      href="https://calendly.com/kirby-mckenzie/30min"
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center no-underline font-semibold px-4 rounded-full hover:shadow-lg transition-all duration-300 ease-in-out "
      style={{ height: 54, width: 184, backgroundColor: "#F2F2F2" }}
    >
      <span className="mr-2">
        <Sparkle />
      </span>
      {"Book a Demo"}
    </a>
  );
};

export default DemoButton;
