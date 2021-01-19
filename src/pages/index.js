import React, { useState } from 'react';
import clsx from 'clsx';
import { 
	BrowserRouter as Router,
	Switch,
	Redirect,
	Route,
} from 'react-router-dom';
import { observer } from 'mobx-react';
import loadable from "@loadable/component";
import CssBaseLine from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Header from '@/components/Header';
import Link from '@/components/atoms/Link';
import { useAccountStores } from '@/hooks';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		})
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		background: 'linear-gradient(45deg, #FAFAFA 30%, #bdbdbd 90%)',
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	link: {
		display: 'flex',
		color: theme.palette.common.black,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
		height: 800
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

const Home = loadable(() => import("@/pages/Home"), {
  fallback: <div>loading</div>
});

const Essay = loadable(() => import("@/pages/Essay"), {
  fallback: <div>loading</div>
});

const Login = loadable(() => import("@/pages/Login"), {
	fallback: <div>loading</div>
});

const routes = [
	{
		label: 'Home',
		to: '/',
		exact: true,
		children: <Home />,
	},
	{
		to: '/essay/:essayId',
		children: <Essay />,
	},
	{
		to: '/login',
		children: <Login />,
	},
];

const AppRouter = observer((props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(true);
	const accountStore = useAccountStores();

	const handleDrawerClose = () => {
		setOpen(false);
	}

	const handleDrawerOpen = () => {
		setOpen(true);
	}

	return (
		<div className={classes.root}>
			<CssBaseLine />
			<Router>
				<Header
					className={
						clsx(classes.appBar, {
							[classes.appBarShift]: open,
						})
					}
					handleDrawerOpen={handleDrawerOpen}
					drawerOpen={open}
				/>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={handleDrawerClose} >
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List>
						{
							routes.map((route, _i) => route.label && (
								<Link to={route.to} key={_i}>
									<ListItem button>
										<ListItemIcon>{_i % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
										<ListItemText primary={route.label} />
									</ListItem>
								</Link>
							))
						}
					</List> 
				</Drawer>
				<main className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}>
					<div className={classes.drawerHeader} />
					<Switch>
						{routes.map((route, _i) => (
              <Route
                key={_i}
                path={route.to}
                exact={route.exact}
                children={route.children}
              />
						))}
						<Route>
							{
								accountStore.isLoggedIn
									?
									(
										<Redirect
											to={{ pathname: "/", state: { from: props.location }}}
										/>
									)
									: 
									(
										<Redirect
											to={{ pathname: "/login", state: { from: props.location }}}
										/>
									)
							}
						</Route>
					</Switch>
				</main>
			</Router>
		</div>
	);
});

export default AppRouter;