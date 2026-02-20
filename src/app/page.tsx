'use client'

import { useTheme } from "@mui/material/styles";
import RetroBorder from "../../components/RetroBorder/RetroBorder";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";

/*============================================================
 * "The place where you lock yourself in and lock all else out, 
 * that’s not your home. Your home is sometimes a place you 
 * travel long and far to find."
 * 
 * - Geralt of Rivia
 *===========================================================*/
export default function Home() {
  const retroTheme = useTheme();

  return (
    <main>
      {
        /*=========================================
         * This is the page structure grid.
         * It tells the content area where to live.
         * 
         * "Like, structurally." 
         * 
         * - Laurander
         *=========================================*/
      }
      <Box id="main-wrapper" sx={{
        display: 'Grid',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        background: retroTheme.gradients.superDark
      }}>
        <RetroBorder
          position="top"
          size="1px"
          glowIntensity={2}
          showSideBlends
        />
        {
          /*===========================================================
           * Main Content
           * 
           * "Off we go again" - Vladimir, Waiting for Godot, Final Act
           *===========================================================*/
        }
        <Box id="main-content" sx={{
          position: 'relative',
          backgroundColor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          padding: 3
        }}>
          <RetroBorder
            position="top"
            size="1px"
            glowIntensity={2}
            length='80%'
            offset='20%'
            showSideBlends
          />
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <Image src="/images/pixel-bryan_128x128.png" alt="Pixel Bryan" width="128" height="128" />
            <Typography variant="h1">
              Hello. My name is Bryan.
            </Typography>
          </Box>
          <Box sx={{

          }}>
          </Box>
        </Box>
      </Box>
    </main>
  );
}
