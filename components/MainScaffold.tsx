"use client";

import { useTheme } from "@mui/material/styles";
import MenuNav from "./MenuNav";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import RetroBorder from "./RetroBorder";
import Sidebar from "./Sidebar"

type ScaffoldProps = {
  children: React.ReactNode;
  minHeight?: number | string;
  width?: number | string;
  padding?: number;
};

export default function MainScaffold({
  children,
  minHeight = "100vh"
}: ScaffoldProps) {
  const retroTheme = useTheme();

  return (
    <main>
      {
        /*====================================================
         * This is the page structure grid.
         * It tells the content area where to live.
         * 
         * "Like, structurally." - Laura, explaining something
         *====================================================*/
      }
      <Box
        component="main"
        id="main-wrapper"
        sx={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          minHeight,
          width: "100%",
          background: retroTheme.gradients.superDark,
        }}
      >
        <RetroBorder
          position="top"
          size="2px"
          length='100%'
          offset={'0%'}
        />
        <Box
          id="main-content"
          sx={{
            position: "relative",
            width: '1200px',
            minHeight: '400px',
            backgroundColor: "background.paper",
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <RetroBorder
            position="top"
            size="1px"
            glowIntensity={2}
            length="80%"
            offset="20%"
            showSideBlends
          />
          <MenuNav />
          <Stack direction="row">
            {
              /*================
               * 
               *=================*/
            }
            <Stack sx={{
              width: '100%',
              gap: 4,
              p: 4
            }}>
              {children}
            </Stack>
            <Box sx={{ width: '100%', maxWidth: '432px' }}><Sidebar /></Box>
          </Stack>
          <Box sx={{ p: 4 }}>
          </Box>
        </Box>
      </Box>
    </main>
  );
}