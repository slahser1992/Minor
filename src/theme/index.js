import { unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
	palette: {
		common: {
			black: '#000',
			white: '#FFF',
			maroon: '#800000',
			blood: '#BB0A1E',
			crimson: '#DC143C',
			darkRed: '#8B0000',
		},
		type: 'light',
		primary: {
			light: '#F0F0F0',
			main: '#F0F0F0',
			dark: '#0F0F0F',
		},
	}
});

export default theme;

