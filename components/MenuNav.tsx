"use client";

import Link from "next/link";
import { memo } from "react";
import { usePathname } from "next/navigation";
import { Button, Stack } from "@mui/material";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/snippets", label: "Code Snippets" },
  { href: "/bookmarks", label: "Bookmarks" },
  { href: "/about", label: "About" },
];

/*===================================================
* "What is bravery, without a dash of wrecklessness?"
* 
* - Hawkeye Gough, Oolacile
*====================================================*/
export default memo(function MenuNav() {
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
              p: 1.2,
              textTransform: 'unset'
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </Stack>
  );
})
