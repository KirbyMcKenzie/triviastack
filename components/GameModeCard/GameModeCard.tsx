import React, { FC } from "react";

export interface Props {
  emoji: string;
  title: string;
  subtitle: string;
}

const GameModeCard: FC<Props> = ({ emoji, title, subtitle }) => {
  return (
    <div className="flex flex-col justify-center w-full px-8 rounded-[46px] my-3 md:my-12 min-h-[384px]">
      <div className="text-8xl hover:scale-125 transition-all ease-in-out">
        {emoji}
      </div>
      <h3 className="text-4xl font-extrabold my-6">{title}</h3>
      <p className="text-md font-light text-slate-300">{subtitle}</p>
    </div>
  );
};

export default GameModeCard;
