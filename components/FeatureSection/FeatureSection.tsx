import React from "react";

export interface Props {
  title: string;
  subtitle: string;
  contentNode: React.ReactNode;
  contentSide?: "left" | "right";
}

const FeatureSection: React.FC<Props> = ({
  title,
  subtitle,
  contentNode,
  contentSide = "right",
}) => {
  return (
    <section className="flex flex-col md:flex-row w-full">
      <div
        className={`flex flex-col w-full md:w-1/2 ${
          contentSide === "right" ? "md:order-1" : "md:order-2"
        } md:justify-start md:text-left`}
      >
        <h2 className="text-4xl md:text-6xl font-extrabold">{title}</h2>
        <span className="block text-lg my-4 font-light text-slate-300">
          {subtitle}
        </span>
      </div>
      <div
        className={`flex w-full items-center justify-center md:w-1/2 ${
          contentSide === "right"
            ? "md:order-2 md:ml-4 md:pl-8"
            : "md:order-1 md:mr-4 md:pr-8"
        }`}
      >
        {contentNode}
      </div>
    </section>
  );
};

export default FeatureSection;
