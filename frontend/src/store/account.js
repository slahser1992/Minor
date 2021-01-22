import { action, observable, computed, makeObservable } from 'mobx';

class Account {
	constructor() {
		makeObservable(this);
	}

	@observable
	isLoggedIn = false;

	@computed
	get getToken() {
		return localStorage.getItem('token');
	}

	@action
	setToken(v) {
		localStorage.setItem('token', v);
	}
		
	@action
	setLoggedIn(v) {
		this.isLoggedIn = v;
	}

	@action
	logIn({ loginUser }) {
		this.setToken(loginUser.token);
		this.setLoggedIn(true);
	}

	@action
	profile({ profile }) {
		this.setLoggedIn(true);
	}

	@action
	logOut() {
		localStorage.removeItem('token');
		this.isLoggedIn = false;
	}
}

export default Account;