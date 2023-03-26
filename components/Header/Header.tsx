import Logo from "components/Logo/Logo";
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
        !top && "bg-slate backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          <div className="flex-shrink-0 mr-2">
            <Link href="/">
              <a className="block">
                <Logo />
              </a>
            </Link>
          </div>
          <span className="font-bold text-xl">Triviabot</span>
          <nav className="flex flex-grow">
            {/* <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li>
                <a
                  href="/signin"
                  className="font-medium text-white hover:text-orange-400 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Sign in
                </a>
              </li>
            </ul> */}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
