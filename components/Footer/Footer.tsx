import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="w-full mb-6 md:mb-0">
      <div className="md:max-w-6xl mx-auto px-4 text-slate-500">
        <div className="flex flex-col w-full md:flex-row md:items-center md:justify-between py-4 md:py-8 border-t border-gray-500 text-sm md:text-md">
          <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0 gap-x-4">
            <li className="hover:text-blue-600">
              <Link href="/support">Support</Link>
            </li>
            <li className="hover:text-blue-600">
              <Link href="/privacy.html">Privacy Policy</Link>
            </li>
          </ul>

          <div className="mr-4">
            Created by{" "}
            <a
              className="hover:underline font-medium hover:text-blue-600"
              target="blank"
              href="https://kirby.co.nz"
            >
              Kirby McKenzie
            </a>
            . All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
