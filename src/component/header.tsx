"use client";
import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IMenuItem } from "@/types/backend";
import "./style.css";

const menuItem: IMenuItem[] = [
  {
    href: "/",
    name: "home",
    icon: <MailOutlined />,
  },
  {
    href: "/users",
    name: "Users",
    icon: <MailOutlined />,
  },
  {
    href: "/blogs",
    name: "Blogs",
    icon: <AppstoreOutlined />,
  },
];

// const Header: React.FC = () => {
//   const [current, setCurrent] = useState("home");
//   const onClick: MenuProps["onClick"] = (e) => {
//     setCurrent(e.key);
//   };

//   return (
//     <Menu
//       onClick={onClick}
//       selectedKeys={[current]}
//       mode="horizontal"
//       items={items}
//     />
//   );
// };
function Header() {
  const pathname = usePathname();
  return (
    <div className="container">
      {menuItem.map((link) => {
        // const isActive = pathname.startsWith(link.href);
        const isActive = pathname === link.href;
        return (
          <Link
            className={`item ${isActive ? "active" : ""}`}
            href={link.href}
            key={link.name}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}

export default Header;
