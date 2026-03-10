import { Box } from '@mui/material';
import { Twitch } from './SVG';
import RetroButtonLink, { SocialMedia } from './RetroButtonLink';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import type { ReactNode } from 'react';

interface SocialLink {
  text: SocialMedia;
  href: string;
  icon: ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    text: 'GitHub',
    href: 'https://github.com/arthvadrr',
    icon: <GitHubIcon />,
  },
  {
    text: 'LinkedIn',
    href: 'https://linkedin.com/arthvadrr',
    icon: <LinkedInIcon />,
  },
  {
    text: 'YouTube',
    href: 'https://www.youtube.com/@arthvadrr',
    icon: <YouTubeIcon />,
  },
  {
    text: 'Twitch',
    href: 'https://www.twitch.tv/arthbryan',
    icon: (
      <Twitch
        width='24px'
        height='24px'
      />
    ),
  },
];

export default function SocialLinks() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
      }}
    >
      {SOCIAL_LINKS.map((link) => {
        const { text, href, icon } = link;

        return (
          <RetroButtonLink
            key={`social-link-${text}`}
            href={href}
            icon={icon}
            mediaColor={text}
          >
            {text}
          </RetroButtonLink>
        );
      })}
    </Box>
  );
}
