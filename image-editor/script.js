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
	preview.style.filter = `brightness(${brightness})`;
};

const handleFilter = (e) => {
	const { target } = e;
	const { id: filter } = target;
	// filter: "grayscale" | "sepia" | "invert" | "hue-rotate" | "contrast" | "saturate" | "blur"

	// TODO: write your code here
};

const handleFlip = (flip) => {
	//  flip: "vertical" | "horizontal"
	// TODO: write your code here
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
