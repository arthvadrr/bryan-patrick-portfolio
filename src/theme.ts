import { createTheme } from '@mui/material/styles';

const mountainTheme = createTheme({
	typography: {
		bigheading: {
			fontSize: 64,
		},
	},
	gradients: {
		twilight:
			'linear-gradient(to bottom, #8c371b, #843925, #7c3b2d, #723e34, #68403a)',
		farlight:
			'linear-gradient(to bottom, #4f3e49, #4e4150, #4b4556, #47495b, #424d5f)',
		farmediumlight:
			'linear-gradient(to bottom, #3a3946, #393c4c, #373f52, #344357, #2f475c);',
		farmedium:
			'linear-gradient(to bottom, #273e54, #25384d, #223245, #1f2d3e, #1c2737);',
		fardark:
			'linear-gradient(to top, #1c3248, #192b3f, #152436, #121d2d, #0e1624);',
	},
});

export default mountainTheme;
