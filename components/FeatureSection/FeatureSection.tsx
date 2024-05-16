import React from "react";

export interface Props {
  title: string;
  subtitle: string;
  contentNode: React.ReactNode;
}

const FeatureSection: React.FC<Props> = ({ title, subtitle, contentNode }) => {
  return (
    <section className="flex row w-full">
      <div className="w-full justify-start text-left mr-2">
        <h2 className="text-6xl font-extrabold">{title}</h2>
        <span className="block text-xl my-6 text-slate-600">{subtitle}</span>
      </div>

      <div className="flex w-full items-center justify-center ml-2">
        {contentNode}
      </div>
    </section>
  );
};

export default FeatureSection;
