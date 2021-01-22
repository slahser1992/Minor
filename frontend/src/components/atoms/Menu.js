import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5'
	},
})((props) => (
	<Menu
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		getContentAnchorEl={null}
		{...props}
	/>
));

const AppMenuItem = withStyles((theme) => ({
	root: {
		'&:focus': {
			backgroundColor: theme.palette.primary.main,
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.black,
			}
		}
	}
}))(MenuItem);

const AppMenu = ({ data, ...props }) => {
	return (
		<div>
			<StyledMenu
				{...props}
			>
				{
					data.map((menuItemData, _i) => (
						<AppMenuItem key={_i} onClick={menuItemData.eventCallback}>
							<ListItemIcon>
								{menuItemData.icon}
							</ListItemIcon>
							<ListItemText primary={menuItemData.text}/>
						</AppMenuItem>
					))
				}
			</StyledMenu>
		</div>
	);
}

export default AppMenu;