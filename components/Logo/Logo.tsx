import React, { FC } from "react";

export interface Props {
  vectorOnly?: boolean;
}

const Logo: FC<Props> = ({ vectorOnly = false }) => {
  return (
    <svg width="33" height="35" fill="none" xmlns="http://www.w3.org/2000/svg">
      {!vectorOnly && (
        <rect x=".176" y=".176" width="32" height="32" rx="16" fill="#2658E8" />
      )}
      <g filter="url(#a)">
        <path
          d="M21.955 11.483c.16 0 .29-.13.28-.288a4.999 4.999 0 0 0-.453-1.8 5.456 5.456 0 0 0-1.316-1.77 6.152 6.152 0 0 0-1.968-1.183 6.662 6.662 0 0 0-2.322-.415c-.797 0-1.586.141-2.322.415a6.152 6.152 0 0 0-1.969 1.183 5.456 5.456 0 0 0-1.315 1.77 4.999 4.999 0 0 0-.453 1.8c-.01.159.12.288.28.288h11.558Z"
          fill="url(#b)"
        />
        <path
          d="M18.317 17.955c.057.155.232.23.38.158a6.199 6.199 0 0 0 2.507-2.275 6.825 6.825 0 0 0 1.034-3.373.28.28 0 0 0-.284-.288l-5.364.019a.289.289 0 0 0-.27.39l1.997 5.369Z"
          fill="url(#c)"
        />
        <path
          d="M16.564 15.232a.278.278 0 0 0-.382-.158 6.197 6.197 0 0 0-2.506 2.274 6.826 6.826 0 0 0-1.034 3.373.28.28 0 0 0 .284.288l5.364-.018c.2 0 .34-.201.27-.39l-1.996-5.37Z"
          fill="url(#d)"
        />
        <path
          d="M17.534 24.431a1.863 1.863 0 1 1-3.726-.001 1.863 1.863 0 0 1 3.726.001Z"
          fill="url(#e)"
        />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1="15.67"
          y1="22.569"
          x2="15.67"
          y2="26.294"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#E1E1E1" />
        </linearGradient>
        <linearGradient
          id="c"
          x1="15.67"
          y1="22.569"
          x2="15.67"
          y2="26.294"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#E1E1E1" />
        </linearGradient>
        <linearGradient
          id="d"
          x1="15.67"
          y1="22.569"
          x2="15.67"
          y2="26.294"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#E1E1E1" />
        </linearGradient>
        <linearGradient
          id="e"
          x1="15.67"
          y1="22.569"
          x2="15.67"
          y2="26.294"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#E1E1E1" />
        </linearGradient>
        <filter
          id="a"
          x="6.116"
          y="6.027"
          width="20.123"
          height="28.267"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_433_38"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_433_38"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Logo;
