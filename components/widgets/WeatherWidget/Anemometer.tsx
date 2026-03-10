import { Box, Typography } from '@mui/material';
import retroTheme from '@/theme';

interface AnemometerProps {
  speed: number;
  directionInDeg: number;
}

/*=================================================
 * Cool direction stuff
 *
 * Note to self: they're in order don't F with them
 *=================================================*/
interface CompassDirData {
  range: [number, number];
  shortName: string;
  label: string;
}

const compassDirs: CompassDirData[] = [
  { range: [348.75, 11.25], shortName: 'N', label: 'North' },
  { range: [11.25, 33.75], shortName: 'NNE', label: 'North-Northeast' },
  { range: [33.75, 56.25], shortName: 'NE', label: 'Northeast' },
  { range: [56.25, 78.75], shortName: 'ENE', label: 'East-Northeast' },
  { range: [78.75, 101.25], shortName: 'E', label: 'East' },
  { range: [101.25, 123.75], shortName: 'ESE', label: 'East-Southeast' },
  { range: [123.75, 146.25], shortName: 'SE', label: 'Southeast' },
  { range: [146.25, 168.75], shortName: 'SSE', label: 'South-Southeast' },
  { range: [168.75, 191.25], shortName: 'S', label: 'South' },
  { range: [191.25, 213.75], shortName: 'SSW', label: 'South-Southwest' },
  { range: [213.75, 236.25], shortName: 'SW', label: 'Southwest' },
  { range: [236.25, 258.75], shortName: 'WSW', label: 'West-Southwest' },
  { range: [258.75, 281.25], shortName: 'W', label: 'West' },
  { range: [281.25, 303.75], shortName: 'WNW', label: 'West-Northwest' },
  { range: [303.75, 326.25], shortName: 'NW', label: 'Northwest' },
  { range: [326.25, 348.75], shortName: 'NNW', label: 'North-Northwest' },
];

/*==========================================================
 * "Who am I to argue with the captain of the Enterprise?"
 *
 * The Captain of the Enterprise, James T. Kirk, Generations
 *==========================================================*/
function convertMPHtoKPH(speed: number) {
  const conversionFactor = 1.60934;

  return Math.round(speed * conversionFactor);
}

function getCardinalDirection(deg: number): CompassDirData | undefined {
  if (!deg || deg > 360 || deg < 0) return;

  for (let i = 0; i < compassDirs.length; i++) {
    const [low, high] = compassDirs[i].range;

    if (deg >= low && deg <= high) {
      return compassDirs[i];
    }
  }
}

export default function Anemometer({ speed, directionInDeg }: AnemometerProps) {
  const direction = getCardinalDirection(directionInDeg);

  return (
    <Box
      component='section'
      aria-labelledby='anemometer'
    >
      <Typography
        id='anemometer'
        variant='h4'
        sx={{ textAlign: 'center' }}
      >
        Wind
      </Typography>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#333',
          borderRadius: '1rem',
          border: `1px solid ${retroTheme.palette.divider}`,
          alignItems: 'center',
          pr: 1,
          my: 1,
        }}
      >
        <Box
          role='img'
          aria-label={
            direction ? `Wind direction ${direction.label} (${direction.shortName})` : 'Wind direction unavailable'
          }
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#131313',
            color: '#fff',
            borderRadius: '1rem',
            border: `1px solid ${retroTheme.palette.divider}`,
            px: 2,
            py: 2,

            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              left: '8px',
              right: '8px',
              height: '10px',
              pointerEvents: 'none',
              backgroundImage: `
                linear-gradient(to right, transparent 7px, rgba(255, 255, 255, 0.45) 7px 8px),
                linear-gradient(to right, transparent 23px, rgba(255, 255, 255, 0.9) 23px 24px)
              `,
              backgroundSize: '8px 6px, 24px 10px',
              backgroundRepeat: 'repeat-x',
            },

            '&::before': {
              top: '2px',
              backgroundPosition: '0 4px, 0 0',
            },
            '&::after': {
              bottom: '2px',
              backgroundPosition: '0 0, 0 0',
            },
          }}
        >
          <Typography aria-hidden>{direction?.shortName ?? '--'}</Typography>
        </Box>
        <Box sx={{ fontFamily: 'monospace', display: 'grid', gridTemplateColumns: '1fr' }}>
          <Typography variant='mono'>
            <Box sx={{ width: '2ch', display: 'inline' }}>{convertMPHtoKPH(speed)}</Box>
            &nbsp;kph
          </Typography>
          <Typography variant='mono'>
            <Box sx={{ width: '2ch', display: 'inline' }}>{Math.round(speed)}</Box>
            &nbsp;mph
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
