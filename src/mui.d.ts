import { CSSProperties } from 'react';
import '@mui/material/styles';
import '@mui/material/Typography';

declare module '@mui/material/styles' {
	/*=================================================
	 * This one is for like theme.typography.bigheading
	 *=================================================*/
	interface TypographyVariants {
		bigheading: CSSProperties;
		gradients?: CSSProperties;
	}

	/*===========================================================
	 * This one is for runtime, using like theme.gradients.orange
	 *===========================================================*/
	interface Theme {
		gradients: {
			orange: string;
		};
	}

	/*============================================================================
	 * This one is for the function createTheme props to allow { bigheading: ... }
	 *============================================================================*/
	interface TypographyVariantsOptions {
		bigheading?: CSSProperties;
		gradients?: CSSProperties;
	}

	/*=============================
	 * This one is for createTheme()
	 *=============================*/
	interface ThemeOptions {
		gradients?: Partial<Theme['gradients']>;
	}
}

declare module '@mui/material/Typography' {
	/*===================================
	 * This one is for the variants in jsx
	 * <Typography variant="bigheading"/>
	 *====================================*/
	interface TypographyPropsVariantOverrides {
		bigheading: true;
		gradients: true;
	}
}
