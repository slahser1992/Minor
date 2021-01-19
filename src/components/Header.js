import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu';
import { observer } from 'mobx-react';
import Link from './atoms/Link';

import AppBar from '@/components/atoms/AppBar';
import Menu from '@/components/atoms/Menu';
import Button from '@/components/atoms/Button';
import { GET_PROFILE } from '@/gql/account';
import { useQuery, useAccountStores } from '@/hooks';

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
}));

function Header({ className, handleDrawerOpen, drawerOpen }) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const accountStore = useAccountStores();

	const ACCOUNT_OPTIONS = useMemo(() => [
		{
			icon: <InboxIcon />,
			text: 'Log Out',
			eventCallback: () => {
				setAnchorEl(null);
				accountStore.logOut();
			},
		}
	], [accountStore])

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	}

	const handleClose = () => {
		setAnchorEl(null);
	}

	useQuery({
		query: GET_PROFILE,
		sucCallback: (res) => accountStore.profile(res),
		errCallback: () => accountStore.logOut,
		options: {
			hideSnackbar: true
		}
	});

	return (
		<AppBar className={className}>
			<Toolbar>
				<IconButton onClick={handleDrawerOpen} edge="start"
					className={clsx(classes.menuButton, drawerOpen && classes.hide)}
				>
					<MenuIcon/>
				</IconButton>
				<div className={classes.grow} />
				{accountStore.isLoggedIn
					? 
						(
							<div className={accountStore.isLoggedIn ? '' : classes.hide}>
								<IconButton
									aria-label="account of current user"
									aria-controls="user-menu"
									aria-haspopup="true"
									onClick={handleMenu}
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
								<Menu
									id="user-menu"
									anchorEl={anchorEl}
									onClose={handleClose}
									open={Boolean(anchorEl)}
									keepMounted
									data={ACCOUNT_OPTIONS}
								/>
							</div>
						)
					:	(
							<Link to={'/login'}>
								<Button>Sign In</Button>
							</Link>
						)
			}
			</Toolbar>
		</AppBar>
	)
}

export default observer(Header);