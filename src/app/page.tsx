'use client'

import MainScaffold from "../../components/MainScaffold";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import FeaturedMemos from "../../components/FeaturedMemos";
import FeaturedBoilerPlates from "../../components/FeaturedBoilerplates";
import FeaturedSnippets from "../../components/FeaturedSnippets";

/*============================================================
 * "The place where you lock yourself in and lock all else out, 
 * that’s not your home. Your home is sometimes a place you 
 * travel long and far to find."
 * 
 * - Geralt of Rivia
 *============================================================*/
export default function Home() {
  return (
    <MainScaffold>
      <Stack
        direction={{
          sm: "column",
          md: "row"
        }}
        alignItems="center"
        sx={{
          alignItems: 'center',
          gap: 4,
        }}>
        <Image
          src="/images/arth-animated.gif"
          alt="Pixel Bryan"
          width="128"
          height="220"
        />
        <Stack spacing={2}>
          <Typography variant="h1">
            Hello! <br /> My name is Bryan.
          </Typography>
          <Typography>
            This is my personal site. Here there are code snippets, a collection of memos, boilerplates, and widgets for things I use all the time.
          </Typography>
        </Stack>
      </Stack>
      <FeaturedMemos />
      <FeaturedBoilerPlates />
      <FeaturedSnippets />
    </MainScaffold >
  );
}
