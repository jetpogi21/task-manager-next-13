"use client";

import { usePathname } from "next/navigation";
import { links } from "@/lib/header-links";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className="min-w-[250px] py-4 pl-4 pr-2 flex flex-col items-center flex-grow-0">
      <div className="h-[100px] flex items-center">
        <Link
          className="text-2xl font-bold leading-none"
          href="/"
        >
          Pradascus
        </Link>
      </div>
      <div className="flex flex-col w-full text-sm">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={cn("p-2 rounded-sm hover:bg-accent", {
              "bg-accent":
                link.href === "/"
                  ? pathname === link.href
                  : pathname.includes(link.href),
            })}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
