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

	let isFound;

	if (routes[currentRoute]) {
		// Normal route without params
		routeContainer.innerHTML = routes[currentRoute]();
		isFound = true;
	} else {
		// Routes containing params
		for (let route in routes) {
			const { regex, keys } = checkRoutes(route);
			const match = currentRoute.match(regex);

			if (match && keys.length > 0) {
				routeContainer.innerHTML = routes[route]({ id: match[2] });
				isFound = true;
			}
		}
		// No match found, show 404 page:
	}
	if (!isFound) {
		routeContainer.innerHTML = routes["404"]();
	}

	handleLinks();
}

/**
 * Add event listeners to each custom link
 */
function handleLinks() {
	const links = document.querySelectorAll("a[data-href]");
	// Handle link click events
	[...links].map((link) => {
		link.addEventListener("click", handleLinkClick);
	});
}

function handleLinkClick(e) {
	e.preventDefault();
	if (e.currentTarget.dataset.href) {
		// Handle link click
		const url = e.currentTarget.dataset.href;
		window.history.pushState({ url }, "", url);
		processRoutes();
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
