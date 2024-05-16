import ButtonAddToSlack from "components/ButtonAddToSlack";
import Logo from "components/Logo/Logo";
import Link from "next/link";
import React, { useState, useEffect } from "react";

function Header() {
  const [top, setTop] = useState(true);

  // TODO: this may come in handy
  // useEffect(() => {
  //   const scrollHandler = () => {
  //     window.pageYOffset > 10 ? setTop(false) : setTop(true);
  //   };
  //   window.addEventListener("scroll", scrollHandler);
  //   return () => window.removeEventListener("scroll", scrollHandler);
  // }, [top]);

  // TODO: fix next links
  return (
    <header className="fixed left-0 top-6 right-0 z-30">
      <div
        className="md:max-w-[700px] mx-6 md:mx-auto px-4 border border-slate-200 rounded-full bg-slate backdrop-blur-xl md:bg-opacity-90"
        style={{ backgroundColor: "rgba(255, 255, 255, .6)" }}
      >
        <div className="flex items-center justify-between py-2 ">
          <Link href="/">
            <a className="flex items-center">
              <Logo />
              <span className=" ml-2 font-bold text-xl">TriviaStack</span>
            </a>
          </Link>
          <nav className="flex flex-grow">
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li className="md:flex hidden">
                <Link href="/support">
                  <a className="font-medium  hover:text-blue-600 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                    Support
                  </a>
                </Link>
              </li>
              <li>
                <ButtonAddToSlack height={42} width={160} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
