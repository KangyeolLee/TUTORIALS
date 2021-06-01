import Link from "next/link";
import Image from "next/image";
import { MdMenu, MdSearch, MdNotificationsNone } from "react-icons/md";

const Navbar = () => {
  return (
    <header className="h-24 sticky top-0 z-50 bg-white shadow-xl">
      <ul className="h-full flex gap-5 items-center justify-between sm:container sm:mx-auto md:px-10">
        <li className="hover:opacity-60 cursor-pointer">
          <Link href="/">
            <a className="flex items-center">
              <Image
                src="/img/logo.svg"
                alt="logo image"
                width={60}
                height={60}
              />
              <div className="flex flex-col">
                <p className="font-bold">자본주의</p>
                <p className="text-right font-bold">소설</p>
              </div>
            </a>
          </Link>
        </li>

        <div className="flex gap-10">
          <li className="hover:opacity-60 cursor-pointer">
            <Link href="/">
              <a>TOP100</a>
            </Link>
          </li>
          <li className="hover:opacity-60 cursor-pointer">
            <Link href="/">
              <a>창작마당</a>
            </Link>
          </li>
          <li className="hover:opacity-60 cursor-pointer">
            <Link href="/">
              <a>자유연재</a>
            </Link>
          </li>
          <li className="hover:opacity-60 cursor-pointer">
            <Link href="/">
              <a>내서재</a>
            </Link>
          </li>
        </div>

        <div className="flex gap-5 text-2xl">
          <li className="hover:opacity-60 cursor-pointer">
            <MdNotificationsNone />
          </li>
          <li className="hover:opacity-60 cursor-pointer">
            <MdSearch />
          </li>
          <li className="hover:opacity-60 cursor-pointer">
            <MdMenu />
          </li>
        </div>
      </ul>
    </header>
  );
};

export default Navbar;
