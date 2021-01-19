import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const BUTTON_COMMON_STYLE = (theme) => ({
	width: 80,
	height: 36,
	background: `linear-gradient(45deg, transparent 5%, ${theme.palette.common.crimson} 5%)`,
	border: 0,
	letterSpacing: 3,
	lineHeight: '22px',
	boxShadow: `6px 0 0 ${theme.palette.common.darkRed}`,
	outline: 'transparent',
	position: 'relative',
});

const AppButton = withStyles((theme) => ({
	root: {
		...BUTTON_COMMON_STYLE(theme),
		color: theme.palette.common.white,
		'&::after': {
			...BUTTON_COMMON_STYLE(theme),

			"--slice-0": "inset(50% 50% 50% 50%)",
			"--slice-1": "inset(80% -6px 0 0)",
			"--slice-2": "inset(50% -6px 30% 0)",
			"--slice-3": "inset(10% -6px 85% 0)",
			"--slice-4": "inset(40% -6px 43% 0)",
			"--slice-5": "inset(80% -6px 5% 0)",

			content: '"HIDEHIDE"',
			display: 'block',
			position: 'absolute',
			top: 0,
			left: 0,
			bottom: 0,
			background: `linear-gradient(45deg, transparent 3%, ${theme.palette.common.darkRed} 3%, ${theme.palette.common.darkRed} 5%, ${theme.palette.common.crimson} 5%)`,
			textShadow: `-3px -3px 0px ${theme.palette.common.maroon}, 3px 3px 0px ${theme.palette.common.crimson}`,
			clipPath: 'var(--slice-0)',
		},
		'&:hover::after': {
			animation: `$glitch 1s`,
			animationTimingFunction: 'steps(2, end)',
		}
	},
	"@keyframes glitch": {
		"0%": {
			clipPath: 'var(--slice-1)',
			transform: 'translate(-20px, -10px)',
		},
		"10%": {
			clipPath: 'var(--slice-3)',
			transform: 'translate(10px, 10px)',
		},
		"20%": {
			clipPath: 'var(--slice-1)',
			transform: 'translate(-10px, 10px)',
		},
		"30%": {
			clipPath: 'var(--slice-3)',
			transform: 'translate(0px, 5px)',
		},
		"40%": {
			clipPath: 'var(--slice-2)',
			transform: 'translate(-5px, 0px)',
		},
		"50%": {
			clipPath: 'var(--slice-3)',
			transform: 'translate(5px, 0px)',
		},
		"60%": {
			clipPath: 'var(--slice-4)',
			transform: 'translate(5px, 10px)',
		},
		"70%": {
			clipPath: 'var(--slice-2)',
			transform: 'translate(-10px, 10px)',
		},
		"80%": {
			clipPath: 'var(--slice-5)',
			transform: 'translate(20px, -10px)',
		},
		"90%": {
			clipPath: 'var(--slice-1)',
			transform: 'translate(-10px, 0px)',
		},
		"100%": {
			clipPath: 'var(--slice-1)',
			transform: 'translate(0)',
		},
	}
}))((props) => (
	<Button
		size='small'
		{...props}
		className={props.classes.root}
	/>			
));


export default AppButton;