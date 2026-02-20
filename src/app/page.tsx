'use client'

import MainScaffold from "../../components/MainScaffold/MainScaffold";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";

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
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <Image src="/images/pixel-bryan_128x128.png" alt="Pixel Bryan" width="160" height="160" />
        <Typography variant="h1">
          Hello. My name is Bryan.
        </Typography>
      </Box>
    </MainScaffold>
  );
}
