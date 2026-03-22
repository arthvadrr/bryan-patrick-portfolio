import { Box, Link } from '@mui/material';
import { ReactNode } from 'react';

export type SocialMedia = 'GitHub' | 'LinkedIn' | 'YouTube' | 'Twitch';

interface RetroButtonLinkProps {
  href: string;
  icon?: ReactNode;
  size?: string;
  mediaColor: SocialMedia;
  children: ReactNode;
}

const MEDIA_COLORS = {
  GitHub: { foreground: '#7A3196', background: '#46264c', textColor: '#ffffff' },
  LinkedIn: { foreground: '#1058A3', background: '#1f2852', textColor: '#ffffff' },
  YouTube: { foreground: '#CF2726', background: '#561e18', textColor: '#ffffff' },
  Twitch: { foreground: '#A970FF', background: '#571d84', textColor: '#ffffff' },
};

export default function RetroButtonLink({ href, icon, mediaColor, children, ...props }: RetroButtonLinkProps) {
  return (
    <Link
      href={href}
      {...props}
      sx={(theme) => ({
        display: 'inline-flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        color: theme.palette.text.primary,
        textDecoration: 'none',
        border: `3px solid ${theme.palette.background.card}`,
        borderTopWidth: '2px',
        borderBottomWidth: 12,
        backgroundColor: theme.palette.divider,
        py: 0.5,
        px: 1,
        transition: 'all 160ms ease',

        '&:hover, &:focus': {
          borderBottomWidth: 8,
          marginTop: 0.5,
          backgroundColor: MEDIA_COLORS[mediaColor].foreground,
          borderColor: MEDIA_COLORS[mediaColor].background,
          backdropFilter: 'drop-shadow(10px 10px 10px #fafafa)',
        },

        '&:active': {
          borderBottomWidth: 4,
          marginTop: 1,
        },
      })}
    >
      {icon && <Box>{icon}</Box>}
      <Box>{children}</Box>
    </Link>
  );
}
