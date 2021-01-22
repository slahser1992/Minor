var a = 0;
function fn() {
	console.log(this.a);
}

console.log(fn());
var obj = {
	a: 2,
	method: function (fn) {
		fn()
		console.log(arguments[0]());
	}
}

obj.method(fn);
