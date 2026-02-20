import { createTheme } from '@mui/material/styles';

const COLORS = {
	bg: '#111015',
	content: '#1b1824',
	aqua: '#46cfc8',
	orange: '#f28a3a',
	textLight: '#fff8cc',
	border: '#4d475c',
};

const FONTS = {
	body: 'var(--font-body), Inter, sans-serif',
	subheading: 'var(--font-subheading), sans-serif',
	heading: 'var(--font-heading), monospace',
};

const retroTheme = createTheme({
	typography: {
		fontFamily: FONTS.body,
		h1: {
			fontFamily: FONTS.heading,
			fontWeight: 400,
			fontSize: '3.2rem',
		},
		h2: {
			fontFamily: FONTS.heading,
			fontWeight: 400,
		},
		h3: {
			fontFamily: FONTS.heading,
			fontWeight: 400,
		},
		h4: {
			fontFamily: FONTS.subheading,
		},
		h5: {
			fontFamily: FONTS.subheading,
		},
		h6: {
			fontFamily: FONTS.subheading,
		},
		bigheading: {
			fontSize: 64,
			fontFamily: FONTS.heading,
			fontWeight: 400,
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					fontFamily: FONTS.body,
				},
				h1: {
					fontFamily: FONTS.heading,
					fontWeight: 400,
				},
				h2: {
					fontFamily: FONTS.heading,
					fontWeight: 400,
				},
				h3: {
					fontFamily: FONTS.heading,
					fontWeight: 400,
				},
				h4: {
					fontFamily: FONTS.subheading,
				},
				h5: {
					fontFamily: FONTS.subheading,
				},
				h6: {
					fontFamily: FONTS.subheading,
				},
			},
		},
	},
	palette: {
		mode: 'dark',
		contrastThreshold: 7,
		tonalOffset: 0.2,
		primary: {
			main: COLORS.aqua,
		},
		secondary: {
			main: COLORS.orange,
		},
		background: {
			default: COLORS.bg,
			paper: COLORS.content,
		},
		text: {
			primary: COLORS.textLight,
			secondary: COLORS.textLight,
		},
		divider: COLORS.border,
	},
	gradients: {
		superDark: `linear-gradient(to right top, ${COLORS.bg}, #121018, #13101a, #0f0c14, #0a080e)`,
	},
});

export default retroTheme;
