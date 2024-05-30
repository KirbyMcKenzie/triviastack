import ButtonAddToSlack from "components/ButtonAddToSlack";
import Logo from "components/Logo/Logo";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import classNames from "classnames";

const Menu = ({
  isOpened,
  onClick,
}: {
  isOpened: boolean;
  onClick: () => void; // TODO: type
}) => {
  // const [opened, setOpened] = useState(false);

  return (
    <div
      className={classNames(`tham tham-e-squeeze tham-w-6`, {
        "tham-active": isOpened,
      })}
      onClick={onClick}
    >
      <div className="tham-box">
        <div className="tham-inner" />
      </div>
    </div>
  );
};

function Header() {
  const [top, setTop] = useState(true);
  const [isOpened, setIsOpened] = useState(false);

  // TODO: this may come in handy
  // useEffect(() => {
  //   const scrollHandler = () => {
  //     window.pageYOffset > 10 ? setTop(false) : setTop(true);
  //   };
  //   window.addEventListener("scroll", scrollHandler);
  //   return () => window.removeEventListener("scroll", scrollHandler);
  // }, [top]);

  return (
    <header className="fixed left-0 top-6 right-0 z-30">
      <div
        className={classNames(
          "md:max-w-[700px] mx-6 md:mx-auto px-4  bg-slate backdrop-blur-xl md:bg-opacity-90",
          {
            "rounded-3xl border border-slate-200": isOpened,
            "rounded-full border border-slate-200": !isOpened,
          }
        )}
        style={{ backgroundColor: "rgba(255, 255, 255, .6)" }}
      >
        <div className="flex items-center justify-between py-2 ">
          <Link href="/" passHref>
            <span className="flex items-center">
              <Logo />
              <span className=" ml-2 font-bold text-xl">TriviaStack</span>
            </span>
          </Link>
          <nav className="flex flex-col flex-grow">
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li className="md:flex hidden">
                <Link href="/support" passHref>
                  <span className="font-medium  hover:text-blue-600 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                    Support
                  </span>
                </Link>
              </li>
              <li className="hidden md:block">
                <ButtonAddToSlack height={46} width={160} />
              </li>
              <li className=" md:hidden mr-1">
                <Menu
                  onClick={() => setIsOpened(!isOpened)}
                  isOpened={isOpened}
                />
              </li>
            </ul>
          </nav>
        </div>
        {isOpened && (
          <div className="transition-all ease-in-out duration-1000 mt-0.5 border-t border-gray-300 my-4">
            <ul className="flex flex-col flex-grow flex-wrap">
              <li className="md:flex mt-2 px-3">
                <Link href="/support" passHref>
                  <span className="font-medium  hover:text-blue-600 py-3 flex items-center transition duration-150 ease-in-out">
                    Support
                  </span>
                </Link>
                <Link href="/support" passHref>
                  <span className="font-medium  hover:text-blue-600 py-3 flex items-center transition duration-150 ease-in-out">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li className="">
                <div className="my-4 border-t border-gray-300 pt-4 mx-auto text-center">
                  <p className="font-semibold text-lg">Install for free 👇</p>
                  <div className="my-4">
                    <a
                      href="https://triviastack.fly.dev/slack/install"
                      className="inline-flex items-center justify-center no-underline font-medium border bg-blue-600 text-white py-3 px-5 -ml-2  rounded-full hover:shadow-lg transition-all duration-300 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ height: 20, width: 20, marginRight: 8 }}
                        viewBox="0 0 122.8 122.8"
                      >
                        <path
                          d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
                          fill="#fff"
                        ></path>
                        <path
                          d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
                          fill="#fff"
                        ></path>
                        <path
                          d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
                          fill="#fff"
                        ></path>
                        <path
                          d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
                          fill="#fff"
                        ></path>
                      </svg>
                      Add to Slack
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
