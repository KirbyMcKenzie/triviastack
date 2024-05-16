import React from "react";

export interface Props {
  title: string;
  subtitle: string;
  contentNode: React.ReactNode;
}

const FeatureSection: React.FC<Props> = ({ title, subtitle, contentNode }) => {
  return (
    <section className="flex flex-col w-full mx-auto">
      <div>
        <h2 className="text-6xl font-extrabold">{title}</h2>
        <span className="block text-xl mt-4 mb-8 text-slate-600">
          {subtitle}
        </span>
      </div>

      <div className="flex w-full justify-center">{contentNode}</div>
    </section>
  );
};

export default FeatureSection;
