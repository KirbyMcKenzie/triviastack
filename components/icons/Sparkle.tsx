import React, { FC } from "react";

export interface Props {}

const Sparkle: FC<Props> = () => {
  return (
    <svg width="26" height="27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.914 0C9.054 5.985 5.789 9.558.18 10.512c5.61.945 8.873 4.527 9.734 10.503.851-5.976 4.116-9.558 9.725-10.503C14.029 9.558 10.766 5.985 9.914 0Zm9.725 0c-.245 1.719-1.181 2.745-2.792 3.015 1.61.27 2.547 1.305 2.792 3.015.253-1.71 1.189-2.745 2.8-3.015-1.611-.27-2.547-1.296-2.8-3.015Zm0 15.039c-.481 3.402-2.337 5.445-5.533 5.976 3.196.54 5.052 2.583 5.533 5.985.489-3.402 2.345-5.445 5.541-5.985-3.197-.531-5.052-2.574-5.541-5.976Z"
        fill="#000"
      />
    </svg>
  );
};

export default Sparkle;
