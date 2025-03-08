import Link from "next/link";
import React, { useState } from "react";
import classNames from "classnames";

import ButtonAddToSlack from "components/ButtonAddToSlack";
import Logo from "components/Logo/Logo";

const Menu = ({
  isOpened,
  onClick,
}: {
  isOpened: boolean;
  onClick: () => void;
}) => {
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
  const [isOpened, setIsOpened] = useState(false);

  return (
    <header className="fixed left-0 top-6 right-0 z-30">
      <div
        className={classNames(
          "md:max-w-[700px] mx-6 md:mx-auto px-4 backdrop-blur-2xl bg-opacity-60 bg-[#00010e]",
          {
            "rounded-3xl border border-gray-900": isOpened,
            "rounded-full border border-gray-900": !isOpened,
          }
        )}
        style={{ backgroundColor: "rgb(0 1 14 / 60%)" }}
      >
        <div className="flex items-center justify-between py-2 ">
          <Link href="/" passHref>
            <span className="flex items-center">
              <Logo />
              <span className="ml-2 font-bold text-xl hover:text-blue-600">
                TriviaStack
              </span>
            </span>
          </Link>
          <nav className="flex flex-col flex-grow">
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li className="md:flex hidden ">
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
          <div className="transition-all ease-in-out duration-1000 mt-0.5 border-t border-slate-500 my-4">
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
                <div className="my-4 border-t border-slate-500 pt-4 mx-auto text-center">
                  <p className="font-medium text-lg text-slate-500">
                    Install for free 👇
                  </p>
                  <div className="my-4">
                    <ButtonAddToSlack
                      border="1px solid #64748b"
                      color="#64748b"
                    />
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
