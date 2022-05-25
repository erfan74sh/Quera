const preview = document.querySelector("#preview");
const previewScale = document.querySelector("#preview-scale");
const previewFlip = document.querySelector("#preview-flip");
const brightnessSlider = document.querySelector("#brightness");
const brightnessSliderValue = document.querySelector("#brightness-value");
const rotateSlider = document.querySelector("#rotate");
const rotateSliderValue = document.querySelector("#rotate-value");

const handleRotate = () => {
	const rotate = rotateSlider.value;
	rotateSliderValue.innerText = rotate;

	// TODO: write your code here
	const scaleFactor =
		Math.abs(Math.sin((rotate * Math.PI) / 180).toFixed(5)) +
		Math.abs(Math.cos((rotate * Math.PI) / 180).toFixed(5));

	preview.style.transform = `rotate(${rotate}deg) scale(${scaleFactor})`;
};

const handleBrightness = () => {
	const brightness = brightnessSlider.value;
	brightnessSliderValue.innerText = brightness;

	// TODO: write your code here
	let tempFilters = preview.style.filter
		.split(" ")
		.filter((f) => !f.includes("brightness"));
	tempFilters.push(`brightness(${brightness})`);

	preview.style.filter = tempFilters.join(" ");
};

const handleFilter = (e) => {
	const { target } = e;
	const { id: filter } = target;
	// filter: "grayscale" | "sepia" | "invert" | "hue-rotate" | "contrast" | "saturate" | "blur"

	// TODO: write your code here
	const filtersOptions = {
		grayscale: 1,
		sepia: 1,
		invert: 1,
		"hue-rotate": "90deg",
		contrast: 2,
		saturate: 2,
		blur: "2px",
	};
	let tempFilters = preview.style.filter
		.split(" ")
		.filter((f) => f.includes("brightness"));

	if (filter !== "none") {
		tempFilters.push(`${filter}(${filtersOptions[filter]})`);
	}
	preview.style.filter = tempFilters.join(" ");
};

const handleFlip = (flip) => {
	//  flip: "vertical" | "horizontal"
	// TODO: write your code here
	const flips = previewFlip.style.transform.split(" ");

	let tempFlips = flips.filter((f) =>
		f.includes(flip === "vertical" ? "scaleX" : "scaleY")
	);
	// let tempFlips = [];
	// console.log(tempFlips);
	let flipX = flips.filter((flip) => flip.includes("scaleX"))[0];
	let flipY = flips.filter((flip) => flip.includes("scaleY"))[0];
	console.log({ flipX, flipY });
	if (flip === "vertical" && !flipY) {
		tempFlips.push("scaleY(-1)");
	}
	if (flip === "horizontal" && !flipX) {
		tempFlips.push("scaleX(-1)");
	}
	previewFlip.style.transform = tempFlips.join(" ");
};

const handleMouseEnter = () => {
	// TODO: write your code here
};

const handleMouseLeave = () => {
	// TODO: write your code here
};

const handleMouseMove = (e) => {
	const imageWidth = previewScale.offsetWidth;
	const imageHeight = previewScale.offsetHeight;
	const imageOffsetTop = previewScale.offsetTop;
	const imageOffsetLeft = previewScale.offsetLeft;
	const pageX = e.pageX;
	const pageY = e.pageY;

	// TODO: write your code here
};
