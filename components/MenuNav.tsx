'use client';

import { memo } from 'react';
import { usePathname } from 'next/navigation';
import { Button, Stack } from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CodeIcon from '@mui/icons-material/Code';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PersonIcon from '@mui/icons-material/Person';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: <HomeIcon /> },
  { href: '/articles', label: 'Articles', icon: <LibraryBooksIcon /> },
  { href: '/snippets', label: 'Code Snippets', icon: <CodeIcon /> },
  { href: '/bookmarks', label: 'Bookmarks', icon: <BookmarksIcon /> },
  { href: '/about', label: 'About', icon: <PersonIcon /> },
];

/*===================================================
 * "What is bravery, without a dash of wrecklessness?"
 *
 * - Hawkeye Gough, Oolacile
 *====================================================*/
export default memo(function MenuNav() {
  const pathname = usePathname();

  function isActiveRoute(href: string): boolean {
    if (!pathname) {
      return false;
    }

    if (href === '/') {
      return pathname === '/';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <Stack
      direction='row'
      spacing={0}
      sx={{
        flexWrap: 'no-wrap',
        width: '100%',

        '& a:last-of-type': {
          borderRight: 0,
        },
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = isActiveRoute(item.href);

        return (
          <Button
            key={item.href}
            component={Link}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            color={isActive ? 'primary' : 'inherit'}
            sx={{
              display: 'flex',
              gap: 1,
              width: '100%',
              cursor: 'pointer',
              borderColor: 'divider',
              borderBottomWidth: '1px',
              borderStyle: 'solid',
              borderRadius: 0,
              borderRightWidth: '1px',
              p: 1.2,
              textTransform: 'unset',
            }}
          >
            {item.icon}
            {item.label}
          </Button>
        );
      })}
    </Stack>
  );
});
