"use client";
import { usePathname } from "next/navigation";
import { links } from "@/lib/header-links";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useScreenSize from "@/hooks/useScreenSize";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "lg:min-w-[250px] p-4 flex flex-col items-center flex-grow-0 border-r border-border"
      )}
    >
      <div className={cn("h-[100px] flex items-center")}>
        <Link
          className="text-2xl font-bold leading-none"
          href="/"
        >
          <span className="lg:hidden">TM</span>
          <span className="hidden lg:block">Task Manager</span>
        </Link>
      </div>
      <div className="flex flex-col w-full text-sm">
        {links.map((link) => (
          <Tooltip key={link.id}>
            <TooltipTrigger>
              <Link
                href={link.href}
                className={cn(
                  "p-2 rounded-sm hover:bg-accent flex gap-4 items-center",
                  {
                    "bg-accent":
                      link.href === "/"
                        ? pathname === link.href
                        : pathname.includes(link.href),
                  }
                )}
              >
                <link.icon className="w-4 h-4" />
                <span className="hidden lg:block">{link.name}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="lg:hidden"
            >
              {link.name}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
