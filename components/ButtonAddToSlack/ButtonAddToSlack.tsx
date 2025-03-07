import React, { FC } from "react";

export interface Props {
  height?: number;
  width?: number;
  color?: string;
  logoColor?: "white" | "slack";
  backgroundColor?: string;
  border?: string;
}

// TODO: update props with tw classes
const ButtonAddToSlack: FC<Props> = ({
  height = 54,
  width = 184,
  color = "white",
  logoColor = "slack",
  backgroundColor = "#00010e",
  border = "1px solid rgb(0 1 14 / 60%)",
}) => {
  return (
    <a
      href="https://triviastack.fly.dev/slack/install"
      className="inline-flex items-center justify-center no-underline font-semibold px-4 rounded-full hover:shadow-xl shadow-lg transition-all duration-300 ease-in-out"
      style={{
        height,
        width,
        backgroundColor,
        color,
        border,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: 20, width: 20, marginRight: 8 }}
        viewBox="0 0 122.8 122.8"
      >
        <path
          d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
          fill={logoColor === "slack" ? "#e01e5a" : "#fff"}
        ></path>
        <path
          d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
          fill={logoColor === "slack" ? "#36c5f0" : "#fff"}
        ></path>
        <path
          d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
          fill={logoColor === "slack" ? "#2eb67d" : "#fff"}
        ></path>
        <path
          d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
          fill={logoColor === "slack" ? "#ecb22e" : "#fff"}
        ></path>
      </svg>
      Add to Slack
    </a>
  );
};

export default ButtonAddToSlack;
