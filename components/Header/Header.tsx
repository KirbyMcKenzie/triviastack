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
        className="w-[700px] mx-auto px-5 sm:px-6 border border-slate-300 rounded-full bg-slate backdrop-blur-xl md:bg-opacity-90"
        style={{ backgroundColor: "rgba(255, 255, 255, .6)" }}
      >
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link href="/">
            <a className="flex items-center">
              <Logo />
              <span className=" ml-2 font-bold text-xl">TriviaStack</span>
            </a>
          </Link>
          <nav className="flex flex-grow">
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li>
                <Link href="/support">
                  <a className="font-medium  hover:text-blue-600 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                    Support
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
