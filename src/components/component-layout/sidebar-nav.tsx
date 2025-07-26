"use client";

import { Box } from "@/components/ui-library/box";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MyMenu from "../ui/MyMenu/MyMenu";

const menuItems = [
  {
    key: "1",
    label: "Navigation One",
    icon: <span>📌</span>,
    children: [
      {
        key: "1-1",
        label: "Option 1",
        href: "/option1",
        icon: <span>🔗</span>,
      },
      {
        key: "1-2",
        label: "Option 2",
        children: [
          {
            key: "1-2-1",
            label: "Suboption 1",
            href: "/suboption1",
            icon: <span>🔗</span>,
          },
          {
            key: "1-2-2",
            label: "Suboption 2",
          },
        ],
      },
    ],
  },
  {
    key: "2",
    label: "Navigation Two",
    icon: <span>📊</span>,
    children: [
      {
        key: "2-1",
        label: "Option 1",
        href: "/option2",
        icon: <span>🔗</span>,
      },
      {
        key: "2-2",
        label: "Option 2",
      },
    ],
  },
  {
    key: "3",
    label: "Navigation Three",
    icon: <span>⚙️</span>,
    disabled: true,
  },
];

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultExpanded?: boolean;
  onSectionToggle?: (section: string, isExpanded: boolean) => void;
}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  return (
    <Box className={cn("pb-12", className)} {...props}>
      <h1 className="text-4xl text-center font-semibold">Logo</h1>
      <ScrollArea className="h-[calc(100vh-8rem)] ">
        <Box className="space-y-1 py-4">
          <AnimatePresence initial={false}>
            <MyMenu
              items={menuItems}
              defaultSelectedKeys={["1-1"]}
              defaultOpenKeys={["1"]}
              onSelect={(key) => console.log("Selected:", key)}
            />
          </AnimatePresence>
        </Box>
      </ScrollArea>
    </Box>
  );
}
