let routes = null;
let routeContainer = null;

function checkRoutes(route) {
	const keys = [];
	route = route.replace(/:(\w+)/g, (_, key) => {
		keys.push(key);
		return "([^\\/]+)";
	});

	const source = `^(${route})`;

	const regex = new RegExp(source, "i");
	return { regex, keys };
}

function processRoutes() {
	const currentRoute = window.location.pathname;

	if (!routeContainer) return;

	if (routes[currentRoute]) {
		// Normal route without params
		console.log(routeContainer);
		routeContainer.innerHTML = routes[currentRoute]();
	} else {
		// Routes containing params
		console.log(currentRoute);
		const keys = [];
		for (let route in routes) {
			route = route.replace(/:(\w+)/g, (_, key) => {
				keys.push(key);
				return "([^\\/]+)";
			});
		}
		// No match found, show 404 page:
	}

	handleLinks();
}

/**
 * Add event listeners to each custom link
 */
function handleLinks() {
	const links = document.querySelectorAll("a[data-href]");
	// Handle link click events
}

function handleLinkClick(e) {
	e.preventDefault();
	if (e.currentTarget.dataset.href) {
		// Handle link click
	}
}

function handleRouteChange() {
	// handle route change when user clicks the browser's back and forward buttons
	window.onpopstate = processRoutes;
}

export function initializeRouter(routeList, container) {
	routes = routeList;
	routeContainer = container;

	processRoutes();
	handleRouteChange();
}
