'use client'

import MainTemplate from "../../components/templates/MainTemplate";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import FeaturedArticles from "../../components/FeaturedArticles";
import FeaturedBookmarks from "../../components/FeaturedBookmarks";
import FeaturedSnippets from "../../components/FeaturedSnippets";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

const getImageEffectStyles: SxProps<Theme> = (theme: Theme) => ({
  position: 'relative',
  width: '200px',
  height: '200px',
  flexShrink: 0,
  top: 0,
  left: 0,
  borderRadius: '50%',
  isolation: 'isolate',
  '--gradient-angle': '0deg',
  transition: '--gradient-angle 400ms',

  '@keyframes gradient-spin': {
    from: {
      '--gradient-angle': '360deg',
    },
    to: {
      '--gradient-angle': '720deg',
    },
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    borderRadius: '50%',
    opacity: 0,
    transition: 'all 200ms',
    zIndex: 4,
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    inset: -2,
    borderRadius: '50%',
    width: '202px',
    height: '202px',
    background: `conic-gradient(from var(--gradient-angle), ${theme.palette.divider})`,
    p: '4px',
    transition: 'all 200ms',
    zIndex: 2,
  },

  '& img': {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: '100%',
    backgroundColor: 'transparent',
    transition: 'all 300ms',
    zIndex: 3,
  },

  '&:hover img, &:hover::before': {
    width: '220px',
    height: '220px',
    top: '-15px',
    left: '-10px',
    p: '2px',
  },

  '&:hover::before': {
    background: 'conic-gradient(from var(--gradient-angle), #ffb742, #f2247e, #ba34eb, #2cdec3, #ffb742)',
    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    maskComposite: 'subtract',
  },

  '&:hover::after': {
    width: '240px',
    height: '240px',
    top: '-20px',
    left: '-20px',
    opacity: 0.85,
    filter: 'blur(34px)',
    background: 'conic-gradient(from var(--gradient-angle), rgba(255, 183, 66, 0.38), rgba(242, 36, 126, 0.38), rgba(186, 52, 235, 0.38), rgba(44, 222, 195, 0.38), rgba(255, 183, 66, 0.38))',
  },

  '&:hover img': {
    width: '240px',
    height: '240px',
    top: '-35px',
    left: '-20px',
    transform: 'rotate(5deg)',
  },

  '&:hover': {
    '--gradient-angle': '360deg',
    animation: 'gradient-spin 3s linear infinite',
    animationDelay: '400ms',
  }
});

/*============================================================
 * "The place where you lock yourself in and lock all else out, 
 * that’s not your home. Your home is sometimes a place you 
 * travel long and far to find."
 * 
 * - Geralt of Rivia
 *============================================================*/
export default function Home() {
  return (
    <MainTemplate>
      <Stack
        direction={{
          sm: "column",
          md: "row"
        }}
        alignItems="center"
        sx={{
          alignItems: 'center',
          gap: 2,
        }}>
        {
          <Box sx={getImageEffectStyles}>
            <Image
              src="/images/bryan-shades_200x200.png"
              alt="A photo of Bryan"
              width="200"
              height="200"
              loading="eager"
            />
          </Box>
        }
        <Stack spacing={2} sx={{ py: 6, zIndex: 2 }}>
          <Typography variant="h1">
            Hello! <br /> My name is Bryan.
          </Typography>
          <Typography>
            This is my personal site. Here there are code snippets, a collection of articles, bookmarks, and widgets for things I use all the time.
          </Typography>
        </Stack>
      </Stack>
      <FeaturedArticles />
      <FeaturedBookmarks />
      <FeaturedSnippets />
    </MainTemplate >
  );
}
