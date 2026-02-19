import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WaveDivider from "../../components/WaveDivider/WaveDivider";

export default function Home() {
  return (
    <main>
      <Box>
        <Typography variant="h1">Hello. My name is Bryan.</Typography>
        <Typography>
          I build stoof
        </Typography>
      </Box>
      here
      <WaveDivider
        color="mountainTheme.gradients.orange"
        height={88}
        intensity={0.62}
        count={4}
        shape="smooth"
      />
    </main>
  );
}
