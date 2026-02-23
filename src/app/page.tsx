'use client'

import MainTemplate from "../../components/templates/MainTemplate";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import FeaturedArticles from "../../components/FeaturedArticles";
import FeaturedBookmarks from "../../components/FeaturedBookmarks";
import FeaturedSnippets from "../../components/FeaturedSnippets";
import { useTheme } from "@mui/material";

/*============================================================
 * "The place where you lock yourself in and lock all else out, 
 * that’s not your home. Your home is sometimes a place you 
 * travel long and far to find."
 * 
 * - Geralt of Rivia
 *============================================================*/
export default function Home() {
  const retroTheme = useTheme();

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
          gap: 4,

          '& img': {
            filter: 'drop-shadow(0 15px 4px #000) saturate(0.6)'
          }
        }}>
        <Image
          src="/images/arth-animated_128x220.gif"
          alt="Pixel Bryan"
          width="128"
          height="220"
          loading="eager"
        />
        <Stack spacing={2} sx={{ py: 6 }}>
          <Typography variant="h1" sx={{
            textShadow: `0 3px 0 ${retroTheme.palette.text.medium}`
          }}>
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
