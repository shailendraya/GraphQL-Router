import React from "react";
import { classNames } from "utils/helpers";

type Props = {
  name: string;
  href: string;
  handleNavigate: (href: string, name: string) => void;
};

const NavItem = ({ name, href, handleNavigate }: Props) => {
  const active = window.location.pathname.includes(href);

  return (
    <a
      key={name}
      onClick={() => handleNavigate(href, name)}
      className={classNames(
        active
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white",
        "rounded-md px-3 py-2 text-sm font-medium cursor-pointer",
      )}
      aria-current={active ? "page" : undefined}
    >
      {name}
    </a>
  );
};

export default NavItem;
