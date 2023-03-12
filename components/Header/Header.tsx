import Link from "next/link";
import React, { useState, useEffect } from "react";

function Header() {
  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  // TODO: fix next links
  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && "bg-white backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-2">
            {/* Logo */}
            <Link href="/">
              <a className="block" aria-label="Cruip">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="32" rx="8" fill="black" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.2321 24.5641C21.0106 24.5641 24.8844 20.6903 24.8844 15.9117C24.8844 11.1332 21.0106 7.25938 16.2321 7.25938C11.4535 7.25938 7.5797 11.1332 7.5797 15.9117C7.5797 20.6903 11.4535 24.5641 16.2321 24.5641ZM16.2321 27C22.3559 27 27.3203 22.0356 27.3203 15.9117C27.3203 9.78787 22.3559 4.82349 16.2321 4.82349C10.1082 4.82349 5.1438 9.78787 5.1438 15.9117C5.1438 22.0356 10.1082 27 16.2321 27Z"
                    fill="#DDDDDD"
                  />
                  <path
                    d="M26.7813 15.6062C26.7813 21.5614 21.9537 26.389 15.9986 26.389C10.0434 26.389 5.21582 21.5614 5.21582 15.6062C5.21582 9.65109 10.0434 4.82349 15.9986 4.82349C21.9537 4.82349 26.7813 9.65109 26.7813 15.6062Z"
                    fill="white"
                  />
                  <path
                    d="M15.9525 15.5936L11.8576 5.70947L20.0151 5.69617L15.9525 15.5936Z"
                    fill="#EC7E2E"
                  />
                  <path
                    d="M16.0344 15.574L20.0959 25.4941H11.9729L16.0344 15.574Z"
                    fill="#49B5A5"
                  />
                  <path
                    d="M15.9894 15.5614L25.8826 11.4884L25.8778 19.6459L15.9894 15.5614Z"
                    fill="#F3E141"
                  />
                  <path
                    d="M15.978 15.6288L6.07827 19.6856L6.09633 11.5281L15.978 15.6288Z"
                    fill="#8954F1"
                  />
                  <path
                    d="M15.956 15.5722L20.0466 5.68628L25.826 11.4433L15.956 15.5722Z"
                    fill="#E1544A"
                  />
                  <path
                    d="M16.0083 15.6149L11.9016 25.4941L6.1316 19.7276L16.0083 15.6149Z"
                    fill="#49B2D2"
                  />
                  <path
                    d="M16.005 15.5752L25.8818 19.6876L20.112 25.4543L16.005 15.5752Z"
                    fill="#4FC365"
                  />
                  <path
                    d="M15.9492 15.6149L6.07917 11.4864L11.8584 5.72917L15.9492 15.6149Z"
                    fill="#D048E9"
                  />
                  <g filter="url(#filter0_d_202_82)">
                    <path
                      d="M15.0938 19.6912L10.6705 20.7341L11.979 16.382L15.0938 19.6912Z"
                      fill="white"
                    />
                    <path
                      d="M20.9331 15.4623C20.9331 18.1223 18.7768 20.2786 16.1168 20.2786C13.4569 20.2786 11.3005 18.1223 11.3005 15.4623C11.3005 12.8023 13.4569 10.646 16.1168 10.646C18.7768 10.646 20.9331 12.8023 20.9331 15.4623Z"
                      fill="white"
                    />
                  </g>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.0883 24.2406C20.8668 24.2406 24.7406 20.3668 24.7406 15.5883C24.7406 10.8097 20.8668 6.9359 16.0883 6.9359C11.3097 6.9359 7.4359 10.8097 7.4359 15.5883C7.4359 20.3668 11.3097 24.2406 16.0883 24.2406ZM16.0883 26.6765C22.2121 26.6765 27.1765 21.7121 27.1765 15.5883C27.1765 9.46438 22.2121 4.5 16.0883 4.5C9.96438 4.5 5 9.46438 5 15.5883C5 21.7121 9.96438 26.6765 16.0883 26.6765Z"
                    fill="white"
                  />
                  <defs>
                    <filter
                      id="filter0_d_202_82"
                      x="6.67041"
                      y="10.646"
                      width="18.2627"
                      height="18.0881"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_202_82"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_202_82"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </a>
            </Link>
          </div>
          <span className="font-bold text-lg">triviabot</span>
          <nav className="flex flex-grow">
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              {/* <li>
                <a
                  href="/signin"
                  className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Sign in
                </a>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
