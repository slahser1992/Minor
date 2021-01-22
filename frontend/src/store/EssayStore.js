import { observable, action, makeObservable } from 'mobx';

class Essay {
	constructor() {
		makeObservable(this);
	}

	@observable
	essays = [];

	@action
	updateEssays({ findEssay }) {
		this.essays = findEssay;
	}
}

export default Essay;