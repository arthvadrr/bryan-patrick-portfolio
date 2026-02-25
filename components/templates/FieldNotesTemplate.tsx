'use client';

import { useTheme } from '@mui/material/styles';
import MenuNav from '../MenuNav';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import RetroBorder from '../RetroBorder';

type ScaffoldProps = {
  children: React.ReactNode;
  minHeight?: number | string;
  width?: number | string;
  padding?: number;
};

/*===============================
 * "There's nothing simpler than avoiding people you don't like.
 * Avoiding one's friends, that's the real test."
 *
 * - Violet Crawley, Dowager Countess of Grantham (Downton Abbey)
 *===============================*/
export default function ArticlesTemplate({
  children,
  minHeight = '100vh',
}: ScaffoldProps) {
  const retroTheme = useTheme();

  return (
    <main>
      <Box
        component='main'
        id='main-wrapper'
        sx={{
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight,
          width: '100%',
          background: retroTheme.gradients.superDark,
        }}
      >
        <RetroBorder position='top' size='2px' length='100%' offset={'0%'} />
        <Box
          id='main-content'
          sx={{
            position: 'relative',
            width: '1200px',
            minHeight: '400px',
            backgroundColor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            borderRadius: 2,
          }}
        >
          <RetroBorder
            position='top'
            size='1px'
            glowIntensity={2}
            length='80%'
            offset='20%'
            showSideBlends
          />
          <MenuNav />
          <Stack
            direction='column'
            sx={{
              padding: 8,
            }}
          >
            {children}
          </Stack>
        </Box>
      </Box>
    </main>
  );
}
