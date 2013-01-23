var startTime = +new Date();
var dojoConfig = {
	async: true,
	packages: [{
		name: "claro",
		location: location.pathname.replace(/\/[^/]*$/, '/../js/claro/mod')
	}]
};
