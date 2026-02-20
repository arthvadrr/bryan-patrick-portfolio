"use client";

import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/memos", label: "Memos" },
  { href: "/snippets", label: "Snippets" },
  { href: "/boilerplates", label: "Boilerplates" },
  { href: "/about", label: "About" },
];

export default function MenuNav() {
  const pathname = usePathname();

  const isActiveRoute = (href: string): boolean => {
    if (!pathname) {
      return false;
    }

    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <Stack
      direction="row"
      spacing={0}
      sx={{
        flexWrap: "no-wrap",
        width: '100%',
      }}>
      {NAV_ITEMS.map((item) => {
        const isActive = isActiveRoute(item.href);

        return (
          <Button
            key={item.href}
            component={Link}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            color={isActive ? "primary" : "inherit"}
            sx={{
              width: "100%",
              cursor: 'pointer',
              borderColor: 'divider',
              borderBottomWidth: '1px',
              borderStyle: 'solid',
              borderRadius: 0,
              borderRightWidth: '1px',
              p: 2,
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </Stack>
  );
}
