import Link from "next/link";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-black fixed w-full top-0 z-10">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Netflix Logo"
          width={144}
          height={44}
          // className="w-36"
        />
      </Link>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link className="hover:text-gray-300" href={"/"}>
              Нүүр хуудас
            </Link>
          </li>
          <li>
            <Link className="hover:text-gray-300" href={"/"}>
              Кино сан
            </Link>
          </li>
          <li>
            <Link className="hover:text-gray-300" href={"/"}>
              ТВ шоу
            </Link>
          </li>
          <li>
            <Link className="hover:text-gray-300" href={"/"}>
              Миний жагсаалт
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
