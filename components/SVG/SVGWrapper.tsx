import { Box, SxProps } from '@mui/material';
import type { SVGProps } from 'react';

export type SVGWrapperProps = SVGProps<SVGSVGElement> & { sx?: SxProps };

/*========================================================================
* If you don't know what display: contents does it's simple. Imagine this:
*
* Grandparent = table
* Parent = cardboard box
* Child = cat
*
* <Table>
*  <CardboardBox>
*    <Cat>
*  </CardboardBox>
* </Table>
*
* The cat is in the cardboard box. He likes the box.
*
*     /\_/\\
*    ( o.o )
*     > ^ <
*   +-------+
*   |  BOX  |
*   +-------+
=================
*    TABLE
*
* display: contents on the box means:
*
* The box disappears, but the cat stays.
* Now the cat "acts" like it is directly on the table.
*
* The page layout behaves like the box is gone:
*
* <Table>
*   <Cat>
* </Table>
*
* The cat is slightly annoyed. He knocks your glass off the table
*
*      /\_/\\
*  /  ( o.o )    |  |
* |    > ^ <.    |__|
* |\  |    |===88|__|
=====================
*    TABLE
*================================================================*/
export default function SVGWrapper({
  children,
  viewBox = '0 0 32 32',
  width = '32px',
  height = '32px',
  fill = 'currentColor',
  sx,
  ...props
}: SVGWrapperProps) {
  return (
    <Box
      sx={{
        display: 'contents',
        ...sx,
      }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox={viewBox}
        width={width}
        height={height}
        fill={fill}
        {...props}
      >
        {children}
      </svg>
    </Box>
  );
}
