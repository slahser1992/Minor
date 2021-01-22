import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const AppLink = withStyles((theme) => ({
	root: {
		textDecoration: 'none',
		color: theme.palette.common.black,
	}
}))((props) => (
	<Link
		{...props}
		className={props.classes.root}
	/>			
));


export default AppLink;