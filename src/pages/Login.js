import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import { SIGN_IN } from '@/gql/account';
import Button from '@/components/atoms/Button';
import { useMutation, useAccountStores } from '@/hooks';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	paper: {
		width: '50%',
		height: 400,
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	item: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(1),
	}
}));

function Login() {
	const classes = useStyles();
	const accountStore = useAccountStores();
	const history = useHistory();

	const [signIn] = useMutation({
			mutation: SIGN_IN, 
			sucCallback: (param) => {
				history.push("/");
				return accountStore.logIn(param);
			}
	});

	const nameInput = useRef(null);
	const passwordInput = useRef(null);
	const formRef = useRef(null);

	// interceptor of printing "/login" in browser input
	useEffect(() => {
		if (accountStore.isLoggedIn) {
			history.push('/');
		}
	}, [accountStore.isLoggedIn, history]);

	return (
		<div className={classes.root}>
			<Paper elevation={3} className={classes.paper}>
				<form
					className={classes.form}
					ref={formRef}
					onSubmit={(e) => {
						e.preventDefault();
						signIn({
							variables: {
								user: {
									name: nameInput.current.value,
									password: passwordInput.current.value,
								}
							}
						});
						formRef.current.reset();
					}
				}>
					<TextField inputRef={nameInput} label={"User Name"} variant={"outlined"}/>
					<TextField
						inputRef={passwordInput}
						password={"password"}
						label={"Password"}
						type={"password"}
						variant={"outlined"}
					/>
					<Button type="submit">LOG IN</Button>
				</form>
			</Paper>
		</div>
	)
}

export default observer(Login);