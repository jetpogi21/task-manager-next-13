//Generated by GeneratePageFile
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Breadcrumb",
};

const CaretIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-4 h-4", className)}
    >
      <path
        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

interface Link {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  className?: string;
  links: Link[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
  return (
    <div className="flex items-center mb-4 space-x-1 text-sm text-muted-foreground">
      {props.links.map((item, idx) => {
        if (idx === 0) {
          return (
            <Link
              href={item.href}
              className="overflow-hidden text-ellipsis whitespace-nowrap"
              key={item.name}
            >
              {item.name}
            </Link>
          );
        } else {
          return (
            <div
              key={item.name}
              className="flex items-center space-x-1"
            >
              <CaretIcon className={props.className} />
              <div className="font-medium text-foreground">{item.name}</div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Breadcrumb;